import { Island } from "../client/type";

export default function IslandTile({ island }: { island: Island }) {
  return (
    <div className="flex h-fit w-fit flex-col items-center justify-center rounded-2xl p-4 text-slate-900 shadow-lg shadow-slate-400/50 transition-all duration-150 hover:shadow-slate-500">
      <h1 className="text-4xl">{island.name}</h1>
      <label className="">{island.owner}</label>
      <img
        src={`data:image/jpeg;base64,${island.image}`}
        alt={island.name}
        className="m-4 h-64 w-64 rounded-xl border-2 object-cover"
      />
      <p className="">{island.description}</p>
    </div>
  );
}
