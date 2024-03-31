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
        setTimelineData(data.user.timeline);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchTimelineData();
  }, []);

  const renderTimelineElements = (forEducation) => {
    return timelineData.map((item) => {
      if (item.forEducation === forEducation && item.icon && item.icon.url) {
        return (
          <VerticalTimelineElement
            key={item._id}
            date={`${item.startDate} - ${item.endDate}`}
            icon={<img src={item.icon.url} alt={item.company_name} />}
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
        <h2 className="timeline-subtitle">Education</h2>
        <VerticalTimeline>{renderTimelineElements(true)}</VerticalTimeline>
      </div>

      <div className="timeline-section">
        <h2 className="timeline-subtitle">Experience</h2>
        <VerticalTimeline>{renderTimelineElements(false)}</VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
