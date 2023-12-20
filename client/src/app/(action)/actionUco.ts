"use server"

import { redirect } from "next/navigation";
import SubmitUcoPage from "../(pages)/submit-uco/page";

export const getUco = async (formData: FormData) => {
    console.log(formData.get("sum"));
    console.log(formData.get("jenis"));
    const dataSum = formData.get("sum")
    const dataJenis = formData.get("jenis")

    // await 

    const sum = JSON.parse(JSON.stringify(dataSum))
    const jenis = JSON.parse(JSON.stringify(dataJenis))

    // console.log(data, '==========');

    // await SubmitUcoPage(sum)

    return redirect(`http://localhost:3000/submit-uco?sum=${sum}`) 
  };