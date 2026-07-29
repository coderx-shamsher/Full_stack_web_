
const Navbar = () => {
  return (
    <>
       <header className=" bg-sky-600 text-amber-100  ">
             <ul className="flex justify-end gap-6.5 h-10 items-center mr-5.5">
                  <a href="#home">
                      <li>Home</li>
                  </a>
                  <a href="#about">
                      <li>About</li>
                  </a>
                  <a href="#contact us">
                      <li>Contact us</li>
                  </a>
                  <a href="#">
                      <li>login/sign-up</li>
                  </a>
             </ul>
       </header>
    </>
  )
}

export default Navbar