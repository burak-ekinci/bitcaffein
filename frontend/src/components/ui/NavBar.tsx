import { useAccount, useNetwork } from "../hooks/web3";
import { WalletBar } from "./index";
import { Link } from "react-router-dom";
interface Props {
  account: String;
}

const NavBar = () => {
  // const { ethereum, provider, contract, isLoading } = useWeb3();
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light  mt-3">
        <div className="container d-flex">
          <Link style={{}} to="/" className="link nav-link img-sm">
            <img
              src="/logo1.png"
              alt="About Us"
              className="img-fluid rounded "
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <Link to="/buycoffee" className="link nav-link">
                  Buy Coffee
                </Link>
              </li>
              <li className="nav-item">
                <span> | </span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <span> | </span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <span> | </span>
              </li>
              <li className="nav-item">
                <WalletBar
                  isInstalled={account.isInstalled}
                  isLoading={account.isLoading}
                  connect={account.connect}
                  account={account.data}
                  network={network.data}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>

    // <nav classNameName="navbar navbar-expand-lg px-3">
    //   <div classNameName="navbar-brand d-flex items-center">
    //     <img
    //       src="./cfe.png"
    //       alt="Logo"
    //       width="40"
    //       height="40"
    //       classNameName="d-inline-block align-text-top"
    //     />
    //     <span classNameName="ms-2 logo">BitCaffein</span>
    //   </div>
    //   <button
    //     classNameName="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarContent"
    //     aria-controls="navbarContent"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span classNameName="navbar-toggler-icon"></span>
    //   </button>
    //   <div classNameName="collapse navbar-collapse" id="navbarContent">
    //     <form classNameName="form d-flex mx-auto my-2">
    //       <input
    //         classNameName="form-control mr-sm-2"
    //         type="search"
    //         placeholder="Search"
    //         aria-label="Search"
    //       />
    //       <button
    //         classNameName="btn btn-light border rounded-circle ms-1 my-sm-0"
    //         type="submit"
    //       >
    //         <i classNameName="bi bi-search"></i>
    //       </button>
    //     </form>
    //     {/* ******************  CONNECT WALLET ***************/}
    //     <div classNameName="d-flex align-items-center">
    //       {account.data !== "Cannot retrieve account! Please connect wallet." &&
    //       account.isInstalled ? (
    //         <div classNameName="text-end d-flex flex-column">
    //           <div>
    //             <span classNameName="">
    //               {account.data?.slice(0, 5) + "..." + account.data?.slice(-4)}
    //             </span>
    //           </div>
    //           <div>
    //             <span>{network?.data}</span>
    //           </div>
    //         </div>
    //       ) : null}

    //       <WalletBar
    //         isInstalled={account.isInstalled}
    //         isLoading={account.isLoading}
    //         connect={account.connect}
    //         account={account.data}
    //         network={network.data}
    //       />
    //     </div>
    //     {/* ******************* */}
    //   </div>
    // </nav>
  );
};

export default NavBar;
