import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { MdDelete } from "react-icons/md";

import {
  getDownloadedResumeAPI,
  deleteDownloadHistoryAPI,
} from "../services/allApi";

function History() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    getDownloadedResume();
  }, []);

  const getDownloadedResume = async () => {
    try {
      const response = await getDownloadedResumeAPI();

      console.log("History data:", response.data);

      setDownloads(response.data);
    } catch (error) {
      console.log("History error:", error);
    }
  };

  const deleteHistory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this download history?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDownloadHistoryAPI(id);

      setDownloads((previousDownloads) =>
        previousDownloads.filter((download) => download.id !== id)
      );
    } catch (error) {
      console.log("Delete history error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 5,
        }}
      >
        Download History
      </Typography>

      <Box
        sx={{
          width: "100%",
          px: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          boxSizing: "border-box",
        }}
      >
        <Grid container spacing={3}>
          {downloads.map((download) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
              key={download.id}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {download.jobRole}
                  </Typography>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => deleteHistory(download.id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  Downloaded at: {download.timeStamp}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                  }}
                >
                  Resume ID: {download.resumeId}
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {download.imageUrl ? (
                    <img
                      src={download.imageUrl}
                      alt="Downloaded Resume"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        p: 4,
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Resume image unavailable
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {downloads.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: 5,
            }}
          >
            No downloaded resumes yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default History;