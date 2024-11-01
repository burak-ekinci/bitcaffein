import { Web3Dependencies } from "../../types/web3/hooks";
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork";

// initial veya new type tanımlarken hangi fonksiyonların olduğunu ve ne tipte olduğunu gösterir
export type Web3Hooks = {
  useAccount: UseAccountHook;
  useNetwork: UseNetworkHook;
};

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks;
};

// !!!!!!!!!!!!!  MATTER  !!!!!!!!!!!!!
export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps),
  };
};
