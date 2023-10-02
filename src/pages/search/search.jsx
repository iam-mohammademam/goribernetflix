import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SliderSkeleton from "../../components/skeleton/sliderSkeleton";

import { fetchDataFromApi } from "../../hooks/api";
import MovieCard from "../../components/card/card";
import NoResult from "../../assets/no_result.png";

const Search = () => {
  const { query } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/search/multi?query=${query}&include_adult=false&page=${pageNum}&sort_by=popularity.desc`
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

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi(
      `/search/multi?query=${query}&include_adult=false&page=${pageNum}&sort_by=popularity.desc`
    ).then((res) => {
      setData(res.data);
      setLoading(false);
      setPageNum((prev) => prev + 1);
    });
  }, [query]);

  return (
    <>
      <div className="w-screen py-6 px-10">
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
            </div>
          </>
        ) : data?.results?.length > 0 ? (
          <>
            <h1 className=" mb-10 text-xl font-medium">
              Search results for
              <span className="font-semibold">{` "${query}"`}</span>
            </h1>

            <InfiniteScroll
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<h1 className="text-center w-2/2 my-4">Please wait ...</h1>}
              className="w-100 grid md:grid-cols-5 lg:grid-cols-5 grid-cols-3 gap-4"
            >
              {data?.results?.map((data) => {
                return (
                  <div key={data.id} className="overflow-hidden">
                    <MovieCard data={data} Loading={loading} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </>
        ) : (
          <div className="h-screen w-screen flex items-center justify-center flex-col">
            <img src={NoResult} alt="" className="w-1/3" />
            <div className="">
              <h1 className="text-4xl mb-3 font-medium tracking-wider">
                Oops..
              </h1>
              <span className="">No results found.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Search;
