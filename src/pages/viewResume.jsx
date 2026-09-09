import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { IoIosDownload } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Preview from "../components/Preview";
import Edit from "../components/Edit";

import {
  getSingleResumeAPI,
  addDownloadHistory,
  getDownloadedResumeAPI,
  updateResumeAPI,
} from "../services/allApi";

function ViewResume() {
  const { id } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const resumeRef = useRef(null);

  useEffect(() => {
    getResumeDetails();
  }, [id]);

  const getResumeDetails = async () => {
    try {
      console.log("Resume ID:", id);

      if (!id) {
        console.log("No resume ID found");
        return;
      }

      const response = await getSingleResumeAPI(id);

      console.log("Resume response:", response);

      if (response?.data) {
        setResumeData(response.data);
      }
    } catch (error) {
      console.log("Error getting resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (updatedData) => {
    try {
      const response = await updateResumeAPI(id, updatedData);

      setResumeData(response.data);

      return true;
    } catch (error) {
      console.log("Error updating resume:", error);
      return false;
    }
  };

  const downloadResume = async () => {
    if (!resumeRef.current) {
      return;
    }

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          return;
        }

        const formData = new FormData();

        formData.append("file", blob);
        formData.append("upload_preset", "Resume_preset");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/agzuvspf/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!data.secure_url) {
          console.log("Cloudinary upload failed");
          console.log(data);
          return;
        }

        const imageUrl = data.secure_url;

        console.log("Cloudinary URL:", imageUrl);

        generatePdf(imageUrl);
      }, "image/png");
    } catch (error) {
      console.log("Error downloading resume:", error);
    }
  };

  const generatePdf = async (imageUrl) => {
    try {
      const today = new Date();

      const timeStamp = `${today.toLocaleDateString()}, ${today.toLocaleTimeString()}`;

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imageUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      const historyResponse = await getDownloadedResumeAPI();

      const alreadyDownloaded = historyResponse.data.some(
        (download) => download.resumeId === id
      );

      if (!alreadyDownloaded) {
        const downloadDetails = {
          timeStamp,
          resumeId: id,
          jobRole: resumeData.job,
          imageUrl: imageUrl,
        };

        const response = await addDownloadHistory(downloadDetails);

        console.log("Download history:", response);
      } else {
        console.log("Resume already exists in download history");
      }

      pdf.save(`${resumeData.fullName || "resume"}.pdf`);
    } catch (error) {
      console.log("Error generating PDF:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading resume...
      </Box>
    );
  }

  if (!resumeData) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Resume not found
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 150px)",
        backgroundColor: "#f7f7f7",
        py: {
          xs: 3,
          sm: 4,
          md: 5,
        },
        px: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <Stack
            direction="row"
            spacing={{
              xs: 1,
              sm: 2,
            }}
            justifyContent="center"
            alignItems="center"
          >
            {/* Download */}
            <Tooltip title="Download Resume">
              <IconButton
                onClick={downloadResume}
                sx={{
                  width: {
                    xs: 55,
                    sm: 65,
                  },
                  height: {
                    xs: 55,
                    sm: 65,
                  },
                  color: "error.main",
                  "& svg": {
                    fontSize: {
                      xs: "2.2rem",
                      sm: "2.6rem",
                    },
                  },
                }}
              >
                <IoIosDownload />
              </IconButton>
            </Tooltip>

            {/* Edit */}
            <Tooltip title="Edit Resume">
              <Edit
                resumeData={resumeData}
                setResumeData={setResumeData}
                onUpdate={updateResume}
              />
            </Tooltip>

            {/* History */}
            <Tooltip title="Resume History">
              <IconButton
                component={Link}
                to="/history"
                sx={{
                  width: {
                    xs: 55,
                    sm: 65,
                  },
                  height: {
                    xs: 55,
                    sm: 65,
                  },
                  color: "success.main",
                  "& svg": {
                    fontSize: {
                      xs: "2rem",
                      sm: "2.4rem",
                    },
                  },
                }}
              >
                <FaHistory />
              </IconButton>
            </Tooltip>

            {/* Back */}
            <Tooltip title="Back to Resume Builder">
              <IconButton
                component={Link}
                to="/user-form"
                sx={{
                  width: {
                    xs: 55,
                    sm: 65,
                  },
                  height: {
                    xs: 55,
                    sm: 65,
                  },
                  color: "primary.main",
                  "& svg": {
                    fontSize: {
                      xs: "2.2rem",
                      sm: "2.6rem",
                    },
                  },
                }}
              >
                <TbPlayerTrackPrevFilled />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Resume Preview */}
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <Box ref={resumeRef}>
            <Preview resumeData={resumeData} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default ViewResume;