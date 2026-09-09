import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import jobTypes from "../assets/jobRole.json";
import jobSkills from "../assets/jobSkills.json";
import summaries from "../assets/summaries.json";

import { addResumeAPI } from "../services/allApi";

const steps = [
  "Basic Information",
  "Contact Details",
  "Education Details",
  "Generate Skills & Summary",
];

function Steps({ setResumeData, resumeData }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isGenerated, setIsGenerated] = React.useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 3) {
      setResumeData({
        ...resumeData,
        skills: [],
        summary: "",
      });

      setIsGenerated(false);
      setActiveStep(2);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const generateAi = () => {
    if (!resumeData.job) {
      alert("Please select a job title first");
      return;
    }

    setResumeData({
      ...resumeData,
      skills: jobSkills[resumeData.job] || [],
      summary: summaries[resumeData.job] || "",
    });

    setIsGenerated(true);
  };

  const addResume = async () => {
    const {
      fullName,
      job,
      location,
      email,
      phone,
      linkedin,
      github,
      degree,
      university,
      passout,
      skills,
      summary,
    } = resumeData;

    if (
      fullName &&
      job &&
      location &&
      email &&
      phone &&
      linkedin &&
      github &&
      degree &&
      university &&
      passout &&
      skills &&
      skills.length > 0 &&
      summary
    ) {
      try {
        const response = await addResumeAPI(resumeData);

        console.log(response);

        if (response?.data?.id) {
          navigate(`/resume/${response.data.id}/view`);
        }
      } catch (error) {
        console.log(error);
        alert("Unable to save resume");
      }
    } else {
      alert("Please complete all fields and generate skills & summary");
    }
  };

  const renderStepArrayContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 4,
              }}
            >
              Personal Details
            </Typography>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.fullName}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    fullName: e.target.value,
                  })
                }
                label="Full Name"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl
                variant="standard"
                fullWidth
              >
                <InputLabel>Choose Job Title</InputLabel>

                <Select
                  value={resumeData.job}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      job: e.target.value,
                    })
                  }
                >
                  {jobTypes.jobRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.location}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    location: e.target.value,
                  })
                }
                label="Location"
                variant="standard"
                fullWidth
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 4,
              }}
            >
              Contact Details
            </Typography>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.email}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    email: e.target.value,
                  })
                }
                label="Email"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.phone}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    phone: e.target.value,
                  })
                }
                label="Phone"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.github}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    github: e.target.value,
                  })
                }
                label="GitHub Link"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.linkedin}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    linkedin: e.target.value,
                  })
                }
                label="LinkedIn Link"
                variant="standard"
                fullWidth
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 4,
              }}
            >
              Education Details
            </Typography>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.degree}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    degree: e.target.value,
                  })
                }
                label="Bachelor's Degree"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.university}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    university: e.target.value,
                  })
                }
                label="College/University"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                value={resumeData.passout}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    passout: e.target.value,
                  })
                }
                label="Passout Year"
                variant="standard"
                fullWidth
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              Generate Skills & Summary
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Our AI will generate skills and a professional summary
              according to your selected job role. Click the button below
              to generate them automatically.
            </Typography>

            {isGenerated && (
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "success.main",
                  mb: 2,
                }}
              >
                Resume is finished!
              </Typography>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
          width: "100%",
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography
        sx={{
          mb: 2,
          color: "text.secondary",
        }}
      >
        Step {activeStep + 1}
      </Typography>

      <Box sx={{ width: "100%" }}>
        {renderStepArrayContent(activeStep)}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
          pt: 3,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            fontSize: "1rem",
          }}
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={isGenerated ? addResume : generateAi}
            sx={{
              px: 3,
              fontSize: "1rem",
            }}
          >
            {isGenerated
              ? "Finish"
              : "Generate Skill & Summary"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              px: 3,
              fontSize: "1rem",
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Steps;