import { Button } from "@/components/ui/button";
import { ArrowBigRightDashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <h1 className=" mt-6 text-center text-7xl max-sm:text-3xl max-md:text-4xl font-bold text-zinc-300">
        404 | Page Not Found
      </h1>

      <div className="h-[80vh] flex justify-evenly items-center  w-full ">
        <img
          src={`./src/assets/frame2.png`}
          alt="svg"
          width={500}
          height={500}
          className="absolute object-cover inset-0 size-full opacity-40"
        />
        <svg
          className="pointer-events-none isolate z-[999999] size-full absolute inset-0 opacity-30 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <div className="w-[50%] max-lg:w-[70%] xl:w-[30%] max-sm:w-[95%]">
          <img src="./src/assets/base.png" alt="bro" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold text-center">You lost Bro?</p>
          <Link to={"/"}>
            <Button variant="ghost">Go to home <ArrowBigRightDashIcon/></Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
