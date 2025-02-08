import React, { useEffect, useState } from "react";
import useApi from "../Hooks/useApi";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Loading from "../Components/Loading";
import FineCard from "../Components/FineCard";
function FineList() {
  const {
    fetchData: fetchAllFInes,
    error: errorAllFines,
    data: allFines,
    loading: loadingAllFines,
  } = useApi();
  const {
    fetchData: fetchFineById,
    error: errorFineById,
    data: fineById,
    loading: loadingFineById,
  } = useApi();
  const {
    fetchData: makePayment,
    error: errorPayment,
    data: paymentRes,
    loading: loadingPayment,
  } = useApi();
  const [fines, setFines] = React.useState([]);
  const [fine, setFine] = React.useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 9;
  const [page, setPage] = useState(1);
  const [processPaymentDialog, setProcessPaymentDialog] = useState(false);
  const [confirmPaymentDialog, setConfirmPaymentDialog] = useState(false);
  const [type, setType] = React.useState("cash");
  const getFines = async () => {
    await fetchAllFInes({
      method: "GET",
      url: `/fines?page=${page}&perPage=${perPage}`,
    });
  };
  function handleChange(e, value) {
    setPage(value);
  }
  const openProcessPayment = async (id) => {
    setProcessPaymentDialog(true);
    console.log(id);
    await fetchFineById({
      method: "GET",
      url: `/fines/${id}`,
    });
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handlePayment = async () => {
    await makePayment({
      method: "POST",
      url: `/payments`,
      data: { fineId: fine.id, amount: fine.amount, type: type },
    });
  };
  useEffect(() => {
    getFines();
  }, [page]);
  useEffect(() => {
    if (allFines) {
      console.log(allFines);
      setFines(allFines.data);
      setTotalPages(allFines.totalPages);
    }
    if (errorAllFines) {
      console.error(errorAllFines);
    }
  }, [errorAllFines, allFines]);
  useEffect(() => {
    if (fineById) {
      console.log(fineById);
      setFine(fineById.data);
    }
    if (errorFineById) {
      console.error(errorFineById);
    }
  }, [fineById, errorFineById]);
  useEffect(() => {
    if (fineById) {
      console.log(fineById);
      setFine(fineById.data);
    }
    if (errorFineById) {
      console.error(errorFineById);
    }
  }, [fineById, errorFineById]);
  useEffect(() => {
    if (paymentRes) {
      console.log(paymentRes);
      getFines();
      setProcessPaymentDialog(false);
    }
    if (errorPayment) {
      console.error(errorPayment);
    }
  }, [paymentRes, errorPayment]);

  const dialogTitleStyle = [
    (theme) => ({
      textTransform: "uppercase",
      fontWeight: 600,
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    }),
    (theme) =>
      theme.applyStyles("dark", {
        backgroundColor: "rgb(64, 131, 199)",
      }),
  ];

  const memberBoxStyle = [
    (theme) => ({
      backgroundColor: "#e3f2fd",
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
      color: theme.palette.primary.main,
    }),
    (theme) =>
      theme.applyStyles("dark", {
        backgroundColor: "rgb(97, 97, 97)",
        color: "white",
      }),
  ];

  const amountBoxStyle = [
    (theme) => ({
      backgroundColor: theme.palette.info.light,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
    }),
    (theme) =>
      theme.applyStyles("dark", {
        backgroundColor: "rgb(117, 117, 117)",
        color: "white",
      }),
  ];

  const borrowingBoxStyle = [
    (theme) => ({
      backgroundColor: "#e3f2fd",
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
    }),
    (theme) =>
      theme.applyStyles("dark", {
        backgroundColor: "rgb(97, 97, 97)",
        color: "white",
      }),
  ];

  const bookBoxStyle = [
    (theme) => ({
      backgroundColor: theme.palette.info.light,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
    }),
    (theme) =>
      theme.applyStyles("dark", {
        backgroundColor: "rgb(117, 117, 117)",
        color: "white",
      }),
  ];

  return (
    <Box display="flex" flexDirection="column" p={3} flex={1} gap={2}>
      (
      <Dialog
        open={processPaymentDialog}
        onClose={() => setProcessPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={dialogTitleStyle}>Process Fine Payment</DialogTitle>
        <DialogContent dividers>
          {fine && (
            <>
              <Box sx={memberBoxStyle}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Member: {fine.member?.name} (ID: {fine.member?.id})
                </Typography>
              </Box>

              <Box sx={amountBoxStyle}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Amount: ${fine.amount}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Days Overdue: {fine.days} days
                </Typography>
              </Box>

              <Box sx={borrowingBoxStyle}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Borrowing Details
                </Typography>
                <Typography variant="body1">
                  Borrowed On: {fine.borrowing?.createdAt}
                </Typography>
                <Typography variant="body1">
                  Due Date: {fine.borrowing?.dueDate}
                </Typography>
                <Typography variant="body1">
                  Return Date: {fine.borrowing?.returnDate}
                </Typography>
              </Box>

              <Box sx={bookBoxStyle}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Book Details
                </Typography>
                <Typography variant="body1">
                  Title: {fine.borrowing?.book?.title}
                </Typography>
                <Typography variant="body1">
                  Author: {fine.borrowing?.book?.author}
                </Typography>
              </Box>

              <Select
                labelId="payment-type-label"
                id="payment-type"
                value={type}
                onChange={handleTypeChange}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Credit Card</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setProcessPaymentDialog(false)}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setConfirmPaymentDialog(true)}
            color="primary"
            variant="contained"
          >
            Make Payment
          </Button>
        </DialogActions>
        <Dialog open={confirmPaymentDialog} maxWidth="xs" fullWidth>
          <DialogTitle>Confirm Payment</DialogTitle>
          {!loadingPayment ? <>
          <DialogContent>
            <Typography>Are you sure you want to make this payment?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmPaymentDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={() => handlePayment()} color="primary" variant="contained">Confirm</Button>
          </DialogActions></> : 
          <DialogContent sx={{ padding: 5 }}>
          <Typography>payment Processing</Typography>
          <LinearProgress sx={{ my: 2 }}/>        
        </DialogContent>
        }
        </Dialog> 
      </Dialog>
      <Grid container spacing={2}>
        {fines?.length > 0 ? (
          fines.map((fine) => (
            <FineCard
              amount={fine.amount}
              days={fine.days}
              memberName={fine.member?.name}
              isPaid={fine.isPaid}
              borrowingStatus={fine.borrowing?.status}
              openProcessPayment={() => openProcessPayment(fine.id)}
            />
          ))
        ) : (
          <Box>
            {!loadingAllFines ? (
              <Typography variant="h3">Nothing to show</Typography>
            ) : (
              <Loading />
            )}
          </Box>
        )}
      </Grid>
      {!loadingAllFines && fines?.length > 0 && (
        <Stack spacing={2} sx={{ mt: "auto" }}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      )}
    </Box>
  );
}

export default FineList;
