import { useState } from "react";
import "./styles/buttoncomponent.css";
import "./styles/menuui.css";
import Submenu from "./Submenu";
import Testsubmenu from "./Testsubmenu";
import "./styles/test.css";
import ThemesList from "./ThemesList";
import Test from "./Test";
import List from "../pages/List";
import ThemeChangerfnc from "../pages/List";

const Themechanger = () => {
  const [open, setopen] = useState("close");
  const [close] = useState("close");

  let Bg_Theme_Names = [
    { name: "MidnightGrayBG", colorvalue: "#121212", id: 1 },
    { name: "DeepSlateBG", colorvalue: "#1A1F2C", id: 2 },
    { name: "CharcoalAshBG", colorvalue: "#22252", id: 3 },
    { name: "ObsidianBlueBG", colorvalue: "#0D1117", id: 4 },
    { name: "DarkForestBG", colorvalue: "#141E1B", id: 5 },
    { name: "SoftAlabasterBG", colorvalue: "#F8F9FA", id: 6 },
    { name: "WarmMilkBG", colorvalue: "#FDFBF7", id: 7 },
    { name: "MintCreamBG", colorvalue: "#F4F9F6", id: 8 },
    { name: "IceBlueBG", colorvalue: "#F0F4F8", id: 9 },
    { name: "MinimalLinenBG", colorvalue: "#F5F5DC", id: 10 },
    { name: "PureAlabasterBG", colorvalue: "#F2EFE9", id: 11 },
    { name: "SoftBoneBG", colorvalue: "#EAE6DF", id: 12 },
    { name: "WarmChalkBG", colorvalue: "#F9F6F0", id: 13 },
    { name: "MutedPumiceBG", colorvalue: "#DCD7CE", id: 14 },
    { name: "DeepObsidianBG", colorvalue: "#0B0C10", id: 15 },
    { name: "MidnightCharcoalBG", colorvalue: "#121212", id: 16 },
    { name: "RichGunmetalBG", colorvalue: "#1F2833", id: 17 },
    { name: "SlateAsphaltBG", colorvalue: "#2A2E35", id: 18 },
    { name: "InkNavyBG", colorvalue: "#0F172A", id: 19 },
    { name: "DustyRoseBG", colorvalue: "#F3E8EE", id: 20 },
    { name: "SageMistBG", colorvalue: "#E2EBE4", id: 21 },
    { name: "HazyLavenderBG", colorvalue: "#EAE6FA", id: 22 },
    { name: "PaleOasisBG", colorvalue: "#E0F2F1", id: 23 },
    { name: "ButtercreamBG", colorvalue: "#FFF9E6", id: 24 },
    { name: "MutedOliveBG", colorvalue: "#556B2F", id: 25 },
    { name: "TerracottaClayBG", colorvalue: "#C27D65", id: 26 },
    { name: "SteelBlueBG", colorvalue: "#4682B4", id: 27 },
    { name: "SmokedPlumBG", colorvalue: "#4A3B4E", id: 28 },
    { name: "WarmTaupeBG", colorvalue: "#B38B6D", id: 29 },
    { name: "OffWhiteCanvasBG", colorvalue: "#FAFAFA", id: 30 },
    { name: "CoolPlatinumBG", colorvalue: "#F5F7FA", id: 31 },
    { name: "SoftSilverBG", colorvalue: "#E5E7EB", id: 32 },
    { name: "SmokeWhisperBG", colorvalue: "#F3F4F6", id: 33 },
    { name: "ZincGrayBG", colorvalue: "#D1D5DB", id: 34 },
  ];

  const Text_Colors = [
    { name: "MidnightGrayText", colorvalue: "#E0E0E0", id: 1 },
    { name: "ACharcoalAshText", colorvalue: "#EAEAEA", id: 2 },
    { name: "DeepSlateText", colorvalue: "#F1F5F9", id: 3 },
    { name: "ObsidianBlueText", colorvalue: "#C9D1D9", id: 4 },
    { name: "SoftAlabasterText", colorvalue: "#212529", id: 5 },
    { name: "DarkForestText", colorvalue: "#E2F1EC", id: 6 },
    { name: "WarmMilkText", colorvalue: "#2D2219", id: 7 },
    { name: "MintCreamText", colorvalue: "#1A2E26", id: 8 },
    { name: "IceBlueText", colorvalue: "#102A43", id: 9 },
    { name: "MinimalLinenText", colorvalue: "#333333", id: 10 },
  ];
  const renderui = () => {
    if (open === "open") {
      return (
        <>
          <ThemeChangerfnc txtcolor={Text_Colors} bgcolor={Bg_Theme_Names} />
        </>
      );
    }
  };

  return (
    <>
      <div className="bg-[#d6d5d5e4] text-stone-900 w-screen h-[5rem] rounded-4xl flex items-center pl-4">
        <div className="menu">
          <button
            onClick={() => {
              setopen("open");

              if (open === "open") {
                setopen(close);
              }
            }}
            className="bgchanger"
          >
            {open}
          </button>
        </div>

        <ul className="flex justify-between items-center pt-[10px] pr-3 pl-3 tracking-tight "></ul>
      </div>
      <section className="  min-w-[80vw] max-w-[90vw] flex gap-10 p-3 ml-0 mt-2 justify-center items-center ">
        {renderui()}
      </section>
    </>
  );
};

export default Themechanger;
