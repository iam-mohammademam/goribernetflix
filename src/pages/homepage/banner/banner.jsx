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
      <div
        className={
          loading
            ? "h-500 w-screen overflow-hidden bg-color static flex items-center justify-center"
            : "relative w-screen banner "
        }
      >
        <Img
          src={loading ? "" : background}
          alt=""
          className="object-cover object-center"
        />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ dynamicBullets: true, clickable: true }}
          className={
            loading
              ? "w-100"
              : "w-100 px-10 z-10 absolute top-2/4 -translate-y-2/4 left-0 py-10"
          }
        >
          {loading ? (
            <SwiperSlide className="w-2/2">
              <div className="md:w-4/5 lg:4/5 w-2/2 md:px-0 lg:px-0 px-5 py-10 mx-auto grid grid-cols-2 ">
                <div className="banner_details w-2/2">
                  <small>
                    <Skeleton width={70} />
                  </small>
                  <h1>
                    <Skeleton count={1.5} />
                  </h1>
                  <small>
                    <Skeleton count={3.5} />
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
                    <Skeleton height={230} />
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
                  <SwiperSlide key={id} className="w-2/2">
                    <Link
                      to={`/${"movie"}/${id}`}
                      className="md:w-4/5 lg:4/5 w-2/2 mx-auto grid grid-cols-2"
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
