"use server";

import { transporter } from "@/config/nodemailer";

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terima Kasih Telah Mensubscribe Website Kami</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }

    h1 {
      color: #007BFF;
      margin-bottom: 20px;
    }

    p {
      color: #555;
      line-height: 1.6;
    }

    .logo {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007BFF;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="URL_LOGO_ANDA" alt="Logo Perusahaan" class="logo">
    <h1>Thank You for Subscribing!</h1>
    <p>Thank you so much for subscribing to our website.</p>
    <p>Kami ingin menyampaikan terima kasih yang sebesar-besarnya karena Anda telah berlangganan (subscribe) ke website kami. Kepentingan dan dukungan Anda sangat berarti bagi kami!</p>
    <p>Jika Anda memiliki pertanyaan, masukan, atau butuh bantuan, jangan ragu untuk <a href="mailto:info@example.com">menghubungi kami</a>. Kami sangat senang mendengar dari Anda.</p>
    <p>Terima kasih sekali lagi karena telah menjadi bagian dari komunitas kami. Kami berkomitmen untuk memberikan pengalaman terbaik dan informasi yang bermanfaat untuk Anda.</p>
    <p>Salam hormat,</p>
    <p>Tim [Nama Perusahaan Anda]</p>
    <a href="#" class="button">Kunjungi Website Kami</a>
  </div>
</body>
</html>
`;

const email = "ecobucks08@gmail.com";

export const subs = async (formData: FormData) => {
  console.log(formData);
  const email = formData.get("email");

  if (!email) {
    throw "error";
  }
  console.log(email);

  transporter.sendMail(
    {
      from: `EcoBucks <${email}>`,
      to: email.toString(),
      subject: "Thanks For Subscribe EcoBucks",
      html: htmlTemplate,
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
