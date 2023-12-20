"use client";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import NavbarComponent from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { updatePicture, userModel } from "@/db/models/user";
import { getUser } from "@/app/(action)/actionGetUser";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  type dataUser = {
    statusCode: string;
    message: string;
    data: userModel | undefined;
  };

  const [open, setOpen] = useState(false);
  const [pressChangePicture, setPressChangePicture] = useState(false);
  const [user, setUser] = useState<dataUser>();
  const [picture, setPicture] = useState("");

  const fetchUser = async () => {
    try {
      const data: dataUser | undefined = await getUser();
      setUser(data);
      // console.log(data, "====user===");
    } catch (error) {
      console.log(error);
    }
  };

  const changePicture = async (formData: FormData) => {
    try {
      const data = formData.get("picture");

      await fetch("http://localhost:3000/api/picture", {
        method: "PUT",
        body: JSON.stringify({
          email: user?.data?.email,
          picture: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/user/settings");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // console.log(user?.data);
  // console.log(picture);

  return (
    <>
      <div className="rounded-[10px] h-[500px] w-full md:w-[875px] md:h-fit mt-4 md:mt-0 md:p-10 overflow-auto bg-white shadow-lg animate-fade-up mb-[7%]">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="w-full sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                Profile Settings
              </h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={user?.data?.profilePicture}
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      onClick={() => setPressChangePicture(true)}
                      className="py-3.5 px-7 text-base font-medium text-white focus:outline-none bg-eb-10 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    >
                      Change picture
                    </button>
                    {pressChangePicture && (
                      <Modal
                        open={pressChangePicture}
                        onClose={() => setPressChangePicture(false)}
                      >
                        <div className="p-8 rounded-lg  max-w-md w-full">
                          <h1 className="text-xl font-semibold mb-4">
                            Update your profile picture
                          </h1>
                          <form action={changePicture}>
                            <div className="mb-4">
                              <input
                                type="text"
                                placeholder="https://yourimage.com"
                                className=" w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
                                name="picture"
                                // value={picture}
                                // onChange={(e) => setPicture(e.target.value)}
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </Modal>
                    )}
                  </div>
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name"
                        defaultValue="Jane"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="last_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;