import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "./client/client";
import { useNavigate } from "react-router";
import Button from "./components/button";

interface IslandData {
  dream_code: string;
  name: string;
  description: string;
  image: string;
  started: Date;
}

export default function RegisterIsland() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { mutate: createIsland } = api.useCreateIsland();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IslandData>();

  const onSubmit: SubmitHandler<IslandData> = async (data) => {
    if (imageBase64) {
      data.image = imageBase64;
    }
    await createIsland(data, {
      onError: (error) => {
        console.error("Create Island Error:", error);
      },
      onSuccess: () => {
        console.log("Island created successfully");
        navigate("/islands");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
      const file = target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            if (typeof reader.result === "string") {
              setImageBase64(reader.result.split(",")[1]); // Get base64 without the data URL prefix
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-sandy p-4 text-slate-900">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md shadow-slate-400/50 transition-all duration-150">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="flex flex-col gap-3">
            <label className="font-semibold" htmlFor="dream_code">
              Dream Code
            </label>
            <input
              className="rounded-lg border-2 border-slate-400/50 p-2"
              type="text"
              id="dream_code"
              {...register("dream_code", {
                required: "Dream code is required",
              })}
            />
            {errors.dream_code && (
              <span className="text-red-500">{errors.dream_code.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold" htmlFor="name">
              Island Name
            </label>
            <input
              className="rounded-lg border-2 border-slate-400/50 p-2"
              type="text"
              id="name"
              {...register("name", { required: "Island name is required" })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              className="rounded-lg border-2 border-slate-400/50 p-2"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold" htmlFor="image">
              Island Image
            </label>
            <input
              className="rounded-lg border-2 border-slate-400/50 p-2"
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold" htmlFor="started">
              Started Date
            </label>
            <input
              className="rounded-lg border-2 border-slate-400/50 p-2"
              type="date"
              id="started"
              {...register("started", { required: "Start date is required" })}
            />
            {errors.started && (
              <span className="text-red-500">{errors.started.message}</span>
            )}
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="p-2 px-3 text-slate-900"
          >
            Create Island
          </Button>
        </form>
      </div>
    </div>
  );
}
