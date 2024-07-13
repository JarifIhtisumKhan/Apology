import { useEffect, useRef, useState } from "react";
import "./index.css";
import { gsap } from "gsap";

const messages = [
  "",
  "Do you think he's a dumdum?",
  "Congratulations, you are correct like always.",
];

function App() {
  const [state, changeState] = useState(0);
  const [isDumdumBtnClicked, setIsDumdumBtnClicked] = useState(false);

  const egg = useRef(null);
  const jarif = useRef(null);
  const dumdumForm = useRef<HTMLDivElement | null>(null);
  const matrixDecision = useRef<HTMLDivElement | null>(null);

  const yesBtn = useRef<HTMLButtonElement | null>(null);
  const noBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(egg.current, { y: -1000 });
    tl.set(jarif.current, { scale: 0 });
    tl.set(dumdumForm.current, { scale: 0 });
    tl.set(matrixDecision.current, { opacity: 0, display: "none" });
    tl.to(egg.current, {
      y: 0,
      duration: 1,
      onComplete: () => changeState(1),
    })
      .to(jarif.current, {
        scale: 1,
        delay: 1,
        duration: 1,
      })
      .to(dumdumForm.current, {
        scale: 1,
        delay: 2,
        duration: 1,
      });

    gsap.to(yesBtn.current, {
      duration: 0.3,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (state == 2) {
      gsap.to(matrixDecision.current, {
        opacity: 1,
        display: "block",
        delay: 2,
        duration: 1,
      });
    }
  }, [state]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1>From Jarif</h1>
        <div className="relative text-center">
          <img
            ref={egg}
            onClick={() => changeState(state + 1)}
            className="w-64"
            src={`/egg-${state >= 1 ? 1 : 0}.png`}
            alt=""
          />
          <div
            ref={jarif}
            className="w-64 text-center absolute top-0 flex items-center justify-center"
          >
            <img className="w-36 " src="/jarif.png" />
          </div>
        </div>
      </div>

      <div
        ref={dumdumForm}
        className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#0000003f]"
      >
        <div className="p-5 shadow-lg rounded-md bg-slate-100 w-64">
          <h2 className="text-3xl">{messages[state < 2 ? 1 : state]}</h2>
          {state != 2 && (
            <div className="flex gap-5 w-full justify-between">
              <button
                onClick={() => changeState(2)}
                className="bg-green-500 hover:bg-green-400 text-white py-2 flex-1 rounded-md mt-5"
                ref={yesBtn}
              >
                Yes
              </button>
              <button
                ref={noBtn}
                onClick={() => {
                  if (isDumdumBtnClicked == true) {
                    changeState(2);
                  } else {
                    if (!noBtn.current) {
                      return;
                    }

                    setIsDumdumBtnClicked(true);
                    noBtn.current.textContent = "Yes";
                    gsap.to(noBtn.current, {
                      duration: 0.3,
                      scale: 1.1,
                      yoyo: true,
                      repeat: -1,
                    });
                  }
                }}
                className={`${
                  isDumdumBtnClicked ? "bg-green-500" : "bg-red-500"
                } text-white py-2  flex-1 rounded-md mt-5`}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#0000003f]"
        ref={matrixDecision}
      >
        <div>
          <img src="/red_blue_pill.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
