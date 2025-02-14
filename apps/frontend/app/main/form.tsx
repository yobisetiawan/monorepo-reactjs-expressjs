import BaseApi from "@/lib/axios";
import { RootState } from "@/store/store";
import {
  Button,
  Divider,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
export const validationSchema = Yup.object({
  name: Yup.string().required("This field is required"),
});

export const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Form = ({
  dt,
  onSuccess,
}: {
  dt: { id: string; name: string };
  onSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      name: dt.name,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await BaseApi.post(
          "/app/api/update-user-data",
          { ...dt, name: values.name },
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        onSuccess();
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.message);
      }

      setIsLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h5">Edit Data</Typography>
          <Divider />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="large"
          loading={isLoading}
        >
          Save
        </Button>
      </Grid>
    </form>
  );
};
