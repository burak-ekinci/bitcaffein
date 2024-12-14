import React, { FunctionComponent, useEffect, useState } from "react";
import { useWeb3 } from "../providers/web3";
import { ethers } from "ethers";
import { useAccount, useContract, useNetwork } from "../hooks/web3";
import { toast } from "react-toastify";
import { Card } from "./index";
import { Navigate, useNavigate } from "react-router-dom";
type Campaign = {
  id: number;
  creator: string;
  creatorName: string;
  creatorJob: string;
  title: string;
  description: string;
  totalAmount: number;
  goalAmount: number;
  startTime: number;
};
interface Props {
  functionType: string;
}
const GetCampaign: React.FC<Props> = ({ functionType }) => {
  const [campaigns, setCampaigns] = useState<any[] | null>();
  const { contract } = useContract();
  const { account } = useAccount();

  const navigate = useNavigate();

  // console.log("contract bu", contract);
  if (contract.data == undefined) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  // useEffect(() => {
  //   getAllCampaign();
  // }, []);

  // Get All Campaign on Contract
  const getAllCampaign = async () => {
    try {
      const tx = await contract!.getAllCampaigns();
      if (tx.length == 0) {
        toast.info("There is no campaign");
        navigate("/");
        return;
      }
      setCampaigns(tx);
      console.log(tx);
      console.log(tx[0]);
    } catch (error) {
      toast.error("Contract is not initialized");
    }
  };

  // Get My Campaign on the Contract
  const getMyCampaign = async () => {
    try {
      const tx = await contract!.getMyCampaigns(account.data as string);
      if (tx.length == 0) {
        toast.info("There is no campaign");
        navigate("/");
        return;
      }
      setCampaigns(tx);
      console.log("mycampaigns: ", tx);
      console.log(tx[0]);
    } catch (error) {
      toast.error("Contract is not initialized.");
    }
  };

  return (
    <div>
      <div className="container text-center justify-content-center">
        <button
          onClick={() => {
            if (functionType == "getAllCampaigns") {
              getAllCampaign();
            } else if (functionType == "getMyCampaigns") {
              getMyCampaign();
            } else {
              toast.error("Error");
              return;
            }
          }}
          className="btn btn-secondary mt-3 btn-sm text-center justify-content-center"
        >
          get campaigns
        </button>
      </div>
      <div className="container mt-3">
        <h4>
          {functionType == "getAllCampaigns"
            ? "All Campaigns"
            : functionType == "getMyCampaigns"
            ? "My Campaigns"
            : "Campaigns"}{" "}
        </h4>
        <hr />
      </div>
      {campaigns == undefined ? (
        <div
          className="alert alert-secondary container mt-3 text-center"
          role="alert"
        >
          There is no campaign😔
        </div>
      ) : (
        campaigns.map((item, index) =>
          item[1] != "0x0000000000000000000000000000000000000000" ? (
            <Card key={index} campaign={item} />
          ) : null
        )
      )}
    </div>
  );
};

export default GetCampaign;
