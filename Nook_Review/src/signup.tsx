import { useNavigate } from "react-router";
import { AuthCredentials, useRegister } from "./client/auth";
import Button from "./components/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type SignupFormInputs = AuthCredentials & { confirm_password: string };

export default function Signup() {
  const navigate = useNavigate();
  const { mutate: registerMutation, isPending } = useRegister();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setRegisterError(null);

    if (data.password !== data.confirm_password) {
      setRegisterError("Passwords do not match");
      return;
    }

    await registerMutation(data, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error("Register Error:", error);

        if (error.response) {
          setRegisterError(error.response.data.error);
        } else if (error.message) {
          setRegisterError(error.message);
        } else {
          setRegisterError("An unknown error occurred.");
        }
      },
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const password = watch("password");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-sandy p-4 text-slate-900">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md shadow-slate-400/50 transition-all duration-150">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            className="rounded-lg border-2 border-slate-400/50 p-2"
            type="text"
            placeholder="Username"
            {...register("username", { required: "This field is required" })}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="rounded-lg border-2 border-slate-400/50 p-2"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            id="confirm_password"
            className="rounded-lg border-2 border-slate-400/50 p-2"
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: "This field is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <span className="text-red-500">
              {errors.confirm_password.message}
            </span>
          )}

          {registerError && (
            <span className="text-red-500">{registerError}</span>
          )}

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="text-black"
          >
            {isPending ? "Signing up..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
