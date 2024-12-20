import React, { useRef, useState } from "react";
import { useContract } from "../hooks/web3";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "./index";
import axios from "axios";
import { Contract } from "ethers";
import { configDotenv } from "dotenv";

const AddCampaign = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const goalAmountRef = useRef<HTMLInputElement>(null);
  const creatorNameRef = useRef<HTMLInputElement>(null);
  const creatorJobRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const { contract } = useContract();

  // Convert image to Base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const base64Photos = await Promise.all(
        files.map((file) => convertToBase64(file))
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...base64Photos]);
    }
  };

  // Create Campaign on Solidity Contract
  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tüm alanların doluluğunu kontrol et
      if (
        !titleRef.current?.value ||
        !descRef.current?.value ||
        !goalAmountRef.current?.value ||
        !creatorNameRef.current?.value ||
        !creatorJobRef.current?.value
      ) {
        toast.error("Please fill in all the fields.");
        setLoading(false);
        return;
      }

      const goalAmountInWei = ethers
        .parseEther(goalAmountRef.current.value)
        .toString();
      console.log("BEFORE -->", await contract.getCampaignCounter());
      // Kontrata yapılan çağrıdan `campaignCounter` değerini al
      const createCampaign = await contract.createCampaign(
        titleRef.current.value,
        descRef.current.value,
        creatorNameRef.current.value,
        creatorJobRef.current.value,
        goalAmountInWei
      );

      console.log("AFTER -->", await contract.getCampaignCounter());
      if (!createCampaign) {
        throw new Error(
          "Campaign counter could not be retrieved from the contract."
        );
      }

      const campaignCounter = await contract.getCampaignCounter();

      const apiResponse = await axios.post(
        `${import.meta.env.VITE_KEY_API_CONNECTION_STRING}/campaign/add`,
        {
          campaignId: campaignCounter.toString(),
          name: titleRef.current.value,
          photos,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("api log : ", apiResponse);
      console.log("campaign counter: ", campaignCounter);

      // Başarılı bildirim
      toast.success("Campaign created successfully!");
      console.log("API Response:", apiResponse.data);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred during campaign creation.");
    } finally {
      setLoading(false);
      navigate("/buycoffee");
    }
  };

  return (
    <form
      onSubmit={createCampaign}
      className="container mt-4 p-4 shadow rounded bg-light"
    >
      <button
        onClick={async () => {
          console.log(await contract.getCampaignCounter());
        }}
        className="btn"
      >
        campaigncounter
      </button>
      <h3 className="text-center mb-4">Create Campaign</h3>

      {/* Title and Goal Amount */}
      <div className="row mb-3">
        <div className="form-group col-12 col-md-6">
          <label className="form-label">Title</label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group col-12 col-md-6">
          <label className="form-label">Goal Amount (in ETH)</label>
          <input
            ref={goalAmountRef}
            type="number"
            id="goalAmount"
            className="form-control"
            placeholder="Enter goal amount"
            required
            step="0.01"
            min="0"
          />
        </div>
      </div>

      {/* Description */}
      <div className="form-group mb-3">
        <label className="form-label">Description</label>
        <textarea
          ref={descRef}
          id="description"
          className="form-control"
          placeholder="Enter description"
          required
        ></textarea>
      </div>

      {/* Creator Name and Job */}
      <div className="row mb-3">
        <div className="form-group col-12 col-md-6">
          <label className="form-label">Creator Name</label>
          <input
            ref={creatorNameRef}
            type="text"
            id="creatorName"
            className="form-control"
            placeholder="Enter creator name"
            required
          />
        </div>
        <div className="form-group col-12 col-md-6">
          <label className="form-label">Creator Job</label>
          <input
            ref={creatorJobRef}
            type="text"
            id="creatorJob"
            className="form-control"
            placeholder="Enter creator job"
            required
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="form-group mb-3">
        <label className="form-label">Upload Photos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="form-control"
        />
        <div className="d-flex flex-wrap mt-3">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Uploaded ${index}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
              className="rounded border"
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <LoadingButton
          isLoading={loading}
          onClick={(e) => createCampaign(e)}
          text="Submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default AddCampaign;
