import React, { useRef, useState } from "react";
import { useContract } from "./hooks/web3";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import LoadingButton from "./LoadingButton";

const AddCampaign = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const goalAmountRef = useRef<HTMLInputElement>(null);
  const creatorNameRef = useRef<HTMLInputElement>(null);
  const creatorJobRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const { contract } = useContract();

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfa yenilemeyi engelle
    setLoading(true);

    try {
      // Tüm alanların dolu olduğundan emin olun
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

      // Goal Amount Ether'e çevrilmesi
      const goalAmountInWei = ethers
        .parseEther(goalAmountRef.current.value)
        .toString();

      // Akıllı sözleşme çağrısı
      await contract.createCampaign(
        titleRef.current.value,
        descRef.current.value,
        creatorNameRef.current.value,
        creatorJobRef.current.value,
        goalAmountInWei // Wei olarak gönderilir
      );

      setLoading(false);
      toast.success("Campaign created successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create campaign.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={createCampaign}
      className="container mt-4 p-4 shadow rounded bg-light"
    >
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

      {/* Submit Button */}
      <div className="text-center">
        <LoadingButton
          isLoading={loading}
          onClick={(e) => createCampaign(e)} // Buton için ayrı onClick kullanımı
          text="Submit"
          disabled={loading} // Yükleme sırasında buton devre dışı
        />
      </div>
    </form>
  );
};

export default AddCampaign;
