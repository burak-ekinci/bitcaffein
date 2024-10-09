import { defineProperties } from "ethers";
import { CryptoHookFactory, Web3Dependencies } from "../../types/web3/hooks";
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";

// initial veya new type tanımlarken hangi fonksiyonların olduğunu ve ne tipte olduğunu gösterir
export type Web3Hooks = {
  useAccount: UseAccountHook;
};

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks;
};

// !!!!!!!!!!!!!  MATTER  !!!!!!!!!!!!!
export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
  };
};
