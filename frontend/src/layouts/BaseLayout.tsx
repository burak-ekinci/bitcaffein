import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Project from "../components/Project";
import { Contract } from "ethers";
import { useHooks, useWeb3 } from "../components/providers/web3";
import { useAccount } from "../components/hooks/web3";

const BaseLayout = () => {
  const { ethereum, provider, contract, isLoading } = useWeb3();
  const getAccounts = async () => {
    const accounts = await provider!.listAccounts();
  };

  const getName = async () => {
    console.log(await contract!.test());
  };

  const { account } = useAccount();

  return (
    <>
      <NavBar />
      {/* <div className="container">
        -
        {`isLoading :  ${isLoading} -- ethereum: ${ethereum} -- ** provider : ${JSON.stringify(
          provider
        )}`}
      </div> */}
      <div className="container">
        <div className="card-container">
          <Project />
        </div>
      </div>
      {/* // Modal Button */}
      <button
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          width: 80,
          height: 80,
          borderRadius: "50%",
          textAlign: "center",
          fontSize: 40,
          color: "white",
        }}
        type="button"
        data-bs-toggle="modal"
        data-bs-target=".modal"
        className="btn btn-dark btn-rounded"
      >
        <i className="bi bi-patch-plus"></i>
      </button>
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Campaign</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body me-5">
              <div className="mb-3">
                {/* Title */}
                <label className="form-label">Title :</label>
                <input className="form-control" type="text" />
                {/* Description */}
                <label className="form-label mt-2">Description :</label>
                <input className="form-control" type="text" />
                {/* Creator Name */}
                <label className="form-label mt-2">Creator Name :</label>
                <input className="form-control" type="text" />
                {/* CreatorJob */}
                <label className="form-label mt-2">Creator Job :</label>
                <input className="form-control" type="text" />
                {/* Goal Amount */}
                <label className="form-label mt-2">Goal Amount :</label>
                <input className="form-control" type="number" />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Share my campaign
                }}
                type="button"
                data-bs-dismiss="modal"
                className="btn button btn-primary"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
