"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters long")
    .required("This field is required"),
});

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAuth(values.email, values.password);
    },
  });

  const handleAuth = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth", { email, password, isLogin });

      toast.success(
        isLogin ? "Logged in successfully!" : "Account created successfully!"
      );
      router.push("/main");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
    setIsLoading(false);
  };

  return (
    <Card variant="outlined" sx={{ mt: 12.5, mb: 12.5, padding: 2 }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography
                variant="h1"
                component="h1"
                sx={{ fontSize: { xs: "3.5rem" }, marginBottom: 2 }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Typography>
              <Divider />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              size="large"
              loading={isLoading}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
