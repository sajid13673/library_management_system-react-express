import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Link,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { API_CONFIG } from "../../config/api";
import { Link as RouterLink } from "react-router-dom";

function MembersTable({
  members,
  handleEditMember,
  handleDeleteMember,
  handleBorrowings,
  handleStatusChange,
  toggleLoading,
}) {
  const baseUrl = API_CONFIG.baseUrl;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflowX: "auto",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Table sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow
            sx={[
              {
                bgcolor: "#80e6ff",
                "& th": {
                  fontWeight: 600,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                },
              },
              (theme) =>
                theme.applyStyles("dark", {
                  background: "#014e62",
                }),
            ]}
          >
            <TableCell>ID</TableCell>
            <TableCell>Member</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {members.length > 0 ? (
            members.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                {/* ID */}
                <TableCell>{row.id}</TableCell>

                {/* Member */}
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    minWidth={160}
                  >
                    <Avatar
                      src={baseUrl + row?.image?.url || undefined}
                      alt={row.name}
                      sx={{ width: 40, height: 40 }}
                    >
                      {row.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Link
                      component={RouterLink}
                      to={`/member-details/${row.id}`} // 👈 Adjust path matching your route config
                      variant="body2"
                      fontWeight={600}
                      underline="hover"
                      sx={{
                        whiteSpace: "nowrap",
                        color: "text.primary", // Keeps typography matching row styles
                        cursor: "pointer",
                        "&:hover": { color: "primary.main" }, // Smooth visual feedback on hover
                      }}
                    >
                      {row.name}
                    </Link>
                  </Box>
                </TableCell>

                {/* Email */}
                <TableCell>{row.user?.email || "-"}</TableCell>

                {/* Phone */}
                <TableCell>{row.phoneNumber || "-"}</TableCell>

                {/* Address */}
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{ maxWidth: 200, minWidth: 120 }}
                  >
                    {row.address || "-"}
                  </Typography>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Switch
                      disabled={toggleLoading}
                      checked={Boolean(row.status)}
                      onChange={(event) => handleStatusChange(row.id)}
                      color="success"
                      size="small"
                      inputProps={{
                        "aria-label": `Toggle status for ${row.name}`,
                      }}
                    />

                    <Chip
                      label={row.status ? "Active" : "Inactive"}
                      size="small"
                      color={row.status ? "success" : "default"}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={0.5}
                  >
                    <Tooltip title="Edit member">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditMember(row.id)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="View borrowings">
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleBorrowings(row.id)}
                      >
                        <MenuBookOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title={
                        !row.activeBorrowings
                          ? "Delete"
                          : "Has active borrowings"
                      }
                      placement="top-start"
                    >
                      <IconButton
                        disabled={row.activeBorrowings}
                        size="small"
                        color="error"
                        onClick={() => handleDeleteMember(row.id)}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                <Typography color="text.secondary">
                  No members found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MembersTable;
