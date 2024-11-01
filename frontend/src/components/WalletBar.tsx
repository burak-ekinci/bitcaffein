import { FunctionComponent } from "react";
import { useAccount } from "./hooks/web3";

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
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!isInstalled) {
    return (
      <button
        type="button"
        onClick={() => window.open("https://metamask.io", "_blank")}
        className="btn btn-outline-secondary"
      >
        Please Download Metamask First!
      </button>
    );
  }

  if (account === "Cannot retrieve account! Please connect wallet.") {
    return (
      <button
        onClick={connect}
        className="btn btn-outline-success rounded-5 text-center"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="profile-section dropdown d-flex align-items-center text-start">
      <img
        src="./pp.png"
        alt="Profile"
        width="50"
        height="50"
        className="dropdown-toggle my-sm-2"
        id="profileDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      />
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="profileDropdown"
      >
        <button className="dropdown-item" type="submit">
          <i className="bi bi-person-lines-fill"></i> My Campaigns
        </button>
        <hr />
        <button className="dropdown-item" type="button">
          <i className="bi bi-box-arrow-right"></i> Disconnect Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletBar;
