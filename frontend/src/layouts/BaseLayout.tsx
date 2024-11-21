import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Project from "../components/Project";
import { Contract } from "ethers";
import { useHooks, useWeb3 } from "../components/providers/web3";
import { useAccount } from "../components/hooks/web3";
import Footer from "../components/Footer";

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const { ethereum, provider, contract, isLoading } = useWeb3();

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts();
  };

  const getName = async () => {
    console.log(await contract);
  };
  // getName();
  const { account } = useAccount();

  return (
    <>
      <NavBar />
      <div className="">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default BaseLayout;

{
  /* <div className="container">
  -
  {`isLoading :  ${isLoading} -- ethereum: ${ethereum} -- ** provider : ${JSON.stringify(
    provider
  )}`}
</div> */
}
