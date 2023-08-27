import React, { useState } from "react";
import NotFound from "@assets/404-Not-Found.png";

export default function () {
  const [clamped, setClamped] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  const toggleClamp = () => {
    setClamped(!clamped);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="container prose dark debug-screens peer/name hover:text-red-500">
        <div class="perspective-9">
          <div class="w-40 h-40 p-4 bg-red-500 translate-z-20 rotate-x-30 rotate-y-35 -rotate-z-20">
            <h2>3D transform</h2>
          </div>
        </div>
        <div
          class="
              inline-block
              px-4
              py-2
              font-bold
              text-center text-gray-900
              transition-all
              bg-white
              border-2 border-black
              rounded-md
              active:-translate-z-10
              hover:bg-gray-900
              hover:text-white
              hover:-translate-z-5
              hover:-rotate-z-12
              hover:rotate-y-20
              hover:rotate-x-20
              hover:shadow-2xl
            "
        >
          Cube
        </div>
        <div class="p-20">
          <div class="perspective-9">
            <div class="w-40 h-40 p-4 bg-green-500 transform-style-3d rotate-x-30 rotate-y-35 -rotate-z-20">
              <div class="flex justify-end">
                <p class="p-2 translate-x-10 -translate-y-6 border border-black shadow-xl bg-white/70 translate-z-16 -rotate-x-10 -rotate-y-30 rotate-z-20">
                  3D transform
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="underline">Hello world!</h1>
        <input className="autofill:border-gray-900 autofill:shadow-fill-white autofill:text-fill-gray-900" />
        <p className={clamped ? "line-clamp-2" : ""}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
          quidem sint voluptas et sunt? Provident eaque, soluta maxime aliquam
          perferendis eveniet necessitatibus ullam harum nobis alias fugiat
          mollitia reprehenderit aspernatur repellat ex quia autem? Vel,
          dolorem. Nostrum fugit in harum at magnam ducimus aperiam fugiat vero
          ad. Veniam, quos repudiandae! Aut est tempora dolore saepe in ullam
          voluptatum non sapiente similique earum explicabo eligendi quasi
          aspernatur, rem corporis quaerat velit illum id neque maiores
          corrupti? Recusandae repellat, veritatis repudiandae omnis architecto
          quae nihil. Laboriosam, suscipit officia incidunt earum quis laborum
          labore, consequatur dolorum voluptatibus facere dolorem, corporis
          reiciendis facilis error?
        </p>
        <div class="filter filter-blur-2 filter-hue-rotate-90 sm:filter-blur-8">
          Some awesome filters
        </div>
        <div className={darkMode ? "dark:bg-dark-default" : ""}>
          <h1 className={darkMode ? "dark:text-white" : ""}>Not Found</h1>
          <h2>The requested page could not be found.</h2>
          <button
            title="Toggle Dark Mode"
            onClick={toggleDarkMode}
            className="btn btn-base-100"
          >
            {!darkMode ? "Yes" : "No"}
          </button>
          <br />
          <button
            title="Toggle Clamp"
            onClick={toggleClamp}
            className="btn btn-base-100"
          >
            {clamped ? "Show More" : "Show Less"}
          </button>
          <button
            title="Go Back"
            onClick={goBack}
            className="highlight highlight-indigo-600 highlight-variant-7 highlight-spread-md text-primary-default"
          >
            Go Back
          </button>
        </div>
      </div>
      <div class="group-custom">
        <div class="group-1">
          <div class="group-1-active:text-slate-500">Test</div>
        </div>
        <div class="group-custom-active:bg-pink-200">Again</div>
      </div>
      <br />
      <br />
      <div class="overflow-x-auto whitespace-nowrap w-24 scrollbar-none">
        Some long text which will overflow for sure. Please is it enough?
        Surely.
      </div>
      <div className=" peer-hover/name:text-red-500 animate-bounce">test</div>
      <div class="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
