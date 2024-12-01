import React from "react";
import { BackgroundVideo } from "./index";
import { HomeVideo } from "./index";

const Home = () => {
  return (
    <>
      <BackgroundVideo videoSrc="/spacebg.mp4" />
      <section className="hero-section text-center d-flex align-items-center mt-0">
        <div className="container">
          <div className="row ">
            {/* Sol taraf: Metin */}
            <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-start text-start">
              <h1 className="display-2 fw-bold">
                Support Creators with a BitCoffee
              </h1>
              <p className="lead">
                Help your favorite creators by buying them a coffee.
              </p>
              <a href="#" className="btn btn-outline-light mt-3">
                Buy a Coffee
              </a>
            </div>
            {/* Sağ taraf: SVG */}
            <div
              id="home"
              className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center gap-2 "
            >
              <img
                src="/b.png"
                alt="charity foto"
                className="img-fluid btcf-home"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section id="about" className="py-5 text-light7">
        <div className="container text-center">
          <div className="row align-items-center">
            {/* Left Side */}
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <img
                src="/logo1.png"
                alt="About Us"
                className="img-fluid rounded "
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Vertical Divider */}
            <div className="d-none d-lg-block col-lg-1 ">
              <div
                style={{
                  backgroundColor: "black",
                  height: "200px",
                  width: "4px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  boxShadow: "0 1px 5px 3px white",
                }}
              ></div>
            </div>

            {/* Horizontal Divider */}
            <div className="d-lg-none d-sm-block col-lg-9 my-3">
              <div
                style={{
                  backgroundColor: "black",
                  height: "4px",
                  width: "300px",
                  borderRadius: "50%",
                  margin: "auto ",
                  boxShadow: "0 1px 5px 3px white",
                }}
              ></div>
            </div>

            {/* Right Side */}
            <div className="col-lg-5 col-md-12 text-center text-lg-start text-light">
              <h2>Who Are We?</h2>
              <p>
                At BitCaffein, we are passionate about leveraging creativity and
                innovation to deliver value to our clients. Our mission is to be
                a trusted partner in digital transformation, offering
                cutting-edge blockchain solutions and decentralized finance
                (DeFi) tools. We strive to empower businesses and individuals by
                creating secure, efficient, and user-friendly technologies that
                pave the way for a decentralized future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section id="features" className="py-5">
        <div className="container ">
          <div className="row text-center align-items-center">
            <div className="col-md-4 mb-4">
              <div className="card feature-card  p-4">
                <h3 className=" mb-3">Easy Payments</h3>
                <p>Support your favorite creators with a single click.</p>
              </div>
            </div>
            <div id="mt1" className="col-md-4 mb-4">
              <div className="card feature-card  p-4">
                <h3 className=" mb-3">Secure</h3>
                <p>We ensure that all transactions are safe and secure.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card feature-card  p-4">
                <h3 className=" mb-3">Worldwide</h3>
                <p>Support creators from any part of the globe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeVideo
        children={
          <h3>
            &copy; 2024 BitCaffein. <br /> All rights reserved.
          </h3>
        }
        videoSrc="/ethbg.mp4"
        className=""
      />
    </>
  );
};

export default Home;
