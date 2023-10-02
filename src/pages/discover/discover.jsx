import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchDataFromApi } from "../../hooks/api";
import MovieCard from "../../components/card/card";
import SliderSkeleton from "../../components/skeleton/sliderSkeleton";

const Discover = () => {
  const { mediaType } = useParams();

  const [genres, setGenres] = useState();
  const [genreLoading, setGenreLoading] = useState(false);
  const [allGenres, setAllGenres] = useState();
  const [genreId, setGenreId] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const getMovieData = () => {
    setLoading(true);
    fetchDataFromApi(
      `/discover/${mediaType}?include_adult=false&page=${pageNum}&sort_by=popularity.desc${
        genreId ? `&with_genres=${genreId}` : ""
      }`
    ).then((res) => {
      setLoading(false);
      setData(res?.data);
      setPageNum((prev) => prev + 1);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/discover/${mediaType}?include_adult=false&page=${pageNum}&sort_by=popularity.desc${
        genreId ? `&with_genres=${genreId}` : ""
      }`
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res?.data?.results],
        });
        setLoading(false);
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  const handleGenre = (event, genreId) => {
    setGenreId(genreId);
    allGenres.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.classList.add("active");
  };

  useEffect(() => {
    setGenreLoading(true);
    setTimeout(() => {
      fetchDataFromApi(`/genre/${mediaType}/list`).then((res) => {
        setGenreLoading(false);
        setGenres(res?.data?.genres);
        setGenreId("");
      });
    }, 200);
    setTimeout(() => {
      const categories = document.querySelectorAll(".genres .category");
      setAllGenres(categories);
    }, 300);
  }, [mediaType]);

  useEffect(() => {
    getMovieData();
  }, [mediaType, genreId]);

  return (
    <>
      <div className="w-screen py-6 px-10">
        <div>
          {mediaType === "tv" ? (
            <h1 className="font-semibold raleway flex items-center gap-2 text-lg">
              TV Series
            </h1>
          ) : (
            <h1 className="font-semibold raleway flex items-center gap-2 text-lg">
              Movies
            </h1>
          )}
          {genreLoading ? (
            <div className="mt-2 mb-5 flex flex-wrap items-center gap-3">
              <Skeleton width={70} />
              <Skeleton width={50} />
              <Skeleton width={60} />
              <Skeleton width={40} />
              <Skeleton width={90} />
              <Skeleton width={50} />
              <Skeleton width={100} />
              <Skeleton width={40} />
              <Skeleton width={70} />
              <Skeleton width={50} />
              <Skeleton width={60} />
              <Skeleton width={90} />
              <Skeleton width={50} />
              <Skeleton width={100} />
            </div>
          ) : (
            <div className="genres mt-2 mb-5 flex flex-wrap items-center gap-3">
              <small
                onClick={(event) => handleGenre(event, "")}
                className="cursor-pointer category active"
              >
                #all
              </small>
              {genres?.map(({ id, name }) => {
                return (
                  <small
                    key={id}
                    onClick={(event) => handleGenre(event, id)}
                    className="cursor-pointer category"
                  >
                    #
                    {name === "TV Movie"
                      ? "tv_movie"
                      : name === "Science Fiction"
                      ? "sci_fi"
                      : name === "Action & Adventure"
                      ? "action_adventure"
                      : name === "Sci-Fi & Fantasy"
                      ? "sci-fi_fantasy"
                      : name === "War & Politics"
                      ? "war_politics"
                      : name.toLowerCase()}
                  </small>
                );
              })}
            </div>
          )}
          {loading ? (
            <>
              <Skeleton width={150} />
              <div className="w-100 grid md:grid-cols-5 lg:grid-cols-5 grid-cols-3 gap-4">
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
                <SliderSkeleton />
              </div>
            </>
          ) : (
            <InfiniteScroll
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={
                <h1 className="text-center w-2/2 my-4">Please wait ...</h1>
              }
              className="w-100 grid md:grid-cols-5 lg:grid-cols-5 grid-cols-3 gap-4"
            >
              {data?.results?.map((data) => {
                // console.log(original_title ? original_title : "not");
                return (
                  <div key={data.id} className="overflow-hidden">
                    <MovieCard data={data} mediaType={mediaType} />
                  </div>
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
export default Discover;

