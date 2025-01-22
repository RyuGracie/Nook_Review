import { Link } from "react-router";
import { Island } from "../client/type";

export default function IslandTile({ island }: { island: Island }) {
  return (
    <Link key={island.name} to={`/island/${island.name}`} state={{ island }}>
      <div className="flex h-fit w-full max-w-md flex-col items-center justify-center rounded-2xl bg-white p-4 text-slate-900 shadow-lg shadow-slate-400/50 transition-all duration-150 hover:shadow-slate-500 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
          {island.name}
        </h1>
        <label className="text-sm sm:text-base md:text-lg">
          {island.owner}
        </label>
        <div className="relative aspect-square w-40 sm:w-48 md:w-56 lg:w-64">
          <img
            src={`data:image/jpeg;base64,${island.image}`}
            alt={island.name}
            className="absolute inset-0 h-full w-full rounded-xl border-2 object-cover"
          />
        </div>
      </div>
    </Link>
  );
}
