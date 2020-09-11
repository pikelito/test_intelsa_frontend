import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            listasGetters: 'globalStore/listasGetters',
        }),
        ...mapState({
            saveAlert: state => state.globalStore.saveAlert,
            listas: state => state.globalStore.listas,
            estudiantes: state => state.estudiantesStore.estudiantes,
        })
    },
    methods: {
        ...mapActions({
            updateEstudiante: 'estudiantesStore/updateEstudiante',
            saveEstudiante: 'estudiantesStore/saveEstudiante',
            getEstudiante: 'estudiantesStore/getEstudiante',
            deleteEstudiante: 'estudiantesStore/deleteEstudiante',
            assingGlobalState: 'globalStore/assingGlobalState',
        }),
        showAlert(title) {
            this.assingGlobalState(['saveAlert', { notification: { title: title, content: '', error: false, view: true, color: false, }, loading: true, capa: true }])
        },
    },
}