import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  NodeToolbar,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { Box, Typography } from "@mui/material";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { Hanalei } from "next/font/google";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const GraphPlayground = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Box mx={24} my={4}  sx={{ height: "80vh" }}>
      <Typography variant="h1" my={4}>Your graph playground</Typography>
      <ReactFlow nodes={initialNodes} edges={initialEdges} >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </Box>
  );
};

const CustomNode = ({data}: any) => {
    return (
        <>
       <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button>Test</button>
        </NodeToolbar> 
        <div style={{padding: "10px 20px"}}>
            {data.label}
        </div>
        <Handle type="target" position={Position.Left}/>
        <Handle type="source" position={Position.Right}/>
        </>
    )
}

export default GraphPlayground;
