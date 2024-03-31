import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import CTA from "../components/CTA";
import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        // Filter skills, timeline, and other sections based on the "enabled" field
        const filteredUserData = {
          ...data.user,
          skills: data.user.skills.filter(skill => skill.enabled),
          timeline: data.user.timeline.filter(experience => experience.enabled),
        };
        setUserData(filteredUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner border-4 border-t-4 border-gray-200 rounded-full h-12 w-12"></div>
      </div>
    );
  }
  

  const { about, timeline, skills } = userData;

  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          {about.name}
        </span>{" "}
        👋
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>{about.description}</p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {/* Render skills dynamically */}
          {skills.map((skill) => (
            <div className="block-container w-20 h-20" key={skill.name}>
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                {skill.image && skill.image.url && (
                  <img
                    src={skill.image.url}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>{about.title}</p>
        </div>

        <div className="mt-12 flex">
          <VerticalTimeline>
            {/* Render timeline dynamically */}
            {timeline.map((experience) => (
              <VerticalTimelineElement
                key={experience._id}
                date={`${experience.startDate} - ${experience.endDate}`}
                iconStyle={{ background: "#6f6f6f" }}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    {experience.icon && experience.icon.url && (
                      <img
                        src={experience.icon.url}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    )}
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: "#6f6f6f",
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {experience.jobTitle}
                  </h3>
                  <p
                    className="text-black-500 font-medium text-base"
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className="my-5 list-disc ml-5 space-y-2">
                  {/* Render bullet points dynamically */}
                  {experience.bulletPoints.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className="text-black-500/50 font-normal pl-1 text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default About;
