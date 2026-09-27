import { useForm, type SubmitHandler } from "react-hook-form";
import "./Removeuserform.css"

export interface InputForms {
  UserId: string;
  email: string;
  password: string;
}

const RemoveUserForm = () => {
    const { register, handleSubmit, reset } = useForm<InputForms>();

  const onSubmit: SubmitHandler<InputForms> = async (data) => {
    console.log(data);

    try {
      const request = await fetch("http://localhost:3069/remove-user", {
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
      <div className="RemoveUserForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="inputs"
            type="text"
            {...register("UserId")}
            placeholder="Enter Your UserId"
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
          <input className="submit_btn" type="submit" value={"Remove User"} />
        </form>
      </div>
    </>
  );
};

export default RemoveUserForm;
