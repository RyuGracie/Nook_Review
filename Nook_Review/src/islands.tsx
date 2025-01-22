import IslandTile from "./components/island_tile";
import { api } from "./client/client";

export default function Islands() {
  const { data: islands, isLoading } = api.useAllIslands();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-w-screen bg-sandy flex min-h-screen flex-row flex-wrap items-start justify-center gap-2 p-4 sm:gap-8">
        {islands?.map((island) => (
          <IslandTile key={island.dream_code} island={island} />
        ))}
      </div>
    </>
  );
}
