import useSWR from "swr";
import { CryptoHookFactory } from "../../types/web3/hooks";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadContract } from "../../providers/web3/utils";
import { ethers } from "ethers";
import { useWeb3 } from "../../providers/web3";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

//  -> deps = { ethereum , provider...}
export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading, setWeb3api }) =>
  () => {
    const { contract } = useWeb3();

    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? "web3/useAccount" : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];
        if (!account) {
          return "Cannot retrieve account! Please connect wallet.";
        }
        return account.address;
      },
      { revalidateOnFocus: false }
    );

    useEffect(() => {
      ethereum?.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    });

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        console.log("Wallet disconnected.");
      } else {
        console.log("Account changed:", accounts[0]);
        mutate(accounts[0]); // Yeni hesabı bağla
      }
    };

    // Cüzdan Bağlantısı
    const connectWallet = async (): Promise<
      { provider: ethers.BrowserProvider; account: string } | undefined
    > => {
      const { ethereum } = window as any; // Tarayıcı ortamından Ethereum nesnesi alınır.

      if (!ethereum) {
        console.error("Ethereum provider not found. Please install MetaMask.");
        return;
      }

      try {
        // Kullanıcıdan cüzdan bağlama izni alınır
        const accounts: string[] = await ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          console.warn(
            "No account found. Please connect at least one account."
          );
          return;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        console.log("Connected account:", accounts[0]);

        return { provider, account: accounts[0] };
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    // Contract Bağlantısı
    const connect = async (): Promise<
      { signedContract: ethers.Contract; account: string } | undefined
    > => {
      try {
        const walletConnection = await connectWallet();

        if (!walletConnection) {
          console.error("Wallet connection failed.");
          return;
        }

        const { provider, account } = walletConnection;

        // Contract yüklenir
        const contract = await loadContract("BitCaffein", provider);
        console.log("contract", contract);
        // Signer oluşturulur ve contract bağlanır
        const signer = await provider.getSigner();
        const signedContract = contract.connect(signer);
        setWeb3api((prevState: any) => ({
          ...prevState,
          contract: signedContract, // Yeni signed contract
        }));
        console.log(signer);
        console.log("Wallet Connected:", account);
        console.log("Contract Initialized:", signedContract);
        3;
      } catch (error) {
        console.error("Error connecting contract:", error);
      }
    };

    return {
      ...swr,
      data,
      isLoading: isLoading as boolean,
      isInstalled:
        typeof window.ethereum !== "undefined" &&
        typeof window.ethereum.request === "function",
      isValidating,
      mutate,
      connect,
    };
  };
