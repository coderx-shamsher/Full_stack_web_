const Navbar = () => {
  return (
    <>
      <header
        style={{
          width: "full",
          height: "4rem",
          backgroundColor: "lightskyblue",
          color: "black",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          gap: "20px",
        }}
      >
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
