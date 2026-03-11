import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/events", "routes/events.tsx"),
  route("/login", "routes/Login.tsx"),
  route("/register", "routes/Register.tsx"),
  route("/commitees", "routes/commitees.tsx"),
  route("/article/:id", "routes/article.$id.tsx"),

  // Protected dashboard routes
  route("/dashboard", "routes/protected/dashboard.tsx", [
    index("routes/protected/dashboard._index.tsx"),
    route("users", "routes/protected/dashboard.users.tsx"),
    route("profile", "routes/protected/dashboard.profile.tsx"),
    route("settings", "routes/protected/dashboard.settings.tsx"),
    route("committees", "routes/protected/dashboard.committees.tsx"),
    route("articles", "routes/protected/dashboard.articles.tsx"),
    route("meetings", "routes/protected/dashboard.meetings.tsx"),
    route("emails", "routes/protected/dashboard.emails.tsx"),
  ]),
] satisfies RouteConfig;
