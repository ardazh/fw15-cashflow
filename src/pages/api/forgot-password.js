import cookieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function forgotRoute(req, res) {
  const request = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/forgot-password",
    {
      method: "POST",
      body: new URLSearchParams(req.body).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const respons = await request.json();
  return res.json(respons);
}, cookieConfig);
