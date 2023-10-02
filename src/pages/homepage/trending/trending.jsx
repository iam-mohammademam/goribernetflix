import { useState, useMemo, memo } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchDataFromApi } from "../../../hooks/api";
import useFetch from "../../../hooks/useFetch";
import MovieCard from "../../../components/card/card";
import SliderSkeleton from "../../../components/skeleton/sliderSkeleton";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";

const Trending = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [data, setData] = useState();

  const { loading } = useFetch(`/movie/list`);

  const handleCategory = (event, catg) => {
    setMediaType(catg);
    const categories = document.querySelectorAll(
      ".trending_categories .category"
    );
    categories.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.classList.add("active");
  };

  useMemo(() => {
    fetchDataFromApi(`/trending/${mediaType}/day`).then((res) => {
      setData(res?.data);
    });
  }, [mediaType]);

  return (
    <>
      <div className="w-screen pt-6">
        <div className="px-10 my-5">
          <h1 className="font-semibold raleway text-lg">
            {loading ? <Skeleton width={100} /> : "Trending"}
          </h1>
          <div className="trending_categories flex items-center gap-3">
            <small
              onClick={(event) => handleCategory(event, "movie")}
              className="cursor-pointer category active"
            >
              {loading ? <Skeleton width={100} /> : "#movies"}
            </small>
            <small
              onClick={(event) => handleCategory(event, "tv")}
              className="cursor-pointer category"
            >
              {loading ? <Skeleton width={100} /> : "#tv_series"}
            </small>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          // slidesPerView={5}
          breakpoints={{
            100: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            340: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            640: {
              spaceBetween: 10,
              slidesPerView: 4,
            },

            770: {
              spaceBetween: 10,
              slidesPerView: 5,
            },
            1000: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
            1200: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
          }}
          navigation={true}
          pagination={false}
          className="w-100 px-10"
        >
          {loading ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
          breakpoints={{
            100: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            340: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            640: {
              spaceBetween: 10,
              slidesPerView: 4,
            },

            770: {
              spaceBetween: 10,
              slidesPerView: 5,
            },
            1000: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
            1200: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
          }}
            >
              <SwiperSlide className="w-2/2">
                <SliderSkeleton />
              </SwiperSlide>
              <SwiperSlide className="w-2/2">
                <SliderSkeleton />
              </SwiperSlide>
              <SwiperSlide className="w-2/2">
                <SliderSkeleton />
              </SwiperSlide>
              <SwiperSlide className="w-2/2">
                <SliderSkeleton />
              </SwiperSlide>
              <SwiperSlide className="w-2/2">
                <SliderSkeleton />
              </SwiperSlide>
            </Swiper>
          ) : (
            data?.results?.map((data) => {
              return (
                <SwiperSlide key={data.id} className="overflow-hidden">
                  <MovieCard
                    data={data}
                    mediaType={mediaType === "tv" ? "tv" : "movie"}
                  />
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </>
  );
};
export default memo(Trending);
