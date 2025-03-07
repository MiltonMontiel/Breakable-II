
import { Box, Typography } from "@mui/material";
import {use} from "react";

export default function Artist({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const artistId= use(params);

return(
    <Box mx={24} my={4}>
        <Typography variant="h1">
            Graph playground
        </Typography>
        Testing: {artistId.id}
    </Box>
)
}