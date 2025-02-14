export const sessionOptions = {
  password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD as string,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      uid: string;
      email: string;
      accessToken: string;
    };
  }
}