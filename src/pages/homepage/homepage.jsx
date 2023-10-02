import Trending from "./trending/trending";
import Banner from "./banner/banner";
import Movies from "./movies/movies";
import Series from "./series/series";

const Homepage = () => {
  return (
    <>
      <Banner />
      <Trending />
      <Movies />
      <Series />
    </>
  );
};
export default Homepage;
