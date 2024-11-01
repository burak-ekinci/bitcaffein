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
        console.error("Please, connect to metamask");
      }
      // Buradaki accounts[0] değeri yeni geçtiğim mm hesabı swrRes.data ise önceki hesap oluyor
      else if (accounts[0] !== data) {
        mutate(accounts[0]);
      }
    };
    const connect = async () => {
      try {
        ethereum?.request({ method: "eth_requestAccounts" });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      ...swr,
      data,
      isLoading: isLoading as boolean,
      isInstalled: ethereum?.isMetaMask || false,
      isValidating,
      mutate,
      connect,
    };
  };
