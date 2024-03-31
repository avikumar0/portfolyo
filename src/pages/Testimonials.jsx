import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        setTestimonials(data.user.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <section className="max-container">
      <h1 className="head-text">
        Testimonials
      </h1>

      <div className="testimonials-slider">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id}>
              <div className="testimonial-item">
                <img
                  src={testimonial.image.url}
                  alt={testimonial.name}
                  className="testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="testimonial-review">{testimonial.review}</p>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-position">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
