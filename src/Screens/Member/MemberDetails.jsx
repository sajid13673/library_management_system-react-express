import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import noImagePic from "../../images/no_image.jpg";
import useApi from "../../Hooks/useApi";
import Loading from "../../Components/Loading";

// Define schema types matching your database entities

export default function MemberDetailsPage() {
  const { id } = useParams();
  const { fetchData } = useApi([]);
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        fetchData({
          method: "GET",
          endPoint: `/members/${id}`,
        })
          .then((res) => {
            if (res.data.status) {
              setMember(res.data.data);
              console.log("member", res.data.data);
            }
          })
          .catch((err) => console.error(err));
      } catch (err) {
        setError(err.message || "Failed to load member profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMemberDetails();
  }, [id]);

  if (loading) {
    return <Loading message="Fetching profile details..." minHeight="80vh" />;
  }

  if (error || !member) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back to List
        </Button>
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            border: "1px solid",
            borderColor: "error.light",
          }}
        >
          <Typography color="error.main">
            {error || "Member profile not found."}
          </Typography>
        </Card>
      </Container>
    );
  }

  const getStatusColor = (status) => {
    if (status === "active") return "success";
    if (status === "deactivated") return "error";
    return "warning";
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Back to Members
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{ borderRadius: 3, textAlign: "center", p: 4, height: "100%" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Avatar
                alt={member.name}
                src={member.image || noImagePic}
                fallback={PersonIcon}
                sx={{
                  width: 150,
                  height: 150,
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.12)",
                  border: "4px solid",
                  borderColor: "background.paper",
                }}
              />
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="700"
                  sx={{ textTransform: "capitalize", mb: 0.5 }}
                >
                  {member.name}
                </Typography>
                <Chip
                  label={member.status}
                  color={getStatusColor(member.status)}
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                    px: 0.5,
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ borderRadius: 3, p: 4, height: "100%" }}>
            <Typography
              variant="h6"
              fontWeight="700"
              color="text.primary"
              sx={{ mb: 2 }}
            >
              Account Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {/* Identity ID Row */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <BadgeIcon color="primary" />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Member ID
                  </Typography>
                  <Typography variant="body1" fontWeight="600">
                    {member.id}
                  </Typography>
                </Box>
              </Grid>

              {/* Email Address Row */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <EmailIcon color="primary" />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Email Address
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="500"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {member.email}
                  </Typography>
                </Box>
              </Grid>

              {/* Phone Line Row */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <PhoneIcon color="primary" />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Phone Number
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {member.phoneNumber || "N/A"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="flex-start" gap={2}>
                <HomeIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Home Address
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.primary", lineHeight: 1.4 }}
                  >
                    {member.address || "No address listed."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
