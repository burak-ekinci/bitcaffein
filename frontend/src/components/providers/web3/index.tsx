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

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3api, setWeb3api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = await loadContract("BitCaffein", provider);
        setWeb3api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            contract,
            isLoading: false,
          })
        );
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
