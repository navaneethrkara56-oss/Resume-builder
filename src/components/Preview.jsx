import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

function Preview({ resumeData }) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
        borderRadius: "4px",
        padding: { xs: "25px", sm: "35px", md: "45px" },
        boxSizing: "border-box",
        minHeight: "650px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          mb: 5,
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "42px",
            fontWeight: "700",
          }}
        >
          {resumeData.fullName || "Your Name"}
        </h1>

        <h2
          style={{
            margin: "0 0 18px",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          {resumeData.job || "Job Title"}
        </h2>

        {/* Location, Email and Phone */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "18px",
            marginBottom: "12px",
          }}
        >
          {resumeData.location && <span>{resumeData.location}</span>}

          {resumeData.location && resumeData.email && <span>•</span>}

          {resumeData.email && (
            <span>
              {resumeData.email}
            </span>
          )}

          {resumeData.email && resumeData.phone && <span>•</span>}

          {resumeData.phone && <span>{resumeData.phone}</span>}
        </div>

        {/* GitHub and LinkedIn */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "28px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {resumeData.github && (
            <a
              href={
                resumeData.github.startsWith("http")
                  ? resumeData.github
                  : `https://${resumeData.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#000",
                textDecoration: "underline",
              }}
            >
              GitHub
            </a>
          )}

          {resumeData.linkedin && (
            <a
              href={
                resumeData.linkedin.startsWith("http")
                  ? resumeData.linkedin
                  : `https://${resumeData.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#000",
                textDecoration: "underline",
              }}
            >
              LinkedIn
            </a>
          )}
        </div>
      </Box>

      {/* Professional Summary */}
      <Box sx={{ mb: 4 }}>
        <h2
          style={{
            fontSize: "22px",
            letterSpacing: "1.5px",
            margin: "0 0 10px",
            borderBottom: "1px solid #333",
            paddingBottom: "8px",
          }}
        >
          PROFESSIONAL SUMMARY
        </h2>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.6",
            margin: "12px 0 0",
          }}
        >
          {resumeData.summary ||
            "Your professional summary will appear here."}
        </p>
      </Box>

      {/* Education */}
      <Box sx={{ mb: 4 }}>
        <h2
          style={{
            fontSize: "22px",
            letterSpacing: "1.5px",
            margin: "0 0 12px",
            borderBottom: "1px solid #333",
            paddingBottom: "8px",
          }}
        >
          EDUCATION
        </h2>

        <div>
          <h3
            style={{
              fontSize: "19px",
              margin: "0 0 5px",
            }}
          >
            {resumeData.degree || "Degree"}
          </h3>

          <p
            style={{
              fontSize: "17px",
              margin: "0",
            }}
          >
            {resumeData.university || "University"}
          </p>

          {resumeData.passout && (
            <p
              style={{
                fontSize: "16px",
                margin: "5px 0 0",
              }}
            >
              {resumeData.passout}
            </p>
          )}
        </div>
      </Box>

      {/* Skills */}
      <Box>
        <h2
          style={{
            fontSize: "22px",
            letterSpacing: "1.5px",
            margin: "0 0 15px",
            borderBottom: "1px solid #333",
            paddingBottom: "8px",
          }}
        >
          SKILLS
        </h2>

        {resumeData.skills && resumeData.skills.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {resumeData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                  height: "38px",
                  borderRadius: "6px",
                  px: 1,
                  "& .MuiChip-label": {
                    padding: "0 14px",
                  },
                }}
              />
            ))}
          </Box>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: "16px",
            }}
          >
            Skills will appear here after generation.
          </p>
        )}
      </Box>
    </Box>
  );
}

export default Preview;