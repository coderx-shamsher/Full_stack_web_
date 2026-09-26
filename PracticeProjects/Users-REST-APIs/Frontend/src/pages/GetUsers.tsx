
import GetUsersCard from "../components/GetUsersCard";
import HomeNavbar from "../components/HomeNavbar";

const GetUsers = () => {
 

  return (
    <>
      <HomeNavbar />
      <section
        className="Cards"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(77, 77, 61, 0.46)",
          display: "flex",
          gap : "10px",
          flexDirection : "column",
          paddingLeft : "10px",
          flexWrap : "wrap"
        }}
      >
        <GetUsersCard />
      </section>
    </>
  );
};

export default GetUsers;
