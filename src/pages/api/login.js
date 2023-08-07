import cookieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  // get user from database then:
  // req.session.user = {
  //   id: 230,
  //   admin: true,
  // };
  // await req.session.save();
  // res.send({ ok: true });
  const request = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
    {
      method: "POST",
      body: new URLSearchParams(req.body).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const response = await request.json();
  const token = response?.results?.token;
  if (token) {
    req.session.token = token;
    await req.session.save();
  }
  return res.json(response);
}, cookieConfig);
