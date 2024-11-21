import React from "react";

const Home = () => {
  return (
    <>
      <section className="hero-section text-center d-flex align-items-center">
        <div className="container">
          <div className="row ">
            {/* Sol taraf: Metin */}
            <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-start text-start">
              <h1 className="display-3 fw-bold">
                Support Creators with a BitCoffee
              </h1>
              <p className="lead">
                Help your favorite creators by buying them a coffee.
              </p>
              <a href="#" className="btn btn-outline-primary mt-3">
                Buy a Coffee
              </a>
            </div>
            {/* Sağ taraf: SVG */}
            <div
              id="home"
              className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center gap-2"
            >
              <img src="/bc.svg" alt="charity foto" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <hr />

      {/* ABOUT */}
      <section id="about" className="py-5">
        <div className="container text-center">
          <h2>About Us</h2>
          <p className="lead">
            We connect creators and their supporters to make a difference, one
            coffee at a time.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section id="features" className="">
        <div className="mx-3">
          <div className="row text-center align-items-center+p">
            <div className="col-md-4">
              <div className="card feature-card p-3">
                <h3>Easy Payments</h3>
                <p>Support your favorite creators with a single click.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div id="mt" className="card feature-card p-3">
                <h3>Secure</h3>
                <p>We ensure that all transactions are safe and secure.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card p-3">
                <h3>Worldwide</h3>
                <p>Support creators from any part of the globe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
