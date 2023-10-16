import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useFetch from "../../../hooks/useFetch";
import { imgUrl } from "../../../hooks/api";
import noPoster from "../../../assets/no_poster.jpg";
import Img from "../../../components/lazyLoadImg/img";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

const Banner = () => {
  const [background, setBackground] = useState();
  const { data, loading } = useFetch("/movie/popular");

  useEffect(() => {
    const bg =
      imgUrl.url +
      data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <>
      <div className="min-[700px]:h-[450px] max-[669px]:h-[250px] w-screen relative flex items-center justify-center banner">
        <div className="overflow-hidden h-full">
          <Img
            src={loading ? "" : background}
            alt=""
            className="bg-cover bg-center h-full"
          />
        </div>

        <div className="absolute top-0 w-full h-[100%] left-0 bg-black/[0.7]"></div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="max-w-[90%] max-h-[90%] overflow-hidden flex items-center justify-center z-10 absolute top-[50%] -translate-y-[50%] left-[50%] translate-x-[-50%]"
        >
          {loading ? (
            <SwiperSlide className="w-full my-auto flex items-center justify-center">
              <div className="md:w-4/5 lg:4/5 w-2/2 mx-auto grid grid-cols-2 place-items-center justify-items-center ">
                <div className="banner_details w-2/2">
                  <small>
                    <Skeleton width={70} />
                  </small>
                  <h1>
                    <Skeleton count={1.5} />
                  </h1>
                  <small>
                    <Skeleton count={3.5} width={230} />
                  </small>
                  <div className="md:block lg:block hidden">
                    <br />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Skeleton height={45} width={45} circle={true} />
                      <Skeleton width={70} />
                    </div>
                  </div>
                </div>
                <div className="banner_img w-2/2">
                  <div className="md:w-2/4 lg:w-2/4 rounded-md w-3/4 lg:mt-16 ml-auto">
                    <Skeleton height={230} width={160} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ) : (
            data?.results?.map(
              ({
                id,
                overview,
                poster_path,
                original_title,
                release_date,
                vote_average,
              }) => {
                return (
                  <SwiperSlide
                    key={id}
                    className="w-full my-auto flex items-center justify-center"
                  >
                    <Link
                      to={`/${"movie"}/${id}`}
                      className="md:w-4/5 lg:4/5 w-2/2 mx-auto grid grid-cols-2 place-items-center justify-items-center"
                    >
                      <div className="banner_details w-2/2">
                        <small className="flex text-gray-300 items-center">
                          <i className="uil uil-star text-gray-300 text-lg pr-1"></i>
                          {vote_average}/10
                        </small>
                        <h1 className="md:text-xl text-white md:text-2xl text-md font-medium tracking-wider">
                          <span className="raleway font-semibold text-white">
                            {original_title}
                          </span>
                          ({release_date?.split("-")[0]})
                        </h1>
                        <small className="banner_overview text-white md:block lg:block hidden">
                          {overview}
                        </small>

                        <div className="flex play_button text-white items-center my-3 gap-2 text-sm">
                          <i className="uil uil-play text-lg border-2 text-white h-8 w-8 rounded-full flex items-center justify-center"></i>
                          Details
                        </div>
                      </div>
                      <div className="banner_img w-2/2">
                        <Img
                          alt=""
                          src={
                            poster_path ? imgUrl.url + poster_path : noPoster
                          }
                          className="md:w-2/4 lg:w-2/4 rounded-md w-3/4 lg:mt-16 ml-auto"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              }
            )
          )}
        </Swiper>
      </div>
    </>
  );
};
export default Banner;
