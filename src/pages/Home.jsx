import Header from '../components/Header';
import './Home.css';

import resumeImage from '../assets/resume.png';

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <h1 className="lobster-two-regular">
            Designed to get hired.
          </h1>

          <p>
            Your skills, your story, your next job — all in one.
          </p>

          <button
            className="resume-button"
            onClick={() => {
              window.location.href = '/resume-builder';
            }}
          >
            MAKE YOUR RESUME
          </button>

        </div>

      </section>


      {/* Tools Section */}
      <section className="tools-section" >

        <h2 className="tools-heading lobster-two-regular">
          Tools
        </h2>

        <div className="tools-container">

          {/* Left Side */}
          <div className="tools-list">

            <div className="tool-item">
              <h3>Resume</h3>
              <p>
                Create unlimited new resumes and easily edit them afterwards.
              </p>
            </div>

            <div className="tool-item">
              <h3>Cover Letters</h3>
              <p>
                Easy professional cover letters.
              </p>
            </div>

            <div className="tool-item">
              <h3>Jobs</h3>
              <p>
                Automatically receive new and relevant job postings.
              </p>
            </div>

            <div className="tool-item">
              <h3>Applications</h3>
              <p>
                Effortlessly manage and track your job applications in an organized manner.
              </p>
            </div>

          </div>


          {/* Right Side */}
          <div className="tools-image-container">

            <img
              src={resumeImage}
              alt="Resume Preview"
              className="tools-resume-image"
            />

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;