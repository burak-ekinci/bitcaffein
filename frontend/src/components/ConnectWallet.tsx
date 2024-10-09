import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useAccount } from "./hooks/web3";
import { useNavigate } from "react-router-dom";

interface Props {
  connect: () => void;
}
// hamster 288M 550k 15:25
const ConnectWallet = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  const { account } = useAccount();

  useEffect(() => {
    gsap.to(contentRef.current, {
      duration: 1,
      opacity: 1, // Opaklığı tam yapar
      y: 0, // Y pozisyonunu normal duruma çeker
      ease: "circ.in", // Yavaşça durma efekti ekler
    });
  }, []);

  return (
    <div className="connect">
      <div className="content text-start" ref={contentRef}>
        <h2 className="powered-by">Brewed on Blockchain,</h2>
        <h3 className="powered-by">
          Powered by <span className="bitcaffein">BitCaffein</span>
        </h3>
        <button
          onClick={() => {
            gsap.to(buttonRef.current, {
              backgroundColor: "#fe2600",
              duration: 1.2,
              rotation: -10,
              x: -10,
              scale: 12,
              ease: "power1.inOut",
              onComplete: () => {
                const acc = account.connect();
              },
            });
          }}
          // onMouseLeave={() =>
          //   gsap.to(buttonRef.current, {
          //     scale: 1,
          //     duration: 0.3,
          //     ease: "power1.inOut",
          //   })
          // }
          // onMouseEnter={() =>
          //   gsap.to(buttonRef.current, {
          //     scale: 1.2,
          //     duration: 0.3,
          //     ease: "power1.inOut",
          //   })
          // }
          className="btn-custom mt-4"
          ref={buttonRef}
        >
          <span>Let's grab a</span>
          <span className="highlight"> bit coffee</span>
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
