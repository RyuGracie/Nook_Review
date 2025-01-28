import { useLocation, useParams } from "react-router";
import { Island } from "./client/type";
import ReviewForm from "./components/review_form";
import { api } from "./client/client";
import ReviewTile from "./components/review_tile";

type IslandPageParams = {
  islandName: string;
};

export default function IslandPage() {
  const { islandName } = useParams<IslandPageParams>();

  const location = useLocation();
  const island = location.state?.island as Island;

  const { data: reviews, isLoading } = api.useAllReviews(island);

  console.log(island);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4 bg-sandy p-4 text-slate-900">
      <div className="item-center flex h-min w-full flex-col rounded-2xl bg-white p-4 text-slate-900 shadow-md shadow-slate-400/50 transition-all duration-150 sm:flex-row">
        <img
          src={`data:image/jpeg;base64,${island.image}`}
          alt={island.name}
          className="m-4 aspect-video rounded-xl border-2 object-cover sm:w-2/5"
        />
        <div className="flex h-full flex-col items-start justify-center gap-3 p-4">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl">
            {islandName}
          </h1>
          <label className="text-xl font-medium">Player: {island.owner}</label>
          <label className="text-xl font-medium">
            Dream Code: {island.dream_code}
          </label>
          <div className="w-full">
            <label className="text-lg font-semibold">Description:</label>
            <p className="m-2 h-full w-full max-w-full rounded-xl p-2 ring-1 ring-slate-400/50">
              {island.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-start justify-start gap-4">
        <div className="flex h-full flex-col">
          <ReviewForm disabled={false} />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-4">
          {reviews?.map((review) => (
            <ReviewTile key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
{
  /* <button
          onClick={() => window.history.back()}
          className="rounded-xl px-7 py-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-slate-800/35"
        >
          Back
        </button> */
}
