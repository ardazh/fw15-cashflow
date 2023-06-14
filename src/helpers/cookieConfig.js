const cookieConfig = {
  cookieName: "cashflow",
  password: "KtV$X^2NzXfZ7&d8M2yL&p7JEFToC0@i",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}
  export default cookieConfig