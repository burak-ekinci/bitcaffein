import useSWR from "swr";
import { CryptoHookFactory } from "../../types/web3/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

//  -> deps = { ethereum , provider...}
export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
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
    const connect = async () => {
      const { ethereum } = window as any; // Ethereum nesnesini alın
      if (!ethereum) {
        console.error("Ethereum provider not found. Please install MetaMask.");
        return;
      }

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
          console.error("Error:", (error as { message: string }).message);
        } else {
          console.error("An unknown error occurred.");
        }
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
