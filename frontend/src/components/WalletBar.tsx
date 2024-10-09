import { FunctionComponent } from "react";
import { useAccount } from "./hooks/web3";

type WalletBarProps = {
  isLoading: boolean;
  isInstalled: boolean;
  account: string | undefined;
  connect: () => void;
};

const WalletBar: FunctionComponent<WalletBarProps> = ({
  isLoading,
  isInstalled,
  account,
  connect,
}) => {
  console.log("isLoading", isLoading);
  console.log("isInstalled", isInstalled);

  return (
    <>
      {/* ******************  CONNECT WALLET ***************/}
      {account == "Cannot retrieve account! Please connect wallet." ? (
        <button
          onClick={() => {
            connect();
          }}
          className="btn btn-outline-dark"
        >
          connect wallet
        </button>
      ) : (
        <div className="profile-section dropdown d-flex align-items-center">
          <span className="mr-2 fs-5">{account}</span>
          <img
            src="./pp.png"
            alt="Profile"
            width="40"
            height="40"
            className="dropdown-toggle my-sm-3"
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
      )}
      {/* ******************* */}
    </>
  );
};

export default WalletBar;
