import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import UserForm from "./pages/UserForm";
import History from "./pages/History";
// import PageNotFound from "./pages/PageNotFound";
import ViewResume from "./pages/viewResume";
import Edit from "./components/Edit";


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/resume/:id/view" element={<ViewResume />} />
        <Route path="/resume/:id/edit" element={<Edit />} />
        {/* <Route path="/*" element={<PageNotFound />} /> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;