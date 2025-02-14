import React from "react";
import { Container, Box } from "@mui/material";
import AuthForm from "@/components/AuthForm";

const LoginForm: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Box>
        <AuthForm isLogin={false} />
      </Box>
    </Container>
  );
};

export default LoginForm;
