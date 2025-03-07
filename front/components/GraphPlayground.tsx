import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Handle,
  MiniMap,
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
      <div
        style={{
          width: `${data.artist.popularity * 2 + 200}px`,
          height: "150px",
        }}
      >
        <ArtistCard artist={data.artist} size="sm" />
      </div>
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
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
  g.setGraph({ rankdir: "RL", ranker: "tight-tree", align: "UL" });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) =>
    g.setNode(node.id, {
      ...node,
      width: 400,
      height: 250,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);

      const x = position.x - 150 / 2;
      const y = position.y - 150 / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const GraphPlayground: FC<{ artists: Artist[] }> = ({ artists }) => {
  const initialNodes = artistsToNodes(artists);
  const initialEdges = artistsToEdges(artists);
  const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);

  const { fitView } = useReactFlow();
  const [graphNodes, setGraphNodes] = useState(nodes);
  const [graphEdges, setGraphEdges] = useState(edges);

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
        <MiniMap zoomable pannable/>
      </ReactFlow>
    </Box>
  );
};

export default GraphPlayground;
