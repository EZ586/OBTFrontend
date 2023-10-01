"use client";
import { ForceGraph2D } from "react-force-graph";

export default function MaxMindMap() {
  const data = {
    nodes: [
      {
        id: "id1",
        name: "name1",
        val: 1,
      },
      {
        id: "id2",
        name: "name2",
        val: 10,
      },
      {
        id: "id3",
        name: "name3",
        val: 10,
      },
    ],
    links: [
      {
        source: "id1",
        target: "id2",
      },
      { source: "id1", target: "id3" },
    ],
  };
  return <ForceGraph2D graphData={data} />;
}