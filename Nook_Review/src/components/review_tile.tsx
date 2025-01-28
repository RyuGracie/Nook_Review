import { Rating } from "react-simple-star-rating";
import { Review } from "../client/type";

export default function ReviewTile({ review }: { review: Review }) {
  return (
    <div className="item-center flex h-min w-full flex-row gap-3 rounded-2xl bg-white p-4 text-slate-900 shadow-lg shadow-slate-400/50 transition-all duration-150 sm:flex-row">
      <div className="flex flex-col gap-2">
        <label>
          Aesthetic:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            initialValue={review.aesth_rating}
            readonly={true}
          />
        </label>
        <label>
          Motif:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            size={40}
            initialValue={review.motif_rating}
            readonly={true}
          />
        </label>
        <label>
          Creativity:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            initialValue={review.creat_rating}
            readonly={true}
          />
        </label>
        <label>
          Overall:{" "}
          <Rating
            SVGstyle={{ display: "inline" }}
            initialValue={review.rating}
            readonly={true}
          />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <h2>{review.owner}</h2>
        <label>{review.date}</label>
        <p>{review.comment}</p>
      </div>
    </div>
  );
}
