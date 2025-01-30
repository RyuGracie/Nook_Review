import { useState } from "react";
import { AuthCredentials, useLogin } from "./client/auth";
import Button from "./components/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "./components/authContext";

export default function Login() {
  const { mutate: loginMutation, isPending } = useLogin();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginCont } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>();

  const onSubmit: SubmitHandler<AuthCredentials> = async (data) => {
    setLoginError(null);
    await loginMutation(data, {
      onError: (error) => {
        setLoginError(error.name || "Invalid credentials");
      },
      onSuccess: () => {
        loginCont();
        navigate("/islands");
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-sandy p-4 text-slate-900">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md shadow-slate-400/50 transition-all duration-150">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label>Login:</label>
          <input
            className="rounded-lg border-2 border-slate-400/50 p-2"
            type="text"
            placeholder="Username"
            {...register("username", { required: "This field is required" })}
          />
          {errors.username && <span>{errors.username.message}</span>}
          <label>Password:</label>
          <input
            className="rounded-lg border-2 border-slate-400/50 p-2"
            type="password"
            placeholder="Password"
            {...register("password", { required: "This field is required" })}
          />

          {loginError && <span className="text-red-500">{loginError}</span>}
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="text-black"
          >
            {isPending ? "Logging in..." : "Submit"}
          </Button>
        </form>
        <Button to="forgot-password" className="text-black">
          Forgot Password?
        </Button>
      </div>
    </div>
  );
}
