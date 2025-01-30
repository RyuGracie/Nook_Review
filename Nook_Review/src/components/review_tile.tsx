import { Rating } from "react-simple-star-rating";
import { Review } from "../client/type";

export default function ReviewTile({ review }: { review: Review }) {
  return (
    <div className="item-center flex h-min w-full flex-row gap-3 rounded-2xl bg-white p-4 text-slate-900 shadow-lg shadow-slate-400/50 transition-all duration-150 sm:flex-row">
      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold">
          Overall:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            initialValue={review.rating}
            readonly={true}
          />
        </label>
        <label>
          Aesthetic:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            size={30}
            initialValue={review.aesth_rating}
            readonly={true}
          />
        </label>
        <label>
          Motif:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            size={30}
            initialValue={review.motif_rating}
            readonly={true}
          />
        </label>
        <label>
          Creativity:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            size={30}
            initialValue={review.creat_rating}
            readonly={true}
          />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">{review.owner}</h2>
        <label className="text-sm text-gray-500">{review.date}</label>
        <p className="text-base text-gray-700">{review.comment}</p>
      </div>
    </div>
  );
}
