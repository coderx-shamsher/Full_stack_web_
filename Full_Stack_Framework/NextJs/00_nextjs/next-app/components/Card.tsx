type Card_type = {
  username: string;
  role: string;
  uid: number;
};

// just ek type create kra hai now use component mein use krna hai with props
export default function Card({ username, role, uid }: Card_type) {
  return (
    <section
      style={{
        width: "20rem",
        height: "10rem",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        gap : "10px",
        flexDirection : 'column',
        backgroundColor : "lightgray",
        color : "black"
      }}
    >
      <h1>{username}</h1>
      <h3>{role}</h3>
      <h4>{uid}</h4>
    </section>
  );
}
