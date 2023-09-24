import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './App.css' 

function createTree(numComments) {
  let initialNodes = [
    { id: '1', position: { x: 1, y: 1 }, data: { label: 'Cluster 1' } },
  ];
  // edges
  let initialEdges = []
  // create nodes/edges based on number of comments
  for (let i = 2; i < numComments + 2; i++) {
    initialNodes.push({ id: i.toString(), position: { x: 1, y: 1 }, data: { label: i.toString() } })
    initialEdges.push({ id: 'e1-'+i.toString(), source: '1', target: i.toString() })
  }
  // initialize values
  var angle = 2 * Math.PI / numComments;
  var currAngle = 0;
  var radius = 200;
  // Updated positionsz
  for (let i = 1; i < numComments + 1; i++) {
    console.log(JSON.stringify(initialNodes[i].position));
    initialNodes[i].position.x = Math.cos(currAngle) * radius;
    console.log(Math.cos(currAngle)) 
    initialNodes[i].position.y = Math.sin(currAngle) * radius;
    console.log(JSON.stringify(initialNodes[i].position));
    currAngle = currAngle + angle;
  }
  return [initialNodes, initialEdges]
}
console.log("VVVVVVVVVVVVVVVVVVVVVVVV")
let [createdNodes, createdEdges] = createTree(8);
console.log("UUUUUUUUUUUUUUUUUUUUUUUUUU")
console.log(createdNodes)
console.log(createdEdges)
console.log("UUUUUUUUUUUUUUUUUUUUUUUUUU")

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(createdNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(createdEdges);


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (event, node) => {
    // Remove the clicked node and its connected edges
    const elementsToRemove = [node, ...edges.filter((edge) => edge.source !== node.id && edge.target !== node.id)];
    const updatedNodes = nodes.filter((n) => n.id !== node.id);

    // Update the state with the new nodes and edges
    let [createdNodes, createdEdges] = createTree(4);
    setNodes(createdNodes);
    setEdges(createdEdges);

  };

  return (
    <div>
      <div className='test'>
        <h1>Hello</h1>
      </div>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
    
  );
}