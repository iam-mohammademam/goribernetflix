import { useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { imgUrl } from "../../hooks/api";
import noPoster from "../../assets/no_poster.jpg";
import useFetch from "../../hooks/useFetch";

import Videos from "./videos";
import VideoPlayer from "./VideoPlayer";

import Similar from "./similar";
import Recommended from "./recommended";

import Img from "../../components/lazyLoadImg/img";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const [videoId, setVideoId] = useState(null);
  const [show, setShow] = useState(false);

  const { data: video } = useFetch(`/${mediaType}/${id}/videos`);

  const trailerIndex = video?.results?.length - 1;
  console.log(data);
  return (
    <>
      <div className="w-screen px-10 mt-8">
        <div className="md:w-5/5 lg:4/5 w-2/2 mx-auto grid md:mt-16 lg:mt-16 md:grid-cols-2 lg:grid-cols-2 grid-cols-1 row-gap-5 ">
          <div className="banner_img w-2/2">
            {!loading ? (
              <Img
                alt=""
                src={
                  data?.poster_path ? imgUrl.url + data?.poster_path : noPoster
                }
                className="rounded-md md:w-3/5 w-3/4 lg:w-3/5 mx-auto"
              />
            ) : (
              <div className="rounded-md md:w-3/5 w-3/4 lg:w-3/5 mx-auto">
                <Skeleton height={340} />
              </div>
            )}
          </div>
          <div className="banner_details w-2/2">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {loading ? (
                <Skeleton height={20} width={70} />
              ) : (
                data?.genres?.map(({ name, id }) => {
                  return (
                    <h3
                      key={id}
                      className="genres text-sm bg-theme rounded-sm px-3 py-1 text-bg"
                    >
                      {name}
                    </h3>
                  );
                })
              )}
            </div>
            <h1 className="md:text-2xl lg:text-2xl text-xl font-medium tracking-wider">
              {loading ? (
                <Skeleton />
              ) : mediaType === "tv" ? (
                data?.original_name
              ) : (
                data?.original_title
              )}
              {loading ? (
                <Skeleton width={100} />
              ) : mediaType === "tv" ? (
                ` (${data?.first_air_date?.split("-")[0]})`
              ) : (
                ` (${data?.release_date?.split("-")[0]})`
              )}
            </h1>
            <small className="capitalize">
              {loading ? <Skeleton width={200} /> : data?.tagline}
            </small>
            <h4 className="font-semibold raleway mt-3">
              {loading ? <Skeleton width={90} /> : `Description: `}
            </h4>
            <small className="banner_overview">
              {loading ? <Skeleton count={3.5} /> : data?.overview}
            </small>
            {mediaType === "tv" ? (
              <>
                <div className="flex mt-3 items-center gap-2">
                  <h4 className="capitalize font-semibold raleway">
                    {loading ? <Skeleton width={70} /> : "Total Season : "}
                  </h4>
                  <span className="capitalize font-semibold raleway">
                    {loading ? (
                      <Skeleton width={20} />
                    ) : (
                      data?.number_of_seasons
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="capitalize font-semibold raleway">
                    {loading ? <Skeleton width={90} /> : "Total episodes :"}
                  </h4>
                  <span className="capitalize font-semibold raleway">
                    {loading ? (
                      <Skeleton width={20} />
                    ) : (
                      data?.number_of_episodes
                    )}
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="capitalize font-semibold raleway">
                {loading ? <Skeleton width={110} /> : "Languages :"}
              </h4>
              {loading ? (
                <Skeleton width={90} />
              ) : (
                data?.spoken_languages?.map((data, index) => {
                  return (
                    <span key={index} className="capitalize raleway">
                      {index >= 1
                        ? `${data?.english_name} ,`
                        : data?.english_name}
                    </span>
                  );
                })
              )}
            </div>

            <div className="flex my-5 items-center justify-between">
              <div>
                <h4 className="capitalize font-semibold raleway">
                  {loading ? <Skeleton width={80} /> : "status"}
                </h4>
                <span className="capitalize raleway">
                  {loading ? <Skeleton width={60} /> : data?.status}
                </span>
              </div>
              <div>
                <h4 className="capitalize font-semibold raleway">
                  {loading ? <Skeleton width={80} /> : "runtime"}
                </h4>
                <span>
                  {loading ? (
                    <Skeleton width={60} />
                  ) : (
                    <>
                      {mediaType === "tv" ? "_ " : `${data?.runtime} `}
                      <span className="capitalize raleway">minutes</span>
                    </>
                  )}
                </span>
              </div>
              <div>
                <h4 className="capitalize font-semibold raleway">
                  {loading ? <Skeleton width={80} /> : "ratings"}
                </h4>
                <span className="capitalize flex items-center">
                  {loading ? (
                    <Skeleton width={60} />
                  ) : (
                    <>
                      {data?.vote_average.toFixed(1)}
                      <small className="text-sm">{`(${data?.vote_count})`}</small>
                    </>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => {
                setVideoId(
                  video?.results?.length > 0
                    ? video?.results[trailerIndex].key
                    : null
                );
                setShow(video?.results?.length > 0 ? true : false);
              }}
              className="flex play_button items-center my-3 gap-2 text-sm"
            >
              {loading ? (
                <Skeleton height={40} width={40} circle={true} />
              ) : (
                <span className="border-2  h-8 w-8 rounded-full flex items-center justify-center">
                  <i className="uil uil-play text-lg "></i>
                </span>
              )}
              <span>{loading ? <Skeleton width={80} /> : "Watch Trailer"}</span>
            </div>
          </div>
        </div>
        <Videos mediaType={mediaType} id={id} />
        <VideoPlayer
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </div>
      <Similar mediaType={mediaType} id={id} />
      <Recommended mediaType={mediaType} id={id} />
    </>
  );
};
export default Details;
