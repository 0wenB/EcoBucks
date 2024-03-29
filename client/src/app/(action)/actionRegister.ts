"use server";

import { createUser, userModel, userType } from "@/db/models/user";
import { MyResponse } from "@/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const url = "http://localhost:3000/";
export const onSubmitRegister = async (formData: FormData) => {
  const userInput = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
    job: z.string(),
    dateOfBirth: z.string(),
    walletBalance: z.number().optional().nullable(),
    profilePicture: z.string().optional().nullable(),
    role: z.string().optional().nullable(),
  });

  const name = formData.get("name");
  const password = formData.get("password");
  const email = formData.get("email");
  const job = formData.get("job");
  const dateOfBirth = formData.get("dateOfBirth");

  const parsedData = userInput.safeParse({
    name,
    password,
    email,
    job,
    dateOfBirth,
  });
  if (!parsedData.success) {
    const errorPath = parsedData.error.issues[0].path[0];
    const errorMessage = parsedData.error.issues[0].message;
    const errorFinal = `${errorPath} - ${errorMessage}`;
    return redirect(`http://localhost:3000/login?error=${errorFinal}`);
  }

  const userData: userType | any = {
    name: parsedData.data.name,
    password: parsedData.data.password,
    email: parsedData.data.email,
    job: parsedData.data.job,
    dateOfBirth: parsedData.data.dateOfBirth,
    walletBalance: 0, // Ensure this property matches the expected spelling in UserModelCreateInput
    phoneNumber: "",
    pickupVoucher: 0,

    // Add the missing properties from UserModelCreateInput
  };

  await createUser(userData);

  return redirect("http://localhost:3000/login");
};
