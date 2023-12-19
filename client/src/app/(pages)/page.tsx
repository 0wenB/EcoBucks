import Caraousel from "@/components/Caraousel";
import Card from "@/components/Card";
import CardEducation from "@/components/CardEducation";
import Footer from "@/components/Footer";
import { OptionMT, SelectMT } from "@/components/MaterialTailwind";
import { LocationType } from "@/types";
import { fetchData } from "../(action)/fetchDataHome";
import { fetchProvince } from "../(action)/fetchProvince";
import UcoForm from "@/components/UcoForm";
import { redirect } from "next/navigation";
import { searchProvince } from "../(action)/searchProvince";
import { cookies } from "next/headers";
import NavbarComponent from "@/components/Navbar";
import { getVideos } from "@/db/models/videos";

export default async function Home() {
  const slides = [
    "https://source.unsplash.com/random/900x700/?person",
    "https://source.unsplash.com/random/900x700/?person+2",
    "https://source.unsplash.com/random/900x700/?person+3",
    "https://source.unsplash.com/random/900x700/?person+4",
  ];

  type res = {
    statusCode: 200;
    message: "successfully read Location";
    data: LocationType[];
  };

  const data: res = await fetchData();

  const cookie = cookies();
  const token = cookie.get("token");

  // console.log(token);

  if (!token) {
    redirect("http://localhost:3000/login");
  }

  const videos = await getVideos();

  const provinces = await fetchProvince();
  const randomizedVideos = videos
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <NavbarComponent />

      {/* Hero Section */}
      <div className="flex w-screen h-[600px] items-center justify-center px-[8%] mt-[8%]">
        <div className="bg-white w-full h-full flex flex-row gap-x-4">
          {/* Left Component */}
          <div className="flex flex-row justify-end items-center w-[70%] h-full rounded-[20px] overflow-hidden shadow-md">
            <div className="w-full h-full flex flex-row relative">
              <Caraousel autoSlide={true}>
                {slides.map((s) => (
                  <img
                    key={s + "id"}
                    src={s}
                    className="w-full h-full object-contain"
                    alt="image"
                  />
                ))}
              </Caraousel>
            </div>
          </div>

          <div className="flex w-[30%]">
            {/* Right Component */}
            <UcoForm />
          </div>
        </div>
      </div>

      {/* LocationSearch */}
      <div className="w-screen h-[730px] items-center justify-start px-[8%] flex-col flex mt-[5%]">
        <div className="flex flex-col w-full">
          <p className="text-eb-30 text-[14px]">Location EcoBucks</p>
          <p className="text-[50px] raleway font-medium -mt-2">
            Our Nearest Collector Point
          </p>
        </div>

        {/* Search Collecting Point */}
        <div className="flex flex-col w-screen items-center h-[660px] py-12 px-[8%]">
          {/* Search Bar */}
          <div className="flex w-full justify-start items-start -mt-4">
            <form
              className="flex flex-row bg-white shadow-md w-[35%] h-[96px] ml-2 rounded-xl justify-between px-[2%]"
              action={searchProvince}
            >
              <div className="flex flex-col justify-center gap-y-2 items-start w-[30%]">
                <div className="flex flex-row gap-x-2 items-center">
                  <span
                    className="material-symbols-outlined text-gray-700"
                    style={{ fontSize: 30 }}
                  >
                    location_on
                  </span>
                  <SelectMT
                    placeholder={""}
                    variant="standard"
                    label="Select Province"
                    name="province"
                  >
                    {provinces?.map((province, index) => (
                      <OptionMT key={index} value={province}>
                        {province}
                      </OptionMT>
                    ))}
                  </SelectMT>
                </div>
              </div>
              <button
                className="flex flex-col justify-center items-center w-[38%]"
                type="submit"
              >
                <div className="flex flex-row gap-x-2 bg-eb-10 px-4 py-3 rounded-[15px] text-white">
                  <span className="material-symbols-outlined">search</span>
                  <p>Search</p>
                </div>
              </button>
            </form>
          </div>

          {/* Card Bar */}
          <div className="overflow-x-auto flex flex-row w-full h-[80%] items-start justify-start pl-1 py-5 gap-x-5">
            {data?.data?.map((location) => (
              <Card key={location + "id"} location={location} />
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="flex w-screen flex-col h-[450px] justify-start items-center mb-[5%]">
        <h1 className="text-sm text-eb-30">EcoBucks Education</h1>
        <h1 className="text-[50px] raleway font-medium text-gray-900 -mt-2">
          Education
        </h1>

        {/* Card Section */}
        <div className="flex flex-row w-screen px-[5%] h-[70%] justify-center items-center gap-x-4">
          {randomizedVideos.map((video, idx) => (
            <CardEducation key={idx} detail={video} />
          ))}
        </div>

        <div className="w-full justify-center items-center h-[20%] flex">
          <div className="flex flex-row gap-x-2 bg-eb-10 py-3 rounded-[20px] text-white w-[10%] items-center justify-center">
            <p>See All</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
