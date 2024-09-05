import React, { lazy, Suspense } from "react";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import Button from "./Button";
import Loader from "./Loader";


const About = lazy(() => import('./About'));


const Hero = () => {
  const words = `Ensuring Safety for Women`;
  return (
    <>
      <div className="relative min-h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="min-h-fit p-8 pt-0">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="text w-full flex justify-center items-center gap-4 flex-col md:flex-row lg:flex-row mt-20 sm:mt-10">
              <div className="flex flex-col items-center">
                <h1 className="block antialiased tracking-normal font-primary text-5xl sm:text-7xl font-semibold text-white leading-[1.2] sm:leading-[1.25]">
                  <TextGenerateEffect words={words} />{" "}
                  <span className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400">
                    Sahayak
                  </span>
                </h1>
                <div className="flex gap-3 ">
                  <div className="mt-7">
                    <Button text="Onboard Yourself" />
                  </div>
                  <div className="mt-7">
                    <Button text="Send SOS Message" />
                  </div>
                </div>
              </div>
              <br />
              <div className="image-container">
            <img
              src="./heroImage.webp"
              alt="Hero"
              className="w-full object-cover drop-shadow-lg image-animate"
            />
          </div>
         
            </div>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
        <About />
      </Suspense>
    
      </div>
    </>
  );
};

export default Hero;
