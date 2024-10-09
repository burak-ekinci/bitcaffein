const Card = () => {
  return (
    <>
      <div className="card bg m-3 col-md-9">
        <div className="row g-0 p-3">
          {/* Card Left Side */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              width={50}
              src="./pp.png"
              alt="img"
              className="img-fluid ms-3 rounded-start"
            />
            <div className="ms-3">
              <h3>Burak Ekinci</h3>
              <h6>Blockchain Developer</h6>
            </div>
          </div>

          {/* Card Right Side */}
          <div className="col-md-8 d-flex align-items-center">
            <div className="card-body align-items-center">
              <div className="d-flex align-items-center">
                <img width={35} src="./cfe.png" alt="" className="img-fluid" />
                <span className="fs-3 ms-2">BitCaffein</span>
              </div>
              <hr />
              <div className="ms-3">
                <p>
                  Hello, my name is Burak and I'm 23. I have been working a few
                  years on blockchain and smart contract development. Support me
                  on the BitCaffein project. - BitCaffein is a charity project
                  between humans. Cheers!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------------- */}

      <div className="card bg m-3 col-md-9">
        <div className="row g-0 p-3">
          {/* Card Left Side */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              width={50}
              src="./pp.png"
              alt="img"
              className="img-fluid ms-3 rounded-start"
            />
            <div className="ms-3">
              <h3>Elon Musk</h3>
              <h6>Boş iş Developer</h6>
            </div>
          </div>

          {/* Card Right Side */}
          <div className="col-md-8 d-flex align-items-center">
            <div className="card-body align-items-center">
              <div className="d-flex align-items-center">
                <img
                  width={75}
                  src="https://upload.wikimedia.org/wikipedia/commons/9/96/SpaceX_Logo_Black.png"
                  alt=""
                  className="img-fluid"
                />
                <span className="fs-3 ms-2">SpaceX</span>
              </div>
              <hr />
              <div className="ms-3">
                <p>Hello, my name is Elon i made nothing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
