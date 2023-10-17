import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback
} from "react";
import ForceGraph2D from "react-force-graph-2d";

const data = {
  nodes: [
    { id: "0",
    isClusterNode: true, }, // Root node
    {
      id: "1",
      isClusterNode: true,
      name: "Transport",
      val: 50,
      color: "red"
    },
    {
      id: "2",
      color: "red",
      val: 1,
      name: "Bus"
    },
    {
      id: "3",
      color: "red",
      name: "Train"
    },
    {
      id: "10",
      color: "red",
      name: "Plane"
    },
    {
      id: "4",
      isClusterNode: true,
      val: 70,
      name: "Animal"
    },
    {
      id: "5",
      name: "Tiger"
    },
    {
      id: "6",
      name: "Dog"
    },
    {
      id: "7",
      name: "Wolf"
    },
    {
      id: "8",
      name: "Elephant"
    },
    {
      id: "9",
      name: "Cat"
    },
    {
      id: "11",
      name: "Plant",
      isClusterNode: true,
      color: "yellow",
      val: 30
    },
    {
      id: "12",
      name: "Tree",
      color: "yellow"
    },
    {
      id: "13",
      name: "Flower",
      color: "yellow"
    }
  ],
  links: [
    { source: "0", target: "1" },
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "1", target: "10" },
    { source: "4", target: "5" },
    { source: "4", target: "6" },
    { source: "4", target: "7" },
    { source: "4", target: "8" },
    { source: "0", target: "4" },
    { source: "4", target: "9" },
    { source: "11", target: "12" },
    { source: "11", target: "13" },
    { source: "0", target: "11" }
  ]
};

const MaxMindMap = () => {
  const forceRef = useRef();
  useEffect(() => {
    forceRef.current.d3Force("charge").strength((d) => -10 * d.val);
    forceRef.current.d3Force("link").distance(50);
  });

  const rootId = "0";

  const nodesById = useMemo(() => {
    const nodesById = Object.fromEntries(
      data.nodes.map((node) => [node.id, node])
    );

    // link parent/children
    data.nodes.forEach((node) => {
      node.collapsed = node.id !== rootId;
      node.childLinks = [];
    });
    data.links.forEach((link) => nodesById[link.source].childLinks.push(link));

    return nodesById;
  }, []);

  const getPrunedTree = useCallback(() => {
    const visibleNodes = [];
    const visibleLinks = [];
    (function traverseTree(node = nodesById[rootId]) {
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...node.childLinks);
      node.childLinks
        .map((link) =>
          typeof link.target === "object" ? link.target : nodesById[link.target]
        ) // get child node
        .forEach(traverseTree);
    })();

    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback(
    (node) => {
      if (node.id !== "0") {
        node.collapsed = !node.collapsed; // toggle collapse state
        setPrunedTree(getPrunedTree());
      }
    },
    [getPrunedTree]
  );

  return (

        <ForceGraph2D
          width={500}
          height={500}
          backgroundColor="lightgray"
          ref={forceRef}
          onNodeClick={handleNodeClick}
          graphData={prunedTree}
          nodeAutoColorBy="group"
          nodeCanvasObjectMode={() => "after"}
          zoomToFit={0}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black"; //node.color;
            if (node.isClusterNode) {
              ctx.fillText(label, node.x, node.y);
            } else {
              ctx.fillText(label, node.x + 20, node.y);
            }
          }}
          nodeVisibility={(node) => node.id !== "0"}
        />

  );
};

export default MaxMindMap;
