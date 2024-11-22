import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const campaign = location.state as {
    id: number;
    address: string;
    creatorName: string;
    creatorJob: string;
    title: string;
    description: string;
    totalAmount: number;
    goalAmount: number;
    startTime: number;
  };

  if (!campaign) {
    return <p>No campaign data available.</p>;
  }

  return (
    <div className="container mt-4">
      <h1>{campaign.title}</h1>
      <h4>By {campaign.creatorName}</h4>
      <p>{campaign.description}</p>
      <p>Goal Amount: {campaign.goalAmount}</p>
      <p>Total Raised: {campaign.totalAmount}</p>
    </div>
  );
};

export default Profile;
