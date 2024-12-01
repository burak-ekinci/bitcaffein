import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const WalletNotDetected = () => {
  return (
    <div className="bg m-5 py-5 mt-5 d-block text-center align-items-center">
      <div className="">
        <h1 className="logo">BitCaffein</h1>
        <h5 className="m-5">
          You don't have an any crypto wallet on this browser
        </h5>
      </div>
      <div>
        <Link
          to={"https://metamask.io/download/"}
          onClick={() => {}}
          className="button p-3 fs-4"
        >
          {" "}
          Download Metamask
        </Link>
      </div>
    </div>
  );
};

export default WalletNotDetected;
