import { useParams } from "react-router-dom";
import { useAccount, useContract } from "../hooks/web3";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingButton } from "./index";
import { ethers, parseEther } from "ethers";
import axios from "axios";

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
const Campaign = (): JSX.Element => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("0");
  const [photos, setPhotos] = useState<string[]>([]);
  const { contract } = useContract();
  const { account } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);

  const getCampaign = async () => {
    setLoading(true);
    try {
      const campaignData = await contract!.getCampaignById(id as string);
      // Fotoğrafları al
      const photoResponse = await axios.get(
        `${import.meta.env.VITE_KEY_API_CONNECTION_STRING}/campaign/get/${id}`
      );
      setPhotos(photoResponse.data.campaign.photos || []);
      setCampaign(campaignData);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      toast.error("Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetAmount = (amount: string) => {
    setDonationAmount(amount);
  };

  const donate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    if (!id) {
      toast.error("Campaign ID not found.");
      return;
    }

    try {
      setLoading(true);
      await contract!.donation(Number(id), donationAmount); // `donation` fonksiyonuna parametreler gönderiliyor
      toast.success("Thank you for your donation!");
      // Kampanyayı güncellemek için getCampaign'i tekrar çağırabilirsiniz.
      await getCampaign();
    } catch (error: any) {
      console.error("Error during donation:", error);
      toast.error(error.message || "Failed to process donation.");
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) {
    return (
      <div className="text-center">
        <button onClick={getCampaign} className="btn btn-success">
          Get Campaign
        </button>
      </div>
    );
  }
  const getProgressBarValue = (max: number, now: number): number => {
    const x = (now * 100) / max;
    return x;
  };
  return (
    <>
      <div id="bg" className="container card bg col-md-9 mt-3 ">
        <div className="row g-0 p-3">
          {/* Card Left Side */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              width={50}
              src="/pp.png"
              alt="Creator"
              className="img-fluid ms-3 rounded-start"
            />
            <div className="ms-3">
              <h3>{campaign.creatorName}</h3>
              <h6>{campaign.creatorJob}</h6>
            </div>
          </div>
          {/* Card Right Side */}
          <div className="col-md-8 d-flex flex-column align-items-start justify-content-between">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                  width={35}
                  src="/cfe.png"
                  alt="Title Icon"
                  className="img-fluid"
                />
                <span className="fs-3 ms-2">{campaign.title}</span>
              </div>
              <hr />
              <div className="ms-3">
                <p>{campaign.description}</p>
              </div>
            </div>

            {/* Donation Form */}
            <div className="w-100 p-3">
              <form>
                <label className="form-label">
                  Choose your donation amount:
                </label>
                <div className="d-flex justify-content-around mb-3">
                  <button
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      textAlign: "center",
                      fontSize: 10,
                    }}
                    type="button"
                    className="btn orange"
                    onClick={() => handleSetAmount("0.01")}
                  >
                    a Little BitCoffee
                  </button>
                  <button
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      textAlign: "center",
                      fontSize: 10,
                    }}
                    type="button"
                    className="btn orange"
                    onClick={() => handleSetAmount("0.1")}
                  >
                    a BitCoffee
                  </button>
                  <button
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      textAlign: "center",
                      fontSize: 10,
                    }}
                    type="button"
                    className="btn orange"
                    onClick={() => handleSetAmount("1")}
                  >
                    BitCOFFEE!
                  </button>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="donationAmount"
                    className="form-control"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        setDonationAmount(value);
                      }
                    }}
                  />
                  <span className="input-group-text d-flex justify-content-center align-items-center">
                    <img src="/ethereum.png" alt="ETH" width={24} />
                    <strong>ETH</strong>
                  </span>
                </div>
                <LoadingButton
                  text={
                    account.data ===
                    "Cannot retrieve account! Please connect wallet."
                      ? "Connect wallet first!"
                      : "Order it a BitCoffee!"
                  }
                  isLoading={loading}
                  onClick={donate} // Donate butonu `donate` fonksiyonunu çağırıyor
                  disabled={
                    account.data ===
                    "Cannot retrieve account! Please connect wallet."
                      ? true
                      : false
                  }
                />
              </form>
              <div className="container mt-2">
                <div
                  className="progress "
                  role="progressbar"
                  aria-label="Info striped example"
                >
                  <div
                    className="progress-bar progress-bar-striped"
                    style={{
                      width: `${getProgressBarValue(
                        parseInt(campaign.goalAmount.toString()),
                        parseInt(campaign.totalAmount.toString())
                      )}%`,
                      backgroundColor: "#feb103",
                    }}
                  >
                    {getProgressBarValue(
                      parseInt(campaign.goalAmount.toString()),
                      parseInt(campaign.totalAmount.toString())
                    )}
                    %
                  </div>
                </div>
              </div>
              <div
                style={{ bottom: 0 }}
                className="d-flex justify-content-between mt-3"
              >
                <p>
                  Goal Amount:{" "}
                  <span className="fw-bold">
                    {ethers.formatEther(campaign.goalAmount.toString())} ETH
                  </span>
                </p>
                <p>
                  Total Raised:{" "}
                  <span className="fw-bold">
                    {ethers.formatEther(campaign.totalAmount.toString())} ETH
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Fotoğraflar */}
        <div className="row mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="col-md-3 mb-3">
              <img
                src={photo}
                alt={`Campaign Photo ${index + 1}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Campaign;
