import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Download from './pages/Download.jsx';
import Navbar from './components/Navbar.jsx';
import AboutMe from './pages/AboutMe.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='aboutMe' element={<AboutMe />} />
        <Route path="/download">
          <Route path="singleAcc" element={<Download />} />
          <Route path="playlistAcc" element={<Download />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
