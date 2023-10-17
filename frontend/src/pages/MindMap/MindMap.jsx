import React, {
  useEffect,
  useRef
} from "react";
import ForceGraph2D from "react-force-graph-2d";
import "./MindMap.css";

// gen a number persistent color from around the palette
const getColor = (n) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");

const node_colors = {
  postColor: "#D7E0D5",
  cluster1: "#A7CC8A",
  cluster1_comm: "#D1E9BF",
  cluster2: "#F2EAA5",
  cluster2_comm: "#F6F2C6",
  cluster3: "#FAC492",
  cluster3_comm: "#FFE9D6",
}

const circSize = 300;

const graphObj = {
  nodes: [
    {
      id: "post",
      name: "Post: Thoughts on the Nuclear Power Plant that just became operational a few hours away?",
      val: circSize * 0.1,
      colorRect: node_colors.postColor,
      color: "transparent"
    },
    {
      id: "opinion_1",
      cluster: 1,
      name: "Opinion: Factory is beneficial, but the management of its budget is poor",
      val: circSize,
      colorRect: node_colors.cluster1,
      color: "transparent"
    },
    {
      id: "opinion1_comment1",
      cluster: 1,
      name: "Comment: Yeah billions over budget and lots of those workers that were building this were getting paid to do nothing and lots of rework.",
      val: circSize,
      colorRect: node_colors.cluster1_comm,
      color: "transparent"
    },
    {
      id: "opinion1_comment2",
      cluster: 1,
      name: "Comment: The power plant is good. The apparent mismanagement of funds so far is concerning.",
      val: circSize,
      colorRect: node_colors.cluster1_comm,
      color: "transparent"
    },
    {
      id: "opinion1_comment3",
      cluster: 1,
      name: "Comment: The plant has been operational for quite some time, they’re just adding new units to the existing plant and the third just came online. The expansion itself was hilariously over budget, but I doubt too many people will complain if the net result is a smaller bill.",
      val: circSize,
      colorRect: node_colors.cluster1_comm,
      color: "transparent"
    },
    {
      id: "opinion_2",
      cluster: 2,
      name: "Opinion: Factory has negative implications",
      val: circSize,
      colorRect: node_colors.cluster2,
      color: "transparent"
    },
    {
      id: "opinion2_comment1",
      cluster: 2,
      name: "Comment: Im not anti-nuclear but I'm sorry if I don't trust profit driven energy companies to control our nuclear power grid. We need to nationalize this industry before it's too late",
      val: circSize,
      colorRect: node_colors.cluster2_comm,
      color: "transparent"
    },
    {
      id: "opinion2_comment2",
      cluster: 2,
      name: "Comment: I lived near three mile island - my whole family has heath issues in line with what you’d expect from exposure to something like that. Why? Just Why?",
      val: circSize,
      colorRect: node_colors.cluster2_comm,
      color: "transparent"
    },
    {
      id: "opinion_3",
      cluster: 3,
      name: "Opinion: Factory is needed or good",
      val: circSize,
      colorRect: node_colors.cluster3,
      color: "transparent"
    },
    {
      id: "opinion3_comment1",
      cluster: 3,
      name: "Comment: Good. Creates permanent jobs and provides clean energy for the whole state. One of the few reasons to be proud to live here.",
      val: circSize,
      colorRect: node_colors.cluster3_comm,
      color: "transparent"
    },
    {
      id: "opinion3_comment2",
      cluster: 3,
      name: "Comment: They should build more of these",
      val: circSize,
      colorRect: node_colors.cluster3_comm,
      color: "transparent"
    },
    {
      id: "opinion3_comment3",
      cluster: 3,
      name: "Comment: Great news! As the state continues to grow and the existing coal plants are retired, having a stable and reliable source of energy will benefit us all. Lets build a couple more.",
      val: circSize * 2,
      colorRect: node_colors.cluster3_comm,
      color: "transparent"
    },
  ],
  links: [
    {
      source: "post",
      target: "opinion_1",
    },
    // Cluster 1
    {
      source: "opinion_1",
      target: "opinion1_comment1",
    },
    {
      source: "opinion_1",
      target: "opinion1_comment2",
    },
    {
      source: "opinion_1",
      target: "opinion1_comment3",
    },
    // Cluster 2
    {
      source: "post",
      target: "opinion_2",
    },
    {
      source: "opinion_2",
      target: "opinion2_comment1",
    },
    {
      source: "opinion_2",
      target: "opinion2_comment2",
    },
    // Cluster 3
    {
      source: "post",
      target: "opinion_3",
    },
    {
      source: "opinion_3",
      target: "opinion3_comment1",
    },
    {
      source: "opinion_3",
      target: "opinion3_comment2",
    },
    {
      source: "opinion_3",
      target: "opinion3_comment3",
    },
  ],
};


const MindMap = () => {

  const forceRef = useRef();
  useEffect(() => {
    forceRef.current.d3Force("charge").strength((d) => -20 * d.val);
    forceRef.current.d3Force("link").distance(200);

  });

  return (
    <div>
      <div className="MindMap_Header">
        <h1>Opinion Breakdown Tool</h1>
      </div>
      <div className="force-graph">
        <div className="mind-wrapper">
          <ForceGraph2D
            width={1600}
            height={800}
            ref={forceRef}
            graphData={graphObj}
            nodeLabel=""
            nodeAutoColorBy="group"
            nodeCanvasObjectMode={() => "after"}
            zoomToFit={0}
            nodeCanvasObject={(node, ctx) => {
              const text = node.name;
              ctx.fillStyle = node.colorRect;
              // Text wrapping logic
              const textWidth = 150; // Maximum width for text wrapping
              const fontSize = 14;
              const words = text.split(" ");
              const lines = [];
              let currentLine = words[0];
              let maxWidth = ctx.measureText(currentLine).width;

              for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const testLine = currentLine + " " + word;
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth <= textWidth) {
                  currentLine = testLine;
                  maxWidth = Math.max(maxWidth, testWidth);
                } else {
                  lines.push(currentLine);
                  currentLine = word;
                  maxWidth = Math.max(maxWidth, ctx.measureText(word).width);
                }
              }
              lines.push(currentLine);

              const textHeight = lines.length * (fontSize + 2); // Adjust the line height as needed

              // Calculate the position and size of the rectangle
              const rectWidth = maxWidth + 100; // Add some padding
              const rectHeight = textHeight + 20;
              const x = node.x - rectWidth / 2;
              const y = node.y - rectHeight / 2;

              // Render the rectangle
              ctx.fillRect(x, y, rectWidth, rectHeight);

              // Text rendering
              ctx.fillStyle = "black";
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "left";
              ctx.textBaseline = "top";
              lines.forEach((line, index) => {
                ctx.fillText(line, node.x - 100, y + index * (fontSize + 2) + 10);
              });       
            }}
          />
        </div>
        
      </div>
    </div>
  );
};

export default MindMap;
