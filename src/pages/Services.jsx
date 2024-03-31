import { useState, useEffect } from "react";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae");
        const data = await response.json();
        setServices(data.user.services.filter((service) => service.enabled));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="max-container">
      <h1 className="head-text text-3xl md:text-4xl font-bold mb-8">Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service._id} className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <img
                src={service.image.url}
                alt={service.name}
                className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-700 mb-4">{service.desc}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-bold">{service.charge}</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  
  
};

export default Services;
