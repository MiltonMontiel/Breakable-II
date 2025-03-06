import Link from "next/link";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import ArrowOutward from "@mui/icons-material/ArrowOutward";

export default function Login() {
  return (
    <Container maxWidth={"sm"} sx={{ alignContent: "center", height: "100vh" }}>
      <Typography variant="h2">You are not logged in.</Typography>
        <Link href={"http://localhost:8080/login"}>
        <Button
          endIcon={<ArrowOutward />}
          size="large"
          variant="contained"
          sx={{ background: "#1ED760", color: "#000000", marginTop: "4rem" }}
        >
          <Typography variant="h5">Authenticate</Typography>
        </Button>
        </Link>
    </Container>
  );
}
