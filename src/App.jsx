import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { About, Contact, Home, Projects,Services,Testimonials,Timeline } from "./pages";

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/testimonials' element={<Testimonials />} />
                  <Route path='/timeline' element={<Timeline />} />
                  <Route path='/services' element={<Services />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;