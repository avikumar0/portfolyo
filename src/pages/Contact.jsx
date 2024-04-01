import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [personalDetails, setPersonalDetails] = useState(null);

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        setPersonalDetails(data.user.about);
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };

    fetchPersonalDetails();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Avinash Kumar",
          from_email: form.email,
          to_email: "avikr287@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="max-container">
      {alert.show && <Alert {...alert} />}

      <div className="relative flex lg:flex-row flex-col">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">Contact Information</h1>

          <div className="my-4">
            <p className="text-gray-700 mb-1">Name: {personalDetails?.name}</p>
            <p className="text-gray-700 mb-1">Title: {personalDetails?.title}</p>
            <p className="text-gray-700 mb-1">Address: {personalDetails?.address}</p>
            <p className="text-gray-700 mb-1">Email: {personalDetails?.contactEmail}</p>
            <p className="text-gray-700 mb-1">Phone Number: {personalDetails?.phoneNumber}</p>
          </div>

          <h2 className="text-2xl font-semibold mt-6">Get in Touch</h2>


          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-7 mt-6"
          >
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="John"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="John@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Your Message
              <textarea
                name="message"
                rows="4"
                className="textarea"
                placeholder="Write your thoughts here..."
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />

            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.15, 0]}
                rotation={[12.629, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>

  );
};

export default Contact;
