import React from "react";

const Support = () => {
  return (
    <section id="support" className="py-5">
      <div className="container text-center">
        <h2>Support a Creator</h2>
        <p>
          Choose how many coffees you'd like to buy and leave a message for your
          favorite creator.
        </p>
        <form className="mx-auto" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label className="form-label">Creator's Name</label>
            <input
              type="text"
              className="form-control"
              id="creatorName"
              placeholder="Enter creator's name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Number of Coffees</label>
            <input
              type="number"
              className="form-control"
              id="coffeeCount"
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              id="message"
              placeholder="Write a message"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Support Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Support;
