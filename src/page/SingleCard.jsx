import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TruncateText from "../components/TruncateText";
import HomeIcon from "../assets/home-icon.svg";
import RightIcon from "../assets/right-icon.svg";
import InstagramLogo from "../assets/instagram.svg";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../../src/features/gallareySlice"; // gallerySlice nomini o'zgartirishni unutmang

const API =
  "https://api.unsplash.com/photos/nDV6ahWLvEg?client_id=ji28ItvOyeZ86pQC1-WrT4eHq-VLrLQ3b4OdpDI_mS8";

function SingleCard() {
  const dispatch = useDispatch();
  const { likes } = useSelector((state) => state.like);
  const { id } = useParams();
  const [data, setData] = useState();

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=ji28ItvOyeZ86pQC1-WrT4eHq-VLrLQ3b4OdpDI_mS8`
      );
      const resp = await res.json();
      setData(resp);
    }
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="align-elements py-20">
      {data && (
        <>
          <ul className="flex gap-x-3 mb-8 text-sm breadcrumbs">
            <li>
              <Link
                className="flex items-center gap-x-1 hover:underline underline-offset-4"
                to="/"
              >
                <img src={HomeIcon} width={20} height={20} alt="" />
                <h3 className="text-[#F000B8] text-[18px] font-medium">Home</h3>
                <img src={RightIcon} width={20} height={20} alt="" />
              </Link>
            </li>
            <li>
              <h3 className="text-[#570DF8] text-[16px] font-medium">
                <TruncateText text={data?.alt_description} />
              </h3>
            </li>
          </ul>
          <div className="flex gap-x-20 w-full">
            <img
              src={data?.urls?.regular}
              className="w-[600px] h-[400px] object-cover rounded-md"
              alt=""
            />
            <div className="w-[50%]">
              <div className="flex items-center justify-between w-full pb-10">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-18 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={data?.user?.profile_image?.medium}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data?.user?.name}</div>
                    <div className="text-sm opacity-50">
                      {data?.user?.location}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://www.instagram.com/${data?.user?.social?.instagram_username}`}
                  target={"_blank"}
                >
                  <img src={InstagramLogo} alt="insta" className="w-8" />
                </a>
              </div>
              <h3 className="font-semibold text-[18px] pb-4">
                Image Description:{" "}
                <span className="capitalize font-normal">
                  {data?.alt_description}
                </span>
              </h3>
              <h3 className="font-semibold text-[18px] flex items-center gap-x-4 pb-4">
                Views:{" "}
                <span className="capitalize font-medium flex items-center gap-x-4">
                  {" "}
                  <svg
                    fill="#570DF8"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>eye</title>{" "}
                      <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z"></path>{" "}
                    </g>
                  </svg>
                  {data?.views}
                </span>
              </h3>
              <h3 className="font-semibold text-[18px] flex items-center gap-x-4 pb-4">
                Downloads:{" "}
                <span className="capitalize font-medium flex items-center gap-x-4">
                  {" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                        stroke="#570DF8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
                        stroke="#570DF8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  {data?.downloads}
                </span>
              </h3>
              <h3 className="font-semibold text-[18px] flex items-center gap-x-4 pb-4">
                Likes:
                <span
                  className="capitalize font-medium flex items-center gap-x-4"
                  onClick={() => dispatch(addLike())}
                >
                  {" "}
                  <svg
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    width="24"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z"
                        fill="#F000B8"
                      ></path>
                    </g>
                  </svg>
                  {data?.likes}
                </span>
              </h3>
              <h3 className="font-semibold text-[18px] flex items-center gap-x-4 pb-4">
                Color:{" "}
                <div
                  className="w-[20px] h-[20px] rounded-full"
                  style={{ backgroundColor: `${data?.color}` }}
                ></div>
              </h3>
              <div className="flex gap-6 flex-wrap">
                <h3 className="font-semibold text-[18px] flex items-center gap-x-4 pb-4">
                  Tags:
                </h3>
                {data?.tags.slice(0, 6).map((item) => (
                  <div className="bg-gray-400 px-6 py-4 text-center rounded-lg text-white max-w-full capitalize font-medium">
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(removeLike())}
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleCard;
