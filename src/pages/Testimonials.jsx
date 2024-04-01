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
        const filteredTestimonials = data.user.testimonials.filter(testimonial => testimonial.enabled);
        setTestimonials(filteredTestimonials);
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
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <section className="max-container">
      <h1 className="head-text text-3xl font-bold text-center my-8">Testimonials</h1>
  
      <div className="testimonials-slider w-full">
        <Slider {...settings} className="w-full">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="w-full flex items-center justify-center">
              <div className="testimonial-item p-8 mx-auto max-w-md bg-white rounded-lg shadow-lg">
                {testimonial.image && (
                  <img
                    src={testimonial.image.url}
                    alt={testimonial.name}
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                  />
                )}
                <p className="testimonial-review text-center mb-2">{testimonial.review}</p>
                <p className="testimonial-name text-center text-lg font-semibold">{testimonial.name}</p>
                <p className="testimonial-position text-center text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
