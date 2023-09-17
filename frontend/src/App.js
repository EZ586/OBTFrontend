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

const initialNodes = [
  { id: '1', position: { x: 80, y: 80 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 50 }, data: { label: '2' } },
  { id: '3', position: { x: 0, y: 60 }, data: { label: '3' } },
  { id: '4', position: { x: 0, y: 100 }, data: { label: '4' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
];


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
  
    console.log("What")

    var angle = 360 / 3;
    for (let i = 0; i < 3; i++) {
      console.log(i);
    }
  
  }, []);
  

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