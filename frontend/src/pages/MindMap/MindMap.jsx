import React from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import "./MindMap.css";

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}

function nodePaint({ id, x, y }, color, ctx) {
  ctx.fillStyle = color;
  [
    () => {
      ctx.fillRect(x - 6, y - 4, 12, 8);
    }, // rectangle
    () => {
      ctx.beginPath();
      ctx.moveTo(x, y - 5);
      ctx.lineTo(x - 5, y + 5);
      ctx.lineTo(x + 5, y + 5);
      ctx.fill();
    }, // triangle
    () => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
      ctx.fill();
    }, // circle
    () => {
      ctx.font = "10px Sans-Serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Text", x, y);
    }, // text
  ][id % 4]();
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
          nodeCanvasObject={(node, ctx) =>
            nodePaint(node, getColor(node.id), ctx)
          }
          nodePointerAreaPaint={nodePaint}
        />
      </div>
    </div>
  );
};

export default MindMap;
