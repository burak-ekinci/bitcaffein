import useSWR from "swr";
import { CryptoHookFactory } from "../../types/web3/hooks";
import { ethers, Contract } from "ethers";
import { useState } from "react";

type UseContractResponse = {
  createCampaign: (
    title: string,
    description: string,
    creatorName: string,
    creatorJob: string,
    goalAmount: string
  ) => Promise<void>;
  getMyCampaigns: (user: string) => Promise<any[]>;
  donation: (campaignId: number, amount: string) => Promise<void>;
  getAllCampaigns: () => Promise<any[]>;
  test: () => Promise<string>;
};

type ContractHookFactory = CryptoHookFactory<Contract, UseContractResponse>;

export type UseContractHook = ReturnType<ContractHookFactory>;

export const hookFactory: ContractHookFactory =
  ({ provider, contract }) =>
  () => {
    const [activeContract, setContract] = useState<Contract | null>(null);

    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? "web3/useContract" : null,
      async () => {
        // setContract(contract);
        if (!contract) {
          throw new Error("Cannot retrieve contract! Please connect wallet.");
        }
        setContract(contract);
        return contract;
      },
      { revalidateOnFocus: false }
    );

    // Sözleşme fonksiyonları
    const createCampaign = async (
      title: string,
      description: string,
      creatorName: string,
      creatorJob: string,
      goalAmount: string
    ) => {
      if (!contract) throw new Error("Contract is not initialized.");
      const tx = await contract.createCampaign(
        title,
        description,
        creatorName,
        creatorJob,
        ethers.parseEther(goalAmount)
      );
      await tx.wait();
    };

    const getMyCampaigns = async (user: string) => {
      if (!contract) throw new Error("Contract is not initialized.");
      const campaigns = await contract.getMyCampaigns(user);
      return campaigns;
    };

    const donation = async (campaignId: number, amount: string) => {
      if (!contract) throw new Error("Contract is not initialized.");
      const tx = await contract.donation(campaignId, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
    };

    const getAllCampaigns = async () => {
      if (!activeContract) throw new Error("Contract is not initialized.");
      const campaigns = await activeContract!.getAllCampaigns();
      return campaigns;
    };

    const test = async () => {
      if (!contract) throw new Error("Contract is not initialized!");
      const testMessage = await contract.test();
      return testMessage;
    };

    return {
      ...swr, // SWR özelliklerini ekleyin
      data,
      mutate,
      isValidating,
      createCampaign,
      getMyCampaigns,
      donation,
      getAllCampaigns,
      test,
      isLoading: !data && !mutate && !isValidating,
    };
  };
