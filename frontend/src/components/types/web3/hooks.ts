import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers } from "ethers";
import { SWRResponse } from "swr";

export type Web3Dependencies = {
  ethereum: MetaMaskInpageProvider;
  provider: ethers.BrowserProvider;
  contract: Contract;
  isLoading: boolean;
  setWeb3api: any;
};
export type CryptoHookFactory<D = any, R = any, P = any> = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>;
};

export type CryptoHandlerHook<D = any, R = any, P = any> = (
  params?: P
) => CryptoSWRResponse<D, R>;

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R;

// export type CryptoHookFactory<D = any, P = any> = {
//   (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>;
// };
