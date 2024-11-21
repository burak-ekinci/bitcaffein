import { auto } from "@popperjs/core";
import { FunctionComponent } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type WalletBarProps = {
  isLoading: boolean;
  isInstalled: boolean;
  account: string | undefined;
  network: string | undefined;
  connect: () => void;
};

const WalletBar: FunctionComponent<WalletBarProps> = ({
  isLoading,
  isInstalled,
  account,
  network,
  connect,
}) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2 text-muted">Connecting to wallet...</span>
      </div>
    );
  }

  if (!isInstalled) {
    console.log(isInstalled);
    return (
      <div className="text-center">
        <p className="text-danger fs-6 mb-2">MetaMask is not installed!</p>
        <button
          type="button"
          onClick={() => window.open("https://metamask.io", "_blank")}
          className="btn btn-sm btn-danger"
        >
          Install MetaMask
        </button>
      </div>
    );
  }

  if (account === "Cannot retrieve account! Please connect wallet.") {
    return (
      <button
        id="connectwallet"
        onClick={connect}
        className="btn btn-sm rounded-2 m-1 text-center"
      >
        Connect Wallet
      </button>
    );
  }

  if (!account) {
    return (
      <div className="text-center">
        <p className="text-muted mb-2">Wallet not connected.</p>
        <button onClick={connect} className="btn btn-success rounded-pill px-4">
          <i className="bi bi-wallet2 me-2"></i> Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center ms-2">
      <div className="text-end">
        <p className="mb-0 fw-bold">
          {account.slice(0, 6)}...{account.slice(-4)}
        </p>
        <p className="mb-0 text-muted small">{network || "Unknown Network"}</p>
      </div>
      <div className="dropdown ms-3">
        <button
          style={{
            width: "60px",
            height: "60px",
            backgroundImage: "url('/pp.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="btn rounded-circle border border-2 border-primary"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>

        <ul
          style={{ position: "absolute" }}
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <Link to={"/addcampaign"} className="dropdown-item">
              <i className="bi bi-plus-circle me-2"></i> Add Campaign
            </Link>
          </li>
          <li>
            <Link to={"/mycampaigns"} className="dropdown-item">
              <i className="bi bi-person-lines-fill me-2"></i> My Campaigns
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item">
              <i className="bi bi-box-arrow-right me-2"></i> Disconnect Wallet
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WalletBar;
