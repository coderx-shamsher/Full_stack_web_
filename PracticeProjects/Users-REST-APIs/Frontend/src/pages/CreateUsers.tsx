import CreateUserForm from "../components/CreateUserForm"
import HomeNavbar from "../components/HomeNavbar"


const CreateUsers = () => {
  return (
    <>
    <section className="create_user_main_container">

      <HomeNavbar/>
      <CreateUserForm/>
    </section>
    </>
  )
}

export default CreateUsers