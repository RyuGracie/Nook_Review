import IslandTile from "./components/island_tile";
import { api } from "./client/client";

export default function Islands() {
  const { data: islands, isLoading } = api.useAllIslands();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-8 p-4">
        {islands?.map((island) => (
          <IslandTile key={island.dream_code} island={island} />
        ))}
      </div>
    </>
  );
}
