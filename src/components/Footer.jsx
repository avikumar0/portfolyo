import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        setSocialLinks(data.user.social_handles);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />

      <div className="footer-container">
        <p>
          © {new Date().getFullYear()}{" "}
          <strong>John Doe</strong>. All rights reserved.
        </p>

        <div className="flex gap-3 justify-center items-center">
          {socialLinks.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={link.image.url}
                alt={link.platform}
                className="w-6 h-6 object-contain hover:scale-125 hover:shadow-md hover:shadow-slate-600  hover:transition-transform duration-300 ease-in-out"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
