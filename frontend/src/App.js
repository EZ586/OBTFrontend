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


// Set number of comments around center
let numComments = 5;
// nodes
let initialNodes = [
  { id: '1', position: { x: 1, y: 1 }, data: { label: 'Cluster 1' } },
  { id: '2', position: { x: 1, y: 1 }, data: { label: '2' } },
  { id: '3', position: { x: 1, y: 1 }, data: { label: '3' } },
  { id: '4', position: { x: 1, y: 1 }, data: { label: '4' } },
];
// edges
let initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
];
// test node
let initTestNodes = [{ id: '1', position: { x: 1, y: 1 }, data: { label: 'Cluster 1' } }]
// test edges
let initTestEdges = []
// create nodes/edges based on number of comments
for (let i = 2; i < numComments + 2; i++) {
  console.log(i);
  initTestNodes.push({ id: i.toString(), position: { x: 1, y: 1 }, data: { label: i.toString() } })
  initTestEdges.push({ id: 'e1-'+i.toString(), source: '1', target: i.toString() })
}
console.log(initTestNodes)
//pls work
initialNodes = initTestNodes;
initialEdges = initTestEdges;
// initialize values
var NodeNum = initialNodes.length - 1;
var angle = 2 * Math.PI / NodeNum;
var currAngle = 0;
var radius = 200;
// Updated positions
for (let i = 1; i < NodeNum + 1; i++) {
  console.log(i);
  console.log(JSON.stringify(initialNodes[i].position));
  initialNodes[i].position.x = Math.cos(currAngle) * radius;
  console.log(Math.cos(currAngle)) 
  initialNodes[i].position.y = Math.sin(currAngle) * radius;
  console.log(JSON.stringify(initialNodes[i].position));
  currAngle = currAngle + angle;
}
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
    
  );
}