import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";


const Navbar = () => {
  return (
    
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-18 h-18 object-contain' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600 underline underline-offset-2 underline-black" : "text-black" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Projects
        </NavLink>
        <NavLink to='/testimonials' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Testimonials
        </NavLink>
        <NavLink to='/timeline' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Timeline
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;