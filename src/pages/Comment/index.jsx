import React from "react";
import { CardImage } from "@components";
import { FaArrowLeft } from "react-icons/fa";
import CameraImg from "@assets/Camera.png";
import VideoImg from "@assets/Video.png";
import StarImg from "@assets/Star.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="grid h-full ">
        <div className="grid grid-cols-2 gap-20">
          <div className="relative">
            <button
              onClick={goBack}
              className="absolute text-3xl transform -translate-y-1/2 left-4 top-10"
            >
              <FaArrowLeft />
            </button>
            <span className="grid items-end justify-end h-[90%] mt-20">
              <CardImage />
            </span>
          </div>
          <div className="pr-10">
            <div className="grid grid-flow-col pt-48">
              <h1 className="lg:text-3xl md:text-xl text-neutral-secondary">
                Leave us a comment
              </h1>
              <button
                onClick={home}
                className="lg:text-3xl md:text-xl h-fit text-neutral-secondary"
              >
                Submit
              </button>
            </div>
            <span className="grid items-end justify-center pt-20 cursor-pointer">
              <img src={StarImg} alt="StarImg" />
            </span>
            <div className="grid grid-cols-2 gap-10 pt-20">
              <div className="grid items-end justify-center">
                <span className="grid items-center justify-center">
                  <img
                    src={CameraImg}
                    alt="CameraImg"
                    className="w-full h-full"
                  />
                </span>
                <button className="mt-10 text-center xl:text-5xl lg:text-4xl md:text-2xl text-primary-default">
                  Add Photo
                </button>
              </div>
              <div className="grid items-end justify-center">
                <span className="grid items-center justify-center">
                  <img
                    src={VideoImg}
                    alt="VideoImg"
                    className="w-full h-full"
                  />
                </span>
                <button className="mt-10 text-center xl:text-5xl lg:text-4xl md:text-2xl text-primary-default">
                  Add Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
