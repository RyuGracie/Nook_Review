import { Island } from "../client/type";

export default function IslandTile({ island }: { island: Island }) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-800 p-4">
      <h1 className="text-4xl text-white">{island.name}</h1>
      <img src={island.image} alt={island.name} className="h-64 w-64" />
      <p className="text-white">{island.description}</p>
    </div>
  );
}
