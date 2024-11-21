import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="card bg m-3 col-md-9">
          <div className="row g-0 p-3">
            {/* Card Left Side */}
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <img
                width={50}
                src="/pp.png"
                alt="img"
                className="img-fluid ms-3 rounded-start"
              />
              <div className="ms-3">
                <h3>Burak Ekinci ( {id} )</h3>
                <h6>Blockchain Developer</h6>
              </div>
            </div>
            {/* Card Right Side */}
            <div className="col-md-8 d-flex flex-column align-items-start justify-content-between">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <img width={35} src="/cfe.png" alt="" className="img-fluid" />
                  <span className="fs-3 ms-2">BitCaffein</span>
                </div>
                <hr />
                <div className="ms-3">
                  <p>
                    Hello, my name is Burak and I'm 23. I have been working a
                    few years on blockchain and smart contract development.
                    Support me on the BitCaffein project. - BitCaffein is a
                    charity project between humans. Cheers!
                  </p>
                </div>
              </div>
              {/* Donation Form */}
              <div className="w-100 p-3">
                <form>
                  <label htmlFor="donationAmount" className="form-label">
                    Choose your donation amount:
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      id="donationAmount"
                      className="form-control"
                      placeholder="Enter amount"
                      min="1"
                    />
                    <span className="input-group-text">$</span>
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Donate Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
