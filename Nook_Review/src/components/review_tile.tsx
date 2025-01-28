import { Rating } from "react-simple-star-rating";
import { Review } from "../client/type";

export default function ReviewTile({ review }: { review: Review }) {
  return (
    <div className="item-center flex h-min w-full flex-col rounded-2xl bg-white p-4 text-slate-900 shadow-lg shadow-slate-400/50 transition-all duration-150 sm:flex-row">
      <h2>{review.owner}</h2>
      <label>{review.date}</label>
      <label>
        Aesthetic: <Rating initialValue={review.aesth_rating} readonly={true} />
      </label>
      <label>
        Motif: <Rating initialValue={review.motif_rating} readonly={true} />
      </label>
      <label>
        Creativity:{" "}
        <Rating initialValue={review.creat_rating} readonly={true} />
      </label>
      <label>
        Overall: <Rating initialValue={review.rating} readonly={true} />
      </label>
      <p>{review.comment}</p>
    </div>
  );
}
