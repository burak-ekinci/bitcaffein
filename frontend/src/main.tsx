import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectWallet from "./components/ConnectWallet.tsx";
import "./index.css";
import Card from "./components/Card.tsx";
import NavBar from "./components/NavBar.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import Project from "./components/Project.tsx";
import WalletNotDetected from "./components/WalletNotDetected.tsx";
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
    element: <BaseLayout />,
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
