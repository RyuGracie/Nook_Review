import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "./button";
import { Rating } from "react-simple-star-rating";
import { api } from "../client/client";
import { useContext } from "react";
import { IslandContext } from "../islandPage";
import { Island } from "../client/type";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewFormInput {
  aesth_rating: number;
  motif_rating: number;
  creat_rating: number;
  comment: string;
}

export default function ReviewForm({
  disabled,
  onReviewPosted,
}: {
  disabled: boolean;
  onReviewPosted: () => void;
}) {
  const island: Island | undefined = useContext(IslandContext);
  if (!island) {
    throw new Error("IslandContext is not available");
  }
  const { mutate: sendReview } = api.useSendReview(island);
  const queryClient = useQueryClient(); // Get the query client

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormInput>();

  const onSubmit: SubmitHandler<ReviewFormInput> = async (data) => {
    sendReview(data, {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        console.log("Review sent");
        onReviewPosted();
        queryClient.invalidateQueries({ queryKey: ["reviews", island.id] });
        reset();
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md shadow-slate-400/50 transition-all duration-150">
      <form className="flex flex-row gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label>Aesthetic Rating:</label>
          <Controller
            name="aesth_rating"
            control={control}
            rules={{ required: "This field is required", min: 1, max: 5 }}
            render={({ field: { onChange } }) => (
              <Rating
                SVGstyle={{ display: "inline" }}
                transition={false}
                onClick={onChange}
              />
            )}
          />
          {errors.aesth_rating && <span>{errors.aesth_rating.message}</span>}
          <label>Motif Rating:</label>
          <Controller
            name="motif_rating"
            control={control}
            rules={{ required: "This field is required", min: 1, max: 5 }}
            render={({ field: { onChange } }) => (
              <Rating
                SVGstyle={{ display: "inline" }}
                transition={false}
                onClick={onChange}
              />
            )}
          />
          {errors.motif_rating && <span>{errors.motif_rating.message}</span>}
          <label>Creativity Rating:</label>
          <Controller
            name="creat_rating"
            control={control}
            rules={{ required: "This field is required", min: 1, max: 5 }}
            render={({ field: { onChange } }) => (
              <Rating
                SVGstyle={{ display: "inline" }}
                transition={false}
                onClick={onChange}
              />
            )}
          />
          {errors.creat_rating && <span>{errors.creat_rating.message}</span>}
        </div>
        <div className="flex flex-col gap-3">
          <label>Review:</label>
          <textarea
            {...register("comment")}
            className="h-full rounded-md p-2 ring-1 ring-slate-500"
          />
          <Button
            disabled={disabled}
            onClick={handleSubmit(onSubmit)}
            className="text-black"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
