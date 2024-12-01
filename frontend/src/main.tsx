import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectWallet from "./components/ui/ConnectWallet.js";
import "./index.css";
import Card from "./components/ui/Card.js";
import BaseLayout from "./layouts/BaseLayout.tsx";
import WalletNotDetected from "./components/ui/WalletNotDetected.js";
import { Web3Provider } from "./components/providers/index.ts";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Home from "./components/ui/Home.js";
import Profile from "./components/ui/Campaign.js";
import AddCampaign from "./components/ui/AddCampaign.js";
import GetCampaign from "./components/ui/getCampaign.js";
import Campaign from "./components/ui/Campaign.js";
import MyCampaign from "./components/ui/MyCampaign.js";

gsap.registerPlugin(
  useGSAP,
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
);

const router = createBrowserRouter([
  {
    path: "/connectwallet",
    element: <ConnectWallet />,
  },
  {
    path: "/giris",
    element: <WalletNotDetected />,
  },
  {
    path: "/",
    element: <BaseLayout bgColor={""} children={<Home />} />,
  },
  {
    path: "/buycoffee",
    element: (
      <BaseLayout
        bgColor={""}
        children={<GetCampaign functionType="getAllCampaigns" />}
      />
    ),
  },
  {
    path: "/campaign/:id",
    element: <BaseLayout bgColor={""} children={<Campaign />} />,
  },
  {
    path: "/addcampaign",
    element: <BaseLayout bgColor={""} children={<AddCampaign />} />,
  },
  {
    path: "/mycampaigns",
    children: [
      {
        path: "",
        element: (
          <BaseLayout
            bgColor={""}
            children={<GetCampaign functionType="getMyCampaigns" />}
          />
        ),
      },
      {
        path: "campaign",
        element: (
          <BaseLayout
            bgColor={""}
            children={<GetCampaign functionType="getMyCampaigns" />}
          />
        ),
      },
      {
        path: "campaign/:id",
        element: <BaseLayout bgColor={""} children={<MyCampaign />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" />
    </Web3Provider>
  </React.StrictMode>
);
