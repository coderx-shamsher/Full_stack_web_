import Image from "next/image";
import User from "@/components/User";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      {/* <div
        style={{
          width: "10rem",
          height: "4rem",
          backgroundColor: "AccentColor",
        }}
      >
        <h2> Hello its nextjs app </h2>
      </div> */}

      {/* <User/>   */}
      {/* this is static component  */}

      {/* Dynamic component */}

      <div
        style={{
          display: "flex",
          justifyContent: "start",
          paddingLeft: "20px",
          paddingTop: "40px",
          paddingBottom: "50px",
          paddingInline: "20px",
          backgroundColor: "cadetblue",
          gap: "50px",
          flexDirection: "column",
        }}
      >
        <Card username="coderY" role="admin" uid={10963} />
        <Card username="adminx" role="sudo" uid={10663} />
        <Card username="coder0mini" role="user" uid={10966} />
      </div>
      <hr />
      <br />


    </>
  );
}
