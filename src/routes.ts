import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("pages/_index.tsx"),
  route("another-page", "pages/another-page.tsx"),
  route("edukacja", "pages/education.tsx"),
] satisfies RouteConfig;
