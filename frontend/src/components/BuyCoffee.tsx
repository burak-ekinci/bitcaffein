import { FunctionComponent, useEffect, useState } from "react";
import { useWeb3 } from "./providers/web3";
import { ethers } from "ethers";
import { useAccount, useContract, useNetwork } from "./hooks/web3";
import { toast } from "react-toastify";
import Card from "./Card";
type Campaign = {
  title: String;
  description: String;
  creatorName: String;
  creatorJob: String;
  goalAmount: String;
};

const BuyCoffee: FunctionComponent = () => {
  const [campaigns, setCampaigns] = useState<any[] | null>();
  const { contract } = useContract();

  // useEffect(() => {

  //   getAllCampaign();
  // }, []);
  const getAllCampaign = async () => {
    try {
      const tx = await contract!.getAllCampaigns();
      setCampaigns(tx);
      console.log(tx);
      console.log(tx[0]);
    } catch (error) {
      toast.error("Contract is not initialized.");
    }
  };
  return (
    <div>
      <button
        onClick={() => getAllCampaign()}
        className="btn btn-success btn-sm"
      >
        get campaigns
      </button>
      {campaigns == undefined ? (
        <div
          className="alert alert-primary container mt-3 text-center"
          role="alert"
        >
          There is no campaign😔
        </div>
      ) : (
        campaigns.map((item, index) => <Card key={index} campaign={item} />)
      )}
    </div>
  );
};

export default BuyCoffee;
