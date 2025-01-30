import IslandTile from "./components/island_tile";
import { api } from "./client/client";

export default function Islands() {
  const { data: islands, isLoading } = api.useAllIslands();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-w-screen flex min-h-screen flex-row flex-wrap items-start justify-start gap-2 bg-sandy p-4 sm:gap-4 md:gap-8">
        {islands?.map((island) => (
          <IslandTile key={island.dream_code} island={island} />
        ))}
      </div>
    </>
  );
}
