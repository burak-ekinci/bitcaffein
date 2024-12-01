const Project = () => {
  return (
    <>
      <div className="container col-md-9 mt-3">
        <div className="bg row mb-3 p-3 d-flex justify-content-center align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <img src="./pp.png" width={40} alt="img" />
            <h1>BitCaffein</h1>
          </div>
          <div className="col-md-6 text-right">
            <p className="text-right">
              - BitCaffein is a charity project between humans. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Velit excepturi
              consectetur ducimus natus nulla nisi neque veniam aspernatur vitae
              dicta quia sunt eos, facilis aliquam sint dolorum iure. Unde,
              corrupti.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="card bg col p-3">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img className="me-2" src="./pp.png" width="60" alt="img" />
              <div>
                <h3>Burak Ekinci</h3>
                <h5>Blockchain Developer</h5>
              </div>
            </div>

            <div>
              <p>
                Hello my name is Burak and I'm 23. I was working a few years on
                the blockchain and smartcontract development. Support me on
                BitCaffein project. Cheers! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Distinctio velit eaque enim
                rerum, cumque voluptatem, blanditiis fuga nihil beatae est nisi
                error provident expedita ut ex a amet ipsum quasi.
              </p>
            </div>
          </div>
          {/* <div className="col w-1"></div> */}

          <div className="bg ms-3 col p-2 d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              <form onSubmit={() => {}}>
                <div className="">
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="text"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                    <span className="input-group-text">ETH</span>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div className="container text-center">
                      <button className="img-button">
                        <img src="./cfe1.png" alt="Button Image" />
                        <div className="overlay">1</div>
                      </button>
                      <button className="img-button mx-3">
                        <img src="./cfe1.png" alt="Button Image" />
                        <div className="overlay">5</div>
                      </button>
                      <button className="img-button">
                        <img src="./cfe1.png" alt="Button Image" />
                        <div className="overlay">10</div>
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="button form-control mt-3">
                    SUPPORT ME
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
