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
  ) => Promise<string>;
  getMyCampaigns: (user: string) => Promise<any[]>;
  getCampaignById: (id: string) => Promise<any>;
  deleteCampaign: (id: bigint) => Promise<void>;
  withdrawDonations: (campaignId: number) => Promise<void>;
  donation: (campaignId: number, amount: string) => Promise<void>;
  getAllCampaigns: () => Promise<any[]>;
  test: () => Promise<string>;
  getCampaignCounter: () => Promise<string>;
};

type ContractHookFactory = CryptoHookFactory<Contract, UseContractResponse>;

export type UseContractHook = ReturnType<ContractHookFactory>;

export const hookFactory: ContractHookFactory =
  ({ provider, contract }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? "web3/useContract" : null,
      async () => {
        // setContract(contract);
        if (!contract) {
          throw new Error("Cannot retrieve contract! Please connect wallet.");
        }
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
        goalAmount
      );
      await tx.wait();
      return tx;
    };
    const getAllCampaigns = async () => {
      if (!contract) throw new Error("Contract is not initialized.");
      const campaigns = await contract!.getAllCampaigns();
      return campaigns;
    };
    const getMyCampaigns = async (user: string) => {
      if (!contract) throw new Error("Contract is not initialized.");
      // Get the campaigns of user
      const campaigns = await contract.getMyCampaigns(user);
      return campaigns;
    };
    const getCampaignCounter = async () => {
      if (!contract) throw new Error("Contract is not initialized.");
      // Get the campaigns of user
      const campaigns = await contract.getCampaignCounter();
      return campaigns;
    };

    const getCampaignById = async (id: string) => {
      if (!contract) throw new Error("Contract is not initialized.");
      const campaigns = await contract.getCampaignById(id);
      return campaigns;
    };

    const donation = async (campaignId: number, amount: string) => {
      if (!contract) throw new Error("Contract is not initialized.");
      const tx = await contract.donation(campaignId, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
    };

    const deleteCampaign = async (campaignId: bigint): Promise<void> => {
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      try {
        const tx = await contract.deleteCampaign(campaignId);
        await tx.wait();
        console.log("Campaign deleted successfully");
      } catch (error: any) {
        console.error("Error deleting campaign:", error.message);
        throw new Error(error.message || "Failed to delete campaign.");
      }
    };

    const withdrawDonations = async (campaignId: number): Promise<void> => {
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      try {
        const tx = await contract.withdrawDonations(campaignId);
        await tx.wait();
        console.log("Donations withdrawn successfully");
      } catch (error: any) {
        console.error("Error withdrawing donations:", error);
        throw new Error(error.message || "Failed to withdraw donations.");
      }
    };

    const updateCampaign = async (
      campaignId: number,
      newTitle: string,
      newDescription: string
    ) => {
      if (!contract) throw new Error("Contract is not initialized!");

      try {
        const tx = await contract!.updateCampaign(
          campaignId,
          newTitle,
          newDescription
        );
        await tx.wait();
        console.log("Campaign updated successfully!");
      } catch (error: any) {
        console.error("Cannot update the campaign : ", error.message);
        throw new Error(error || "Cannot update the campaign");
      }
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
      getAllCampaigns,
      getCampaignById,
      donation,
      deleteCampaign,
      withdrawDonations,
      test,
      getCampaignCounter,
      isLoading: !data && !mutate && !isValidating,
    };
  };
