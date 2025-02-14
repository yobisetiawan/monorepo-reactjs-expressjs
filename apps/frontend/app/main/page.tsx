"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios, { AxiosError } from "axios";
import { setUsers, setUsersLoading } from "@/store/usersSlice";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import { Form, style } from "./form";
import BaseApi from "@/lib/axios";
import { setUser } from "@/store/userSlice";

const LoginForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const firstLoad = useRef(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pageSize, setPageSize] = useState(5);
  const [lastVisible, setLastVisible] = useState<number | null>(null);

  const [selectedRow, setSelectedRow] = useState<{
    id: string;
    name: string;
    docId: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
  } | null>(null);

  const loadData = useCallback(
    async () => {
      dispatch(setUsersLoading({ isLoading: true }));
      try {
        let accessToken = user.accessToken;
        if (!user.accessToken || user.accessToken === "") {
          const profile = await axios.get("/api/profile");
          accessToken = profile.data.user.accessToken;
          dispatch(setUser({ accessToken: accessToken }));
        }

        const dt = await BaseApi.get(
          `/app/api/fetch-user-data?pageSize=${pageSize}&lastVisible=${lastVisible}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        dispatch(setUsers({ data: dt.data }));
      } catch (error) {
        dispatch(setUser({ accessToken: "" }));
        const axiosError = error as AxiosError;
        toast.error(axiosError.message);
        router.push("/login");
      }
      dispatch(setUsersLoading({ isLoading: false }));
    },
    [dispatch, router, user.accessToken]
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "edit",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setSelectedRow(params?.row);
            handleOpen();
          }}
        >
          <Edit />
        </Button>
      ),
    },
  ];

  const createDummyData = async () => {
    dispatch(setUsersLoading({ isLoading: true }));
    try {
      await BaseApi.post(
        "/app/api/create-user-data",
        {},
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
    loadData();
    dispatch(setUsersLoading({ isLoading: false }));
  };

  const onUpdateSuccess = () => {
    handleClose();
    loadData();
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      loadData();
    }
  }, [loadData]);

  const paginationModel = { page: 1, pageSize: 10 };

  return (
    <Container maxWidth="lg" sx={{ padding: 6 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Main Page
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={createDummyData}
          loading={users.isLoading}
        >
          Create Dummy Data
        </Button>
      </Box>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users.data}
          loading={users.isLoading}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedRow ? (
            <Form dt={selectedRow} onSuccess={onUpdateSuccess} />
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default LoginForm;
