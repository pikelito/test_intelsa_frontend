// import BlankLayout from "@/layouts/blank";
import authRoutes from "./authRoutes.js";
import estudiantesRoutes from "./estudiantesRoutes.js";

const baseRoutes = [{
    path: "*",
    redirect: "/estudiantes/lista"
}, ]

const importedRoutes = [
    authRoutes,
    estudiantesRoutes,
];

const routes = importedRoutes.reduce(function(prev, moduleRoute) {
    return prev.concat(moduleRoute);
}, baseRoutes)


export default routes;