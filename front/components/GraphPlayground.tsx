import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import { Box, Typography } from "@mui/material";
import "@xyflow/react/dist/style.css";
import { FC, useCallback, useState } from "react";
import ArtistCard from "./Card";
import { Artist } from "@/types/Artist";
import Dagre from "@dagrejs/dagre";

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
  const x = Math.random() * 1500;
  const y = Math.random() * 1000;
  return {
    id: artist.id,
    type: "artistNode",
    position: { x: x, y: y },
    data: {
      artist: artist,
    },
  };
};

const artistsToNodes = (artists: Artist[]): ArtistNodeType[] => {
  return artists.map((artist, idx) => artistToNode(artist));
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

const getLayoutedElements = (nodes: any, edges: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR" });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);

      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const GraphPlayground: FC<{ artists: Artist[] }> = ({ artists }) => {
  const initialNodes = artistsToNodes(artists);
  const initialEdges = artistsToEdges(artists);

  const [graphNodes, setGraphNodes] = useState(initialNodes);
  const [graphEdges, setGraphEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) =>
      setGraphNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setGraphNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) =>
      setGraphEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setGraphEdges]
  );

  const onConnect = useCallback(
    (connection: any) =>
      setGraphEdges((eds: any) => addEdge(connection, eds) as any),
    [setGraphEdges]
  );

  return (
    <Box mx={24} my={4} sx={{ height: "80vh" }}>
      <Typography variant="h1" my={4}>
        Your graph playground
      </Typography>
      <ReactFlow
        nodes={graphNodes}
        edges={graphEdges}
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
