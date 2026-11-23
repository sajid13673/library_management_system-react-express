import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useApi from "../Hooks/useApi";
import Loading from "../Components/Loading";

export default function CategoriesPage() {
  const {
    fetchData: createCategory,
    data: createData,
    loading: createLoading,
    error: createError,
  } = useApi([]);
  const {
    fetchData: fetchCategories,
    data: categoriesData,
    loading: categoryLoading,
    error: categoryError,
  } = useApi([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [inputError, setInputError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const totalPages = categoriesData?.totalPages || 1;
  const [page, setPage] = useState(1);
  const perPage = 3;

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const getCategories = async () => {
    await fetchCategories({
      method: "GET",
      endPoint: `/categories?page=${page}&perPage=${perPage}`,
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    createCategory({
      method: "POST",
      endPoint: `/categories`,
      data: { name: newCategoryName },
    });

    setNewCategoryName("");
    setInputError("");
    getCategories();
  };

  const handleDeleteCategory = (id) => {};

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleSaveRename = (id) => {};

  useEffect(() => {
    getCategories();
  }, [page]);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Manage Categories
      </Typography>

      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Box
            component="form"
            onSubmit={handleAddCategory}
            noValidate
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "flex-start" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size="small"
              label="Category Name"
              placeholder="e.g., Biography, Mystery..."
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                if (inputError) setInputError("");
              }}
              error={Boolean(inputError)}
              helperText={inputError}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                height: 40,
                flexShrink: 0,
              }}
            >
              Add Category
            </Button>
          </Box>
        </CardContent>
      </Card>

      {categoriesData?.data?.length > 0 && !categoryLoading ? (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "action.hover" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, width: "15%" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category Name</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, width: "25%" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {categoriesData.data?.length > 0 ? (
                  categoriesData.data.map((category) => {
                    const isEditing = editingId === category.id;

                    return (
                      <TableRow
                        key={category.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            #{category.id}
                          </Typography>
                        </TableCell>

                        {/* Name Column (Toggles between text and inline input) */}
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              size="small"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleSaveRename(category.id);
                                if (e.key === "Escape") cancelEditing();
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 1.5,
                                },
                              }}
                            />
                          ) : (
                            <Typography variant="body2" fontWeight={500}>
                              {category.name}
                            </Typography>
                          )}
                        </TableCell>

                        {/* Actions Column */}
                        <TableCell align="right">
                          {isEditing ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <Tooltip title="Save">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSaveRename(category.id)}
                                >
                                  <CheckIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={cancelEditing}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          ) : (
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <Tooltip title="Rename">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => startEditing(category)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    handleDeleteCategory(category.id)
                                  }
                                >
                                  <DeleteForeverIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                      <Typography variant="body2" color="text.secondary">
                        No categories found. Add one above to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} sx={{ mt: "auto" }}>
            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </>
      ) : (
        <>
          {!categoryLoading && !categoryError ? (
            <Typography variant="h3">Nothing to show</Typography>
          ) : categoryError ? (
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color={"error"}
                fontSize={25}
                fontWeight={"bold"}
                sx={{ textAlign: "center" }}
                mb={2}
              >
                Something went wrong
              </Typography>
              <Button onClick={getCategories} variant="outlined">
                Try Again
              </Button>
            </Card>
          ) : (
            <Loading />
          )}
        </>
      )}
    </Container>
  );
}
