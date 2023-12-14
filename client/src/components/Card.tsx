import { LocationType } from "@/types";
import React from "react";

const Card = ({ location }: { location: LocationType }) => {
  const changeClock = (number: number) => {
    return Math.ceil(number / 60 + 9);
  };
  return (
    <>
      {/* card */}
      <div className="flex h-full gap-x-4">
        <div className="flex flex-col bg-white w-[326px] h-full rounded-lg shadow-lg relative overflow-hidden hover:scale-105 transition-all justify-between pb-2">
          <div className="flex h-[70%] w-full overflow-hidden items-center justify-center p-[5%] -mb-[5%] rounded-lg">
            {/* Picture of The Card */}
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img
                src={location.picture}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>
          {/* Title Card */}
          <div className="flex flex-col w-full px-[7%] pt-4 gap-y-1">
            <p className="text-gray-800 font-bold">{location.name}</p>
            <div className="text-[11px] text-gray-500">
              {location.address}, <b>{location.province}</b>
            </div>
          </div>

          <div className="flex flex-row w-full h-[10%] justify-between items-center px-[6%] mt-[4%] pb-[3%]">
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

            <span
              className="material-symbols-outlined p-2 bg-eb-30 text-white rounded-lg"
              style={{ fontSize: 18 }}
            >
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;