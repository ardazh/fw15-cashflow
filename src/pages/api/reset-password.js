import coockieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function resetRoute(req, res) {
  const request = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/reset-password",
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
}, coockieConfig);
