import React, { useState } from "react";
import Box from "@mui/material/Box";
import Steps from "../components/Steps";
import Preview from "../components/Preview";

function UserForm() {
  const [resumeData, setResumeData] = useState({
    fullName: "",
    job: "",
    location: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    degree: "",
    university: "",
    passout: "",
    skills: [],
    summary: "",
  });

  const hasData = Object.values(resumeData).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== "";
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 140px)",
        boxSizing: "border-box",
        overflow: "hidden",
        mt: {
          xs: 8,
          md: 9,
        },
        mb: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "50% 50%",
          },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            px: {
              xs: 3,
              sm: 5,
              md: 7,
              lg: 7,
              xl: 8,
            },
            py: 2,
          }}
        >
          <Steps
            setResumeData={setResumeData}
            resumeData={resumeData}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            px: {
              xs: 3,
              sm: 5,
              md: 6,
              lg: 5,
              xl: 6,
            },
            py: 2,
            display: {
              xs: hasData ? "block" : "none",
              lg: "block",
            },
          }}
        >
          {hasData && (
            <Preview
              resumeData={resumeData}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UserForm;