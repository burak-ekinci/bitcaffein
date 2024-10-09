import { useState } from "react";
import { useHooks, useWeb3 } from "../components/providers/web3";
import { useAccount } from "./hooks/web3";
import WalletBar from "./WalletBar";
interface Props {
  account: String;
}

const NavBar = () => {
  // const { ethereum, provider, contract, isLoading } = useWeb3();
  const { account } = useAccount();

  return (
    <nav className="navbar navbar-expand-lg px-3">
      <div className="navbar-brand d-flex items-center">
        <img
          src="./cfe.png"
          alt="Logo"
          width="40"
          height="40"
          className="d-inline-block align-text-top"
        />
        <span className="ms-2 logo">BitCaffein</span>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <form className="form d-flex mx-auto my-2">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-light border rounded-circle ms-1 my-sm-0"
            type="submit"
          >
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* ******************  CONNECT WALLET ***************/}
        <WalletBar
          isInstalled={account.isInstalled}
          isLoading={account.isLoading}
          connect={account.connect}
          account={account.data}
        />
        {/* ******************* */}
      </div>
    </nav>
  );
};

export default NavBar;
