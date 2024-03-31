import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        // Filter timeline data based on the "enabled" field
        const filteredTimelineData = data.user.timeline.filter(item => item.enabled);
        setTimelineData(filteredTimelineData);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchTimelineData();
  }, []);

  const renderTimelineElements = (forEducation) => {
    return timelineData.map((item) => {
      if (item.forEducation === forEducation) {
        return (
          <VerticalTimelineElement
            key={item._id}
            date={`${item.startDate} - ${item.endDate}`}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                {item.icon && item.icon.url && (
                  <img
                    src={item.icon.url}
                    alt={item.company_name}
                    className="w-[60%] h-[60%] object-contain"
                  />
                )}
              </div>
            }
          >
            <h3 className="vertical-timeline-element-title">{item.jobTitle}</h3>
            <h4 className="vertical-timeline-element-subtitle">{item.company_name}</h4>
            <p>{item.summary}</p>
          </VerticalTimelineElement>
        );
      }
      return null;
    });
  };

  return (
    <section className="max-container">
      <h1 className="head-text">Timeline</h1>
  
      <div className="timeline-section">
        <h2 className="timeline-subtitle text-lg text-center font-semibold py-2 bg-gray-200 rounded-md">Education</h2>
        <VerticalTimeline>
          {renderTimelineElements(true)}
        </VerticalTimeline>
      </div>
  
      <div className="timeline-section mt-8">
        <h2 className="timeline-subtitle text-lg text-center font-semibold py-2 bg-gray-200 rounded-md">Experience</h2>
        <VerticalTimeline>
          {renderTimelineElements(false)}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
