import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Loader from "./pages/loader/loader";
import Header from "./components/Header";
import Landing from "./pages/landing/Landing";
import Portfolio from "./pages/portfolio/Portfolio";
import ProjectDetails from "./pages/portfolio/[project]/ProjectDetails";
import Resume from "./pages/resume/Resume";
import Contact from "./pages/contact/Contact";
import PageNotFound from "./pages/404/PageNotFound";

/**
 * Instructions for Customizing the Portfolio
 * ------------------------------------------
 * 1. Adding Your Own Projects:
 *    - Navigate to the "_data" folder and modify the "projects.json" file to include your projects.
 *
 * 2. Replacing Project Images:
 *    - Access the "public/projectImages" directory to replace the my project images with your own.
 *
 * 3. Handling Form Submissions:
 *    - To receive form submissions, obtain an API Key. Refer to the Form component for detailed instructions.
 *
 * For Assistance or Questions:
 * -----------------------------
 * If you require assistance or have questions, don't hesitate to reach out via LinkedIn or email.
 *
 * Support and Star:
 * ------------------
 * Enjoying this project? Please consider giving it a star (🌟).
 * I'm committed to ongoing updates and feature additions.
 * Your suggestions and feedback are invaluable and highly encouraged!
 */

function App() {
  // Personal details for the user
  const personalDetails = {
    name: "Mohammad Aakash",
    location: "London, UK",
    tagline: "Full Stack Developer | Mobile App Developer",
    email: "muhammadaakash249@gmail.com",
    brand:
      "My unique blend of full-stack and mobile development experience, combined with a strong foundation in data science, enables me to build scalable, intuitive, and data-driven digital solutions—always keeping performance, usability, and the end-user experience at the core of every project.",
  };

  const location = useLocation();

  // State to manage loader visibility
  const [showLoader, setShowLoader] = useState(true);

  const [originalTitle, setOriginalTitle] = useState();

  useEffect(() => {
    // Hide loader when initial route is loaded
    if (location.pathname !== "/") {
      setShowLoader(false);
    }

    // Store the original document title
    if (!originalTitle) {
      setOriginalTitle(document.title);
    }

    // Handle document title change when tab visibility changes
    const handleTabChange = () => {
      if (document.hidden) {
        document.title = "👋🏻 Git pulling you back in!";
      } else {
        document.title = originalTitle;
      }
    };

    // Listen for visibility change events
    window.addEventListener("visibilitychange", handleTabChange);
    return () =>
      window.removeEventListener("visibilitychange", handleTabChange);
  }, [location, originalTitle]);

  return (
    <>
      {showLoader ? (
        // Show loader until initial route is loaded
        <Loader setShowLoader={setShowLoader} />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Define routes */}
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Landing
                  name={personalDetails.name}
                  tagline={personalDetails.tagline}
                />
              }
            />
            <Route path="/projects" element={<Portfolio />} />
            <Route
              path="/resume"
              element={<Resume brand={personalDetails.brand} />}
            />

            <Route
              path="/contact"
              element={
                <Contact
                  name={personalDetails.name}
                  location={personalDetails.location}
                  email={personalDetails.email}
                />
              }
            />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route
              path="/projects/:projectTitle"
              element={<ProjectDetails />}
            />
            {/* Fallback route for unknown paths */}
            <Route path="*" element={<Navigate to="/page-not-found" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
