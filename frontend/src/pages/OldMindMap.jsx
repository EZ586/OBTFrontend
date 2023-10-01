import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';


import {Comment} from '../classes/Comment.js';
import {GraphNode} from '../classes/GraphNode.js'
import raw from '../dataset/processed_Data.txt';

// let CommentInstance = new Comment("Hello", "Tom");
// console.log(JSON.stringify(CommentInstance))

// let textValue;
// let textObj;
// fetch(raw)
//   .then(r=>r.text())
//   .then(text=> {
//     // console.log('text decoded:', text)
//     textValue = text;
//     textObj = JSON.parse(textValue);
//     console.log(textObj)
// })





// try {
//   // get res
//   const res2 = await axios.get('http://76a1-35-229-83-43.ngrok-free.app', 
//     {headers: {
//       'ngrok-skip-browser-warning': 'true', // Set the value as needed
//     }
//   });
//   console.log("_________________________________")
//   console.log(JSON.stringify(res2))

// } catch (error) {
//   console.log(error)
// }

// const url = 'http://62a1-35-239-212-66.ngrok-free.app/';

// const res2 = await axios.get(url)
// console.log("--------------------------------")
// console.log(JSON.stringify(res2))
// console.log("--------------------------------")

// // Define custom headers
// const headers = {
//   'ngrok-skip-browser-warning': 'true', // Set the value as needed
// };

// // Send the HTTP request with custom headers
// axios.get(url, { headers })
//   .then(response => {
//     // Handle the response data
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Handle errors
//     console.error('There was a problem with the request:', error);
//   });


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
    initialNodes[i].position.x = Math.cos(currAngle) * radius;
    initialNodes[i].position.y = Math.sin(currAngle) * radius;
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

export default function OldMindMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(createdNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(createdEdges);


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (event, node) => {
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