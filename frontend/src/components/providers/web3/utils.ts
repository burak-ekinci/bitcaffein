import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers, Contract } from "ethers";
import { setupHooks, Web3Hooks } from "../../hooks/web3/setupHooks";
import { Web3Dependencies } from "../../types/web3/hooks";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider | any;
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type Web3State = {
  isLoading: boolean; // true while loading web3state
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>;

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({ isLoading: true } as any),
  };
};

export const createWeb3State = ({
  ethereum,
  provider,
  contract,
  isLoading,
}: Web3Dependencies) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading: false,
    hooks: setupHooks({ ethereum, provider, contract, isLoading }),
  };
};

const NETWORK_ID = import.meta.env.VITE_KEY_NETWORK_ID;
const NETWORK_NAME = import.meta.env.VITE_KEY_NETWORK_NAME;

export const loadContract = async (
  name: string,
  provider: ethers.BrowserProvider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined!");
  }
  const preContractAddress = await fetch(
    `/contracts/${name}-contract-address-${NETWORK_NAME}.json`
  );
  const preArtifact = await fetch(`/contracts/${name}.json`);

  const contractAddress = await preContractAddress.json();
  const Artifact = await preArtifact.json();
  if (contractAddress) {
    const contract = new ethers.Contract(
      contractAddress[name],
      Artifact.abi,
      provider
    );
    return contract;
  } else {
    return Promise.reject(`Contract [${name}] cannot be loaded!`);
  }
};
