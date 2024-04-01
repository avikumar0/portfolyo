import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA";
import { arrow } from "../assets/icons";

const Projects = () => {
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        // Filter projects data based on the "enabled" field
        const filteredProjectsData = data.user.projects.filter(
          (project) => project.enabled
        );
        setProjectsData(filteredProjectsData);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    fetchData();
  }, []);

  if (!projectsData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner border-4 border-t-4 border-gray-200 rounded-full h-12 w-12"></div>
      </div>
    );
  }

  return (
    <section className="max-container">
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text drop-shadow font-semibold">
          Projects
        </span>
      </h1>

      <p className="text-slate-500 mt-2 leading-relaxed">
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. Many of them are open-source, so if
        you come across something that piques your interest, feel free to
        explore the codebase and contribute your ideas for further enhancements.
        Your collaboration is highly valued!
      </p>

      <div className="flex flex-wrap my-20 gap-16">
        {projectsData.map((project) => (
          <div className="lg:w-[400px] w-full" key={project._id}>
            <div className="block-container w-12 h-12">
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className="btn-front rounded-xl flex justify-center items-center">
                {project.image && project.image.url && (
                  <img
                    src={project.image.url}
                    alt={project.title}
                    className="w-1/2 h-1/2 object-contain"
                  />
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col">
              <h4 className="text-2xl font-poppins font-semibold">
                {project.title}
              </h4>
              <p className="mt-2 text-slate-500">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-2 font-poppins">
                {/* Display tech stacks */}
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 font-poppins">
                <Link
                  to={project.liveurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600"
                >
                  Live Link
                </Link>
                <img
                  src={arrow}
                  alt="arrow"
                  className="w-4 h-4 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default Projects;
