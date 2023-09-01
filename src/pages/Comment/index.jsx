import React from "react";
import { Card, CardImage } from "@components";
import CameraImg from "@assets/Camera.png";
import VideoImg from "@assets/Video.png";
import StarImg from "@assets/Star.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  return (
    <>
      <Card>
        <div className="grid w-full h-full text-light-default dark:text-dark-default">
          <span className="grid items-end justify-center">
            <h1 className="font-semibold lg:text-5xl md:text-4xl">
              Leave us a comment!
            </h1>
          </span>
          <div className="grid grid-cols-[40%_60%] items-center justify-start pt-6 gap-x-6">
            <span className="grid items-end justify-end h-[90%] mt-20">
              <CardImage />
            </span>
            <div className="grid justify-center grid-flow-row-dense pr-10 gap-y-4">
              <label className="block">
                <span className="font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]">
                  <p className="text-center">
                    How was your experience with our services?
                  </p>
                </span>
                <textarea
                  className="resize-none block mb-10 mt-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  rows="6"
                ></textarea>
                <h5 className="text-center xl:text-2xl lg:text-base md:text-sm">
                  You can also
                </h5>
                <div className="grid grid-cols-[50%_auto_50%]">
                  <div className="grid grid-rows-[80%_5%] items-center justify-center">
                    <span className="grid items-center justify-center">
                      <img
                        src={CameraImg}
                        alt="CameraImg"
                        className="w-full h-1/2"
                      />
                    </span>
                    <button className="text-center xl:text-4xl lg:text-2xl md:text-lg hover: hover:text-primary-default">
                      Add Photo
                    </button>
                  </div>
                  <span className="grid items-center justify-center">
                    <h5 className="lg:text-xl md:text-lg">or</h5>
                  </span>
                  <div className="grid grid-rows-[80%_5%] items-center justify-center">
                    <span className="grid items-center justify-center">
                      <img
                        src={VideoImg}
                        alt="VideoImg"
                        className="w-full h-1/2"
                      />
                    </span>
                    <button className="text-center xl:text-4xl lg:text-2xl md:text-lg hover:text-primary-default">
                      Add Video
                    </button>
                  </div>
                </div>
              </label>
              <hr />
              <span className="grid items-start justify-center pt-6 cursor-pointer">
                <img src={StarImg} alt="StarImg" />
              </span>
              <h1 className="pt-6 text-center xl:text-3xl lg:text-2xl md:text-lg">
                Show us some love and give us some rate!
              </h1>
              <span className="grid items-end justify-center pt-6">
                <button className="px-20 text-xl capitalize text-light-default dark:text-dark-default btn btn-primary">
                  Submit
                </button>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
