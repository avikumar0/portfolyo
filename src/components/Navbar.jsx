import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { logo } from '../assets/images';


const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="logo" className="w-18 h-18 object-contain" />
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium md:hidden">
        <button
          aria-expanded={open}
          aria-label="Open menu"
          className="block p-2 text-2xl text-slate-800"
          onClick={() => setOpen(true)}
        >
          <MdMenu />
        </button>
      </nav>
      <nav className="hidden md:flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline underline-offset-2 underline-black'
              : 'text-black'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline underline-offset-2 underline-black'
              : 'text-black'
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline underline-offset-2 underline-black'
              : 'text-black'
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/timeline"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline underline-offset-2 underline-black'
              : 'text-black'
          }
        >
          Timeline
        </NavLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline underline-offset-2 underline-black'
              : 'text-black'
          }
        >
          Testimonials
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline underline-offset-2 underline-black'
              : 'text-black'
          }
        >
          Contact Me
        </NavLink>
      </nav>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      >
        <button
          aria-label="Close menu"
          aria-expanded={open}
          className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden"
          onClick={() => setOpen(false)}
        >
          <MdClose />
        </button>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/timeline">Timeline</NavLink>
        <NavLink to="/testimonials">Testimonials</NavLink>
        <NavLink to="/contact">Contact Me</NavLink>
      </div>
    </header>
  );
};

export default Navbar;
