import { useEffect, useState } from "react";
import IslandTile from "./components/island_tile";
import { Island } from "./type";

export default function Islands() {
  const [islands, setIslands] = useState<Island[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchIslands() {
    fetch("/api/islands")
      .then((response) => response.json())
      .then((data) => {
        setIslands(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchIslands();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center bg-slate-800 p-4">
        {islands.map((island) => (
          <IslandTile key={island.dream_code} island={island} />
        ))}
      </div>
    </>
  );
}
