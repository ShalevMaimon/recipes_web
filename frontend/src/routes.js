import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/route_name/:route_name/recipe/:recipe_id",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/myfamilyrecipes",
    name: "myfamilyrecipes",
    component: () => import("./pages/MyFamilyRecipesPage"),
  },
  {
    path: "/users/CreateRecipe",
    name: "create",
    component: () => import("./pages/CreateRecipePage"),
  },
  {
    path: "/myfavoriterecipes",
    name: "myfavoriterecipes",
    component: () => import("./pages/MyFavoriteRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
