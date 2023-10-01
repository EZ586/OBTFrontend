import React from "react";
import { ForceGraph2D } from "react-force-graph";
import "./MindMap.css";

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [
      {
        id: "1",
        name: "Post: I like cheese",
        val: 10,
      },
      {
        id: "2",
        name: "Opinion: I hate cheese",
        val: 10,
      },
      {
        id: "3",
        name: "Opinion: I like cheese too",
        val: 10,
      },
    ],
    links: [
      {
        source: "1",
        target: "2",
      },
      {
        source: "1",
        target: "3",
      },
    ],
  };
}

// gen a number persistent color from around the palette
const getColor = (n) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");

const MindMap = () => {
  return (
    <div>
      <div className="test">
        <h1>Opinion Breakdown Tool</h1>
      </div>
      <div>
        <ForceGraph2D
          graphData={genRandomTree(20)}
          nodeLabel="id"
          nodeCanvasObject={(node, ctx) => {
            ctx.fillStyle = getColor(node.id);
            ctx.font = "10px Sans-Serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.name, node.x, node.y);
          }}
        />
      </div>
    </div>
  );
};

export default MindMap;
