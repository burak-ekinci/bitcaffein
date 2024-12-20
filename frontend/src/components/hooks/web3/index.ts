import { useHooks } from "../../providers/web3/index.tsx";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount();
  return {
    account: swrRes,
  };
};

export const useNetwork = () => {
  const hooks = useHooks();
  const swrRes = hooks.useNetwork();
  return {
    network: swrRes,
  };
};

export const useContract = () => {
  const hooks = useHooks();
  const swrRes = hooks.useContract();
  return {
    contract: swrRes,
  };
};
