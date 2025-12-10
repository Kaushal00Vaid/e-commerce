import passport from "passport";
import UserModel from "../models/User.model";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0].value;

        let user = await UserModel.findOne({ email });

        if (!user) {
          user = await UserModel.create({
            name,
            email,
            avatar,
            provider: "google",
          });
        }

        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

export default passport;
