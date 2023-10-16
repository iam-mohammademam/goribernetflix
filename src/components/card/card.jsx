import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { imgUrl } from "../../hooks/api";
import noPoster from "../../assets/no_poster.jpg";
import Img from "../lazyLoadImg/img";

import "./style.css";

const Card = ({ data, mediaType }) => {
  const {
    id,
    media_type,
    original_name,
    original_title,
    first_air_date,
    release_date,
    poster_path,
  } = data;

  return (
    <>
      <Link
        to={`/${mediaType ? mediaType : media_type}/${id}`}
        className="w-full h-full overflow-hidden"
      >
        <div className="movie_poster relative w-2/2 overflow-hidden rounded-md">
          <Img
            src={poster_path ? imgUrl.url + poster_path : noPoster}
            alt=""
            className="w-2/2 rounded-md"
          />
          <div className="overlay absolute top-0 left-0 flex items-center justify-center w-100 h-100">
            <div className="flex items-center justify-center h-12 border-2 w-12 rounded-full">
              <i className="uil uil-play text-3xl"></i>
            </div>
          </div>
        </div>

        <small className="text-gray-400 text-sm bg-transparent">
          {dayjs(first_air_date).format("D MMM, YYYY") ||
            dayjs(release_date).format("D MMM, YYYY")}
        </small>

        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis w-2/2">
          {original_title || original_name}
        </h1>
      </Link>
    </>
  );
};
export default Card;
