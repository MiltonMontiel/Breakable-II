import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
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
import { FC, useCallback, useState } from "react";
import ArtistCard from "./Card";
import { Artist } from "@/types/Artist";

type ArtistNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    artist: Artist;
  };
};

type ArtistEdgeType = {
  id: string;
  source: string;
  target: string;
};

const ArtistNode = ({ data }: any) => {
  return (
    <>
      <div style={{ width: "200px", height: "150px" }}>
        <ArtistCard artist={data.artist} size="sm" />
        <Handle type="target" position={Position.Bottom} />
        <Handle type="source" position={Position.Top} />
      </div>
    </>
  );
};

const artistToNode = (artist: Artist): ArtistNodeType => {
  return {
    id: artist.id,
    type: "artistNode",
    position: { x: 0, y: 0 },
    data: {
      artist: artist,
    },
  };
};

const artistsToNodes = (artists: Artist[]): ArtistNodeType[] => {
  return artists.map((artist) => artistToNode(artist));
};

const getGenreMap = (artists: Artist[]): Map<string, string[]> => {
  const genreMap: Map<string, string[]> = new Map();

  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (genreMap.get(genre) == undefined) {
        genreMap.set(genre, [artist.id]);
      } else {
        genreMap.get(genre)?.push(artist.id);
      }
    });
  });

  return genreMap;
};

const artistsToEdges = (artists: Artist[]): ArtistEdgeType[] => {
  const genreMap = getGenreMap(artists);
  const edges: ArtistEdgeType[] = [];
  const added = new Set();

  genreMap.forEach((artistsId, _genre) => {
    if (artistsId.length > 1) {
      while (artistsId.length > 0) {
        const sourceId = artistsId.pop() as string;

        artistsId.forEach((target) => {
          // To avoid duplicate edges
          const id = `e${sourceId}-${target}`;
          if (!added.has(id)) {
            edges.push({
              id: id,
              source: sourceId,
              target: target,
            });
            added.add(id);
          }
        });
      }
    }
  });

  return edges;
};

const nodeTypes = { artistNode: ArtistNode };

const GraphPlayground: FC<{ artists: Artist[] }> = ({ artists }) => {
  const initialNodes = artistsToNodes(artists);
  const initialEdges = artistsToEdges(artists);

  console.log(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds) as any),
    [setEdges]
  );

  return (
    <Box mx={24} my={4} sx={{ height: "80vh" }}>
      <Typography variant="h1" my={4}>
        Your graph playground
      </Typography>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </Box>
  );
};

export default GraphPlayground;
