import useSWR from "swr";
import { CryptoHookFactory } from "../../types/web3/hooks";

const NETWORKS: { [k: string]: string } = {
  1: "Ethereum Main Network",
  5: "Goerli Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache TestNet",
};

type UseNetworkResponse = {
  isLoading: boolean;
  isSupported: boolean;
  targetNetwork: string | undefined;
};

const targetId = import.meta.env.VITE_KEY_TARGET_NETWORK_ID as string;
const targetNetwork = NETWORKS[targetId];

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;

export type UseNetworkHook = ReturnType<NetworkHookFactory>;

//  -> deps = { ethereum , provider...}
export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? "web3/useNetwork" : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId;
        if (!chainId) {
          throw new Error(
            "Cannot retrieve network. Please, refresh browser or connect to other one."
          );
        }

        return NETWORKS[chainId.toString()];
      },
      { revalidateOnFocus: false }
    );

    return {
      ...swr,
      data,
      isSupported: data === targetNetwork,
      targetNetwork,
      isLoading: isLoading || isValidating,
      isValidating,
    };
  };
