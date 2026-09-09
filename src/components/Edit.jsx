import React from "react";
import { RiFileEditFill } from "react-icons/ri";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import jobTypes from "../assets/jobRole.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "92%",
    sm: "85%",
    md: 700,
  },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: {
    xs: 2,
    sm: 3,
    md: 4,
  },
};

function Edit({ resumeData, setResumeData }) {
  const [open, setOpen] = React.useState(false);
  const [skillInput, setSkillInput] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSkillInput("");
  };

  const addSkill = () => {
    const newSkill = skillInput.trim();

    if (!newSkill) {
      return;
    }

    const currentSkills = resumeData?.skills || [];
    let alreadyExists = false;

    currentSkills.map((skill) => {
      if (skill.toLowerCase() === newSkill.toLowerCase()) {
        alreadyExists = true;
      }
    });

    if (alreadyExists) {
      alert("Skill already added");
      return;
    }

    setResumeData({
      ...resumeData,
      skills: [...currentSkills, newSkill],
    });

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = (resumeData?.skills || []).filter(
      (skill) => skill !== skillToRemove
    );

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const updateField = (field, value) => {
    setResumeData({
      ...resumeData,
      [field]: value,
    });
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="btn"
        style={{
          color: "#1976d2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
        }}
      >
        <RiFileEditFill size={28} />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-resume-title"
      >
        <Box sx={style}>
          <Typography
            id="edit-resume-title"
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              textAlign: "center",
            }}
          >
            Edit Resume
          </Typography>

          {/* Personal Details */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Personal Details
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                value={resumeData?.fullName || ""}
                onChange={(e) =>
                  updateField("fullName", e.target.value)
                }
                label="Full Name"
                variant="standard"
              />

              <FormControl fullWidth variant="standard">
                <InputLabel>Choose Job Title</InputLabel>

                <Select
                  value={resumeData?.job || ""}
                  onChange={(e) =>
                    updateField("job", e.target.value)
                  }
                >
                  {jobTypes.jobRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                value={resumeData?.location || ""}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
                label="Location"
                variant="standard"
              />
            </Stack>
          </Box>

          {/* Contact Details */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Contact Details
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                value={resumeData?.email || ""}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                label="Email"
                variant="standard"
              />

              <TextField
                fullWidth
                value={resumeData?.phone || ""}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                label="Phone"
                variant="standard"
              />

              <TextField
                fullWidth
                value={resumeData?.github || ""}
                onChange={(e) =>
                  updateField("github", e.target.value)
                }
                label="GitHub Link"
                variant="standard"
              />

              <TextField
                fullWidth
                value={resumeData?.linkedin || ""}
                onChange={(e) =>
                  updateField("linkedin", e.target.value)
                }
                label="LinkedIn Link"
                variant="standard"
              />
            </Stack>
          </Box>

          {/* Education Details */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Education Details
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                value={resumeData?.degree || ""}
                onChange={(e) =>
                  updateField("degree", e.target.value)
                }
                label="Bachelor's Degree"
                variant="standard"
              />

              <TextField
                fullWidth
                value={resumeData?.university || ""}
                onChange={(e) =>
                  updateField("university", e.target.value)
                }
                label="College/University"
                variant="standard"
              />

              <TextField
                fullWidth
                value={resumeData?.passout || ""}
                onChange={(e) =>
                  updateField("passout", e.target.value)
                }
                label="Passout Year"
                variant="standard"
              />
            </Stack>
          </Box>

          {/* Skills */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Skills
            </Typography>

            {/* Add Skill */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 1.5,
                alignItems: "flex-end",
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                label="Add Skill"
                variant="outlined"
                size="small"
              />

              <Button
                variant="contained"
                onClick={addSkill}
                sx={{
                  minWidth: "80px",
                  height: "40px",
                  flexShrink: 0,
                }}
              >
                ADD
              </Button>
            </Box>

            {/* Current Skills */}
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1.5,
                color: "text.secondary",
              }}
            >
              Current Skills
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                width: "100%",
              }}
            >
              {(resumeData?.skills || []).map((skill, index) => (
                <Box
                  key={`${skill}-${index}`}
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    borderRadius: "6px",
                    px: 2,
                    py: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "1rem",
                    fontWeight: 500,
                    maxWidth: "100%",
                  }}
                >
                  <span>{skill}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontSize: "20px",
                      fontWeight: "bold",
                      lineHeight: 1,
                      padding: "0 2px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </Box>
              ))}
            </Box>

            {(resumeData?.skills || []).length === 0 && (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.9rem",
                }}
              >
                No skills added.
              </Typography>
            )}
          </Box>

          {/* Professional Summary */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Professional Summary
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={5}
              value={resumeData?.summary || ""}
              onChange={(e) =>
                updateField("summary", e.target.value)
              }
              label="Professional Summary"
              placeholder="Write a short summary of yourself"
              variant="outlined"
            />
          </Box>

          {/* Update */}
          <Box
            sx={{
              borderTop: "1px solid #e0e0e0",
              pt: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                px: 4,
                py: 1.2,
              }}
            >
              UPDATE
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Edit;