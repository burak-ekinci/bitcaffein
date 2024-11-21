import React from "react";

const AddCampaign = () => {
  return (
    <>
      <form className="container mt-4 p-4 shadow rounded bg-light">
        <h3 className="text-center mb-4">Create Campaign</h3>
        <div className="row mb-3">
          {/* <!-- Title --> */}
          <div className="form-group col-12 col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Enter title"
              required
            />
          </div>
          {/* <!-- Goal Amount --> */}
          <div className="form-group col-12 col-md-6">
            <label className="form-label">Goal Amount</label>
            <input
              type="number"
              id="goalAmount"
              className="form-control"
              placeholder="Enter goal amount"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          {/* <!-- Description --> */}
          <div className="form-group col-12">
            <label className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          {/* <!-- Creator Name --> */}
          <div className="form-group col-12 col-md-6">
            <label className="form-label">Creator Name</label>
            <input
              type="text"
              id="creatorName"
              className="form-control"
              placeholder="Enter creator name"
              required
            />
          </div>
          {/* <!-- Creator Job --> */}
          <div className="form-group col-12 col-md-6">
            <label className="form-label">Creator Job</label>
            <input
              type="text"
              id="creatorJob"
              className="form-control"
              placeholder="Enter creator job"
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCampaign;
