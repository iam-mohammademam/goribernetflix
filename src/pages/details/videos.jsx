import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useFetch from "../../hooks/useFetch";
import NoThumbnail from "../../assets/no_thumbnail.jpg";
import VideoPlayer from "./VideoPlayer";
import Img from "../../components/lazyLoadImg/img";

import "./style.css";

const Videos = ({ mediaType, id }) => {
  const [videoId, setVideoId] = useState(null);
  const [show, setShow] = useState(false);

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  // console.log(data);
  return (
    <>
      {data?.results?.length > 0 ? (
        <div className="pt-7">
          <h1 className="text-lg font-semibold raleway mb-4">
            {loading ? <Skeleton width={70} /> : "Official Videos"}
          </h1>
          <div className="w-auto videos overflow-x-scroll flex items-center gap-4 ">
            {loading ? (
              <div className="flex items-center gap-4 w-100 overflow-x-scroll videos">
                <div className="md:w-1/5 lg:w-1/5 w-3/5 flex-shrink-0 ">
                  <Skeleton height={85} />
                  <h1>
                    <Skeleton />
                  </h1>
                </div>
                <div className="md:w-1/5 lg:w-1/5 w-3/5 flex-shrink-0 ">
                  <Skeleton height={85} />
                  <h1>
                    <Skeleton />
                  </h1>
                </div>
                <div className="md:w-1/5 lg:w-1/5 w-3/5 flex-shrink-0 ">
                  <Skeleton height={85} />
                  <h1>
                    <Skeleton />
                  </h1>
                </div>
                <div className="md:w-1/5 lg:w-1/5 w-3/5 flex-shrink-0 ">
                  <Skeleton height={85} />
                  <h1>
                    <Skeleton />
                  </h1>
                </div>
                <div className="md:w-1/5 lg:w-1/5 w-3/5 flex-shrink-0 ">
                  <Skeleton height={85} />
                  <h1>
                    <Skeleton />
                  </h1>
                </div>
              </div>
            ) : (
              data?.results?.map(({ key, id, name }) => {
                return (
                  <div
                    onClick={() => {
                      setVideoId(key);
                      setShow(true);
                    }}
                    key={id}
                    className="md:w-1/5 lg:w-1/5 w-3/5 flex-shrink-0"
                  >
                    <div className="w-2/2 rounded-md overflow-hidden">
                      <Img
                        src={
                          key
                            ? `https://img.youtube.com/vi/${key}/mqdefault.jpg`
                            : NoThumbnail
                        }
                        alt=""
                        className="h-100 w-2/2"
                      />
                    </div>
                    <h1 className="whitespace-nowrap text-ellipsis overflow-hidden mt-2 w-2/2">
                      {name}
                    </h1>
                  </div>
                );
              })
            )}

            <VideoPlayer
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Videos;
