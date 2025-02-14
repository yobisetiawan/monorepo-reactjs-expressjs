import { Box, Button, Grid2, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box maxWidth={400} margin="auto" padding={2}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: "3.5rem" },
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        Welcome
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6} >
          <Link href="/login" passHref>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Link>
        </Grid2>
        <Grid2 size={6}>
          <Link href="/register" passHref>
            <Button variant="contained" fullWidth>
              Register
            </Button>
          </Link>
        </Grid2>
        <Grid2 size={12}>
          <Link href="/main" passHref>
            <Button variant="contained" fullWidth>
              Main
            </Button>
          </Link>
        </Grid2>
      </Grid2>
    </Box>
  );
}
