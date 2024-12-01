import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "../hooks/web3";

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
  campaign: Campaign;
}

const Card = ({ campaign }: Props) => {
  const navigate = useNavigate();
  const { account } = useAccount();

  const goCampaign = (campaign: Campaign) => {
    if (account.data == campaign.creator) {
      navigate(`/mycampaigns/campaign/${campaign.id}`);
    } else {
      navigate(`/campaign/${campaign.id}`);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card bg m-3 col-md-9">
          <div className="row g-0 p-3">
            {/* Card Left Side */}
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <img
                width={50}
                src="./pp.png"
                alt="img"
                className="img-fluid ms-3 rounded-start"
              />
              <a
                onClick={() => goCampaign(campaign)}
                className="ms-3 link"
                style={{ cursor: "pointer" }}
              >
                <h3>{campaign.creatorName}</h3>
                <h6>{campaign.creatorJob}</h6>
              </a>
            </div>
            {/* Card Right Side */}
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    width={35}
                    src="./cfe.png"
                    alt=""
                    className="img-fluid"
                  />
                  <span className="fs-3 ms-2">{campaign.title}</span>
                </div>
                <hr />
                <div className="ms-3">
                  <p>{campaign.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
