import { LocationType } from "@/types";
import React from "react";

const CardLocation = ({ location }: { location: LocationType }) => {
  const changeClock = (number: number) => {
    return Math.ceil(number / 60 + 9);
  };
  return (
    <>
      {/* Card */}
      <div className="flex flex-row w-full shadow-lg bg-white h-[190px] rounded-[20px] justify-center items-center px-4 gap-x-2">
        <div className="flex h-[85%] w-[40%] rounded-2xl">
          <img
            src={location.picture}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="flex flex-col w-[60%] h-[85%] rounded-2xl justify-center items-start px-2 gap-y-2 pr-[1%] relative">
          <h1 className="text-[24px] font-bold text-gray-600">
            {location.name}
          </h1>
          <h1 className="text-[16px] text-gray-400 -mt-2">
            {location.province}
          </h1>
          <h1 className="text-[10px] text-gray-600 w-[80%]">
            {location.address}
          </h1>
          <div className="flex flex-row justify-center items-center gap-x-2 text-md text-gray-500">
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              schedule
            </span>
            <p className="text-[12px] text-eb-10 font-bold">
              09:00 - {changeClock(location.operationalHour)}:00
            </p>
          </div>
          <div className="absolute bottom-0 right-0 text-white flex-row items-center">
            <div className="flex flex-row px-1 py-1 bg-eb-30 items-center justify-center rounded-lg gap-x-2">
              <span
                className="material-symbols-outlined text-white rounded-lg"
                style={{ fontSize: 20 }}
              >
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLocation;