import { HashRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Homepage from "./pages/homepage/homepage";
import Details from "./pages/details/details";
import Discover from "./pages/discover/discover";
import Search from "./pages/search/search";

const App = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/discover/:mediaType" element={<Discover />} />
        </Routes>
        <Footer />
      </HashRouter>
    </SkeletonTheme>
  );
};
export default App;
