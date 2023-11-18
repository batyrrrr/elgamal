
export enum AppRoutes {
  Main = "main",
  About = "about",
  Error = "error",
  Profile = "profile",
  Articles = "articles",
  Article_Details = "articles_details",
  Admin = "admin",
  Login = "login"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: "/",
  [AppRoutes.About]: "/about",
  [AppRoutes.Profile]: "/profile",
  [AppRoutes.Articles]: "/articles",
  [AppRoutes.Admin]: "/admin",
  [AppRoutes.Article_Details]: "/articles/", // + :id
  [AppRoutes.Error]: "*",
  [AppRoutes.Login]: "/login"
};