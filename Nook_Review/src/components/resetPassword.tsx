import { useState } from "react";
import { api } from "../client/client";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const mutation = api.useRequestPasswordReset();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(email);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-sandy p-4 text-slate-900">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md shadow-slate-400/50 transition-all duration-150">
        <h2 className="mb-6 text-center text-2xl font-bold">Reset Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border-2 border-slate-400/50 p-2"
          />
          <button
            type="submit"
            className="rounded-xl px-7 py-3 text-base font-semibold text-slate-900 transition duration-300 ease-in-out hover:bg-slate-800/35"
          >
            Request Reset
          </button>
        </form>
        {mutation.isSuccess && (
          <p className="mt-4 text-center text-green-500">
            Check your email for the reset link
          </p>
        )}
      </div>
    </div>
  );
}
