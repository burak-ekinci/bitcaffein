import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useContract } from "../hooks/web3";
import { useNavigate, useParams } from "react-router-dom";

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

const MyCampaign = (): JSX.Element => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { contract } = useContract();
  const { account } = useAccount();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [donationAmount, setDonationAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getCampaign = async () => {
    setLoading(true);
    try {
      const campaignData = await contract!.getCampaignById(id as string);
      if (campaignData.length == 0) {
        toast.info("There is no campaign");
        navigate("/");
        return;
      }
      if (campaignData.creator != account.data) {
        toast.warning("Unauthorized!");
        navigate("/buycoffee");
      }
      setCampaign(campaignData);

      // Fotoğrafları al
      const photoResponse = await axios.get(
        `${import.meta.env.VITE_KEY_API_CONNECTION_STRING}/campaign/get/${id}`
      );
      setPhotos(photoResponse.data.campaign.photos || []);
    } catch (error) {
      console.error("Error fetching campaign or photos:", error);
      toast.error("Failed to load campaign details or photos.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async () => {
    if (!id) {
      toast.error("Campaign ID not found.");
      return;
    }
    try {
      setLoading(true);
      await contract!.deleteCampaign(ethers.toBigInt(campaign!.id));
      toast.success("Campaign deleted successfully!");
      setCampaign(null);
      navigate("/mycampaigns");
    } catch (error: any) {
      console.error("Error during campaign deletion:", error);
      toast.error(error.message || "Failed to delete campaign.");
    } finally {
      setLoading(false);
    }
  };

  const withdrawDonations = async () => {
    try {
      setLoading(true);
      await contract!.withdrawDonations(Number(id));
      toast.success("Donations withdrawn successfully!");
      await getCampaign();
    } catch (error: any) {
      toast.error(error.message || "Failed to withdraw donations.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect ile veriyi sayfa yüklendiğinde çek
  useEffect(() => {
    getCampaign();
  }, [id]);

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
      <div id="bg" className="container card bg col-md-9 mt-4">
        <div className="row g-0 p-3">
          {/* Delete Campaign */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <button
              style={{
                position: "absolute",
                top: 5,
                left: 5,
                cursor: "pointer",
                textShadow: "0px 2px 2px 0px blue",
              }}
              className="btn shadow-red p-2 bg-danger-"
              onClick={() => setShowModal(true)}
              aria-label="Delete Campaign"
            >
              <i className="bi bi-trash3 fs-4 text-secondary p-2"></i>
            </button>
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
                <p>
                  <strong>Goal Amount: </strong>
                  {ethers.formatEther(campaign.goalAmount.toString())} ETH
                </p>
                <p>
                  <strong>Total Raised: </strong>
                  {ethers.formatEther(campaign.totalAmount.toString())} ETH
                </p>
              </div>
            </div>
            <div className="container">
              <div
                className="progress "
                role="progressbar"
                aria-label="Info striped example"
              >
                <div
                  className="progress-bar progress-bar-striped bg-info"
                  style={{
                    width: `${getProgressBarValue(
                      parseInt(campaign.goalAmount.toString()),
                      parseInt(campaign.totalAmount.toString())
                    )}%`,
                  }}
                >
                  {Math.ceil(
                    getProgressBarValue(
                      parseInt(campaign.goalAmount.toString()),
                      parseInt(campaign.totalAmount.toString())
                    )
                  )}
                  %
                </div>
              </div>
            </div>
            <div className="p-3">
              <button
                onClick={withdrawDonations}
                className="btn btn-warning w-100"
                disabled={loading}
              >
                Withdraw Donations
              </button>
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
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this campaign?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteCampaign}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCampaign;
