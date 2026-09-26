import "./createuserform.css";
import { useForm, type SubmitHandler } from "react-hook-form";

interface InputForms {
  UserId: number;
  username: string;
  email: string;
  password: string;
}

const CreateUserForm = () => {
  const { register, handleSubmit, reset } = useForm<InputForms>();

  const onSubmit: SubmitHandler<InputForms> = async (data) => {
    console.log(data);

    try {
      const request = await fetch("http://localhost:3069/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await request.json();
      console.log(result);
      reset();
    } catch (error) {
      console.error("Error In Post Fetch Request !! :", error);
    }

  };

  return (
    <>
      <div className="createUserForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="inputs"
            type="text"
            {...register("UserId")}
            placeholder="Enter Your UserId"
          />
          <input
            className="inputs"
            type="text"
            {...register("username")}
            placeholder="Enter Your Username"
          />
          <input
            className="inputs"
            type="email"
            {...register("email")}
            placeholder="Enter Your Email"
          />
          <input
            className="inputs"
            type="password"
            {...register("password")}
            placeholder="Enter Your Password"
          />
          <input className="submit_btn" type="submit" value={"Submit Now"} />
        </form>
      </div>
    </>
  );
};

export default CreateUserForm;
