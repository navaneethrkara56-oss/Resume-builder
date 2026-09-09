import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';

import './ResumeBuilder.css';

function ResumeBuilder() {
  return (
    <div className="resume-builder-page">

      <main className="resume-builder-content">

        <h1 className="resume-builder-heading lobster-two-regular">
          Resume Builder
        </h1>

        <div className="resume-steps">

          {/* Step 1 */}

          <div className="resume-step-card">

            <div className="step-icon">
              <DescriptionIcon />
            </div>

            <div className="step-content">

              <span className="step-number">
                Step 1
              </span>

              <h2 className="lobster-two-regular">
                Build Your Resume
              </h2>

              <p>
                Create your professional resume by adding your
                personal information, education, skills and experience.
              </p>

            </div>

          </div>


          {/* Step 2 */}

          <div className="resume-step-card">

            <div className="step-icon">
              <DownloadIcon />
            </div>

            <div className="step-content">

              <span className="step-number">
                Step 2
              </span>

              <h2 className="lobster-two-regular">
                Download Your Resume
              </h2>

              <p>
                Download your completed resume and use it to
                apply for your next opportunity.
              </p>

            </div>

          </div>

        </div>


        {/* Get Started Button */}

        <div className="get-started-container">

          <button
            className="get-started-button"
            onClick={() => {
              window.location.href = '/user-form';
            }}
          >
            Get Started
          </button>

        </div>

      </main>


    </div>
  );
}

export default ResumeBuilder;