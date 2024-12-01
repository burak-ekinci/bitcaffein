import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import NavBar from "../components/ui/NavBar";
import { useWeb3 } from "../components/providers/web3";
import { useAccount } from "../components/hooks/web3";
import Footer from "../components/ui/Footer";

interface Props {
  children: ReactNode;
  bgColor: string | null | "";
}

const BaseLayout = ({ children, bgColor = "" }: Props) => {
  const { ethereum, provider, contract, isLoading } = useWeb3();

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts();
  };

  const getName = async () => {
    console.log(await contract);
  };
  // getName();

  return (
    <>
      <div id="" className={`${bgColor}`}>
        <NavBar />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default BaseLayout;
