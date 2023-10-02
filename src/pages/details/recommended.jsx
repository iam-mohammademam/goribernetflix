import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";

import useFetch from "../../hooks/useFetch";
import MovieCard from "../../components/card/card";
import SliderSkeleton from "../../components/skeleton/sliderSkeleton";

const Recommended = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  return (
    <>
      <div className="w-screen mt-5">
        <h1 className="font-semibold raleway px-10 text-lg mb-5">
          {loading ? (
            <Skeleton width={100} />
          ) : data?.results?.length > 0 ? (
            "Recommended"
          ) : (
            ""
          )}
        </h1>
        <Swiper
          modules={[Navigation]}
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
                    mediaType={mediaType}
                    loading={loading}
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
export default Recommended;
