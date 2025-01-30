import { api } from "./client/client";
import Button from "./components/button";
import { useNavigate, useParams } from "react-router";

type IslandPageParams = {
  username: string;
};

export default function UserIslandPage() {
  const { username } = useParams<IslandPageParams>();
  const navigate = useNavigate();
  if (!username) {
    navigate("/login");
  }
  const { data: islands, isLoading } = api.useAllIslands();

  const island = islands?.find((island) => island.owner === username);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!island) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-sandy p-4 text-slate-900">
        <h1 className="text-3xl font-bold">You don't have an island yet!</h1>
        <Button to={`../register-island`} className="text-slate-900">
          Register Your Island
        </Button>
      </div>
    );
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
            {island.name}
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
    </div>
  );
}
