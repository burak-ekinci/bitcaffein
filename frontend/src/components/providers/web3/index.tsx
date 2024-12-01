import { assertPrivate, ethers } from "ethers";
import {
  useState,
  createContext,
  FunctionComponent,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import {
  createDefaultState,
  createWeb3State,
  loadContract,
  Web3State,
} from "./utils";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ContractRunner } from "ethers";
import { Signer } from "ethers";
import { Contract } from "ethers";

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Context = createContext<Web3State>(createDefaultState());

const pageReload = () => {
  window.location.reload();
};

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked = !(await ethereum._metamask.isUnlocked());
  if (isLocked) {
    pageReload();
  }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum));
};

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener("chainChanged", pageReload);
  ethereum?.on("accountsChanged", handleAccount(ethereum));
};

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3api, setWeb3api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const contract = await loadContract("BitCaffein", provider);

        const signer = await provider.getSigner();
        const signedContract = contract.connect(signer);
        setWeb3api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            contract: signedContract as Contract,
            isLoading: false,
            setWeb3api,
          })
        );
        setGlobalListeners(window.ethereum);
      } catch (e: any) {
        console.error(e.message);
        setWeb3api((api) =>
          createWeb3State({
            ...(api as any),
            isLoading: false,
          })
        );
      }
    }
    initWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, []);

  return (
    <>
      <Web3Context.Provider value={web3api}>{children}</Web3Context.Provider>
    </>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;
