import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GenericPage from './pages/GenericPage';
import OurStory from './pages/OurStory';
import SpaGallery from './pages/SpaGallery';
import Policies from './pages/Policies';
import MassagesAndReflexology from './pages/MassagesAndReflexology';
import LeNailSalon from './pages/LeNailSalon';
import WellnessSuites from './pages/WellnessSuites';
import MembershipsAndGatherings from './pages/MembershipsAndGatherings';
import RamyeonNoodleBar from './pages/RamyeonNoodleBar';
import CoffeeTeaRefreshments from './pages/CoffeeTeaRefreshments';
import HeartyMeals from './pages/HeartyMeals';
import LightBitesSweets from './pages/LightBitesSweets';
import Preloader from './components/Preloader';

export default function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          
          {/* About Us */}
          <Route path="about/story" element={<OurStory />} />
          <Route path="about/gallery" element={<SpaGallery />} />
          <Route path="about/policies" element={<Policies />} />
          
          {/* Our Offerings */}
          <Route path="offerings/massages" element={<MassagesAndReflexology />} />
          <Route path="offerings/nail-salon" element={<LeNailSalon />} />
          <Route path="offerings/wellness-suites" element={<WellnessSuites />} />
          <Route path="offerings/memberships" element={<MembershipsAndGatherings />} />
          
          {/* Sabasu */}
          <Route path="sabasu/ramyeon" element={<RamyeonNoodleBar />} />
          <Route path="sabasu/coffee-tea" element={<CoffeeTeaRefreshments />} />
          <Route path="sabasu/hearty-meals" element={<HeartyMeals />} />
          <Route path="sabasu/light-bites" element={<LightBitesSweets />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
