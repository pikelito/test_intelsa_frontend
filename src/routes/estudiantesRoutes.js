import MasterLayout from "@/layouts/master";
export default [{
    path: "/estudiantes",
    component: MasterLayout,
    children: [{
        path: "lista",
        name: "estudiantes.lista",
        meta: { title: 'Estudiantes', auth: true },
        component: () =>
            import ( /* webpackChunkName: "estudiantes" */ '../views/estudiantes/index.vue'),
    }, ]
}]