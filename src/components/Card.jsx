import React, { useState } from "react";
import { Link } from "react-router-dom";

import TruncateText from "./TruncateText";

function Card({
  imageId,
  src,
  alt,
  likes,
  user,
  downloadURL,
  slug,
  image,
  avatar,
  username,
}) {
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
  return (
    <div className="card w-96 glass mt-12 shadow-lg">
      <Link to={`/cards/${imageId}`}>
        <figure>
          <img
            src={src}
            alt={alt}
            className="w-[384px] h-[227px] object-cover card-image"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          {" "}
          <TruncateText text={alt} />
        </h2>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-x-2">
            <div className="avatar">
              <div className="w-8 rounded-full object-cover">
                <img
                  src={
                    avatar ? (
                      avatar
                    ) : (
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
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
                            d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                            fill="#2e3436"
                          ></path>{" "}
                        </g>
                      </svg>
                    )
                  }
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div className="font-bold">{username}</div>
          </div>
          <div className="flex items-center gap-x-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#F000B8"
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z"
                  fill="#F000B8"
                ></path>
              </g>
            </svg>
            <div className="stat-value text-primary text-[18px]">{likes}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/cards/${imageId}`} className="btn btn-secondary">
            GET Info
          </Link>
          <button
            disabled={fetching}
            onClick={() =>
              download(
                "https://unsplash.com/photos/m3m-lnR90uM/download?ixid=M3w1MDgyNzZ8MHwxfGFsbHx8fHx8fHx8fDE2OTg5NDEyMDZ8",
                "unsplash-image"
              )
            }
            aria-label="download gif"
            className="btn btn-primary"
          >
            DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
