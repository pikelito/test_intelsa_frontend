<template>
<section>
    <b-row>
        <b-col>
            <b-card style="max-width: 100%">
                <template v-slot:header>
                    <div class="header-card text-left">
                        Listado de Estudiantes
                        <b-button size="sm" @click="openModal" variant="outline-info" style="float:right">Nuevo Estudiante</b-button>
                    </div>
                </template>
                <b-row>                   
                    <b-col lg="6" class="p-0 pb-2" >
                        <b-form-group
                        label="Filtrar Resultados"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="filterInput"
                        class="mb-0"
                        >
                        <b-input-group size="sm">
                            <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Buscar"
                            ></b-form-input>
                            <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">X</b-button>
                            </b-input-group-append>
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-table striped hover :items="items" :fields="fields" :filter="filter" :current-page="currentPage" :per-page="perPage">
                        <template v-slot:cell(actions)="row">
                            <b-button size="sm" variant="light" @click="editModal(row)" class="mr-1 p-0">
                                <b-icon  
                                    id="tooltip-edit"                                   
                                    icon="pencil-square"
                                    variant="primary"
                                ></b-icon>
                                <b-tooltip target="tooltip-edit" triggers="hover">
                                    Editar Estudiante
                                </b-tooltip>
                            </b-button>
                            <b-button size="sm"  variant="light" class="mr-1 p-0" @click="deleteModal(row)">
                                <b-icon  
                                    id="tooltip-delete"                                   
                                    icon="trash-fill"
                                    variant="danger"
                                ></b-icon>
                                <b-tooltip target="tooltip-delete" triggers="hover">
                                    Eliminar Estudiante
                                </b-tooltip>
                            </b-button>
                        </template>
                    </b-table>
                     <b-col sm="5" md="2" >
                        <b-form-group
                        label="Filas"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="perPageSelect"
                        class="mb-0"
                        >
                        <b-form-select
                            v-model="perPage"
                            id="perPageSelect"
                            size="sm"
                            :options="pageOptions"
                        ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col sm="7" md="6" >
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                        ></b-pagination>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
    <b-modal v-model="dataModals.value" :title="dataModals.title" :header-bg-variant="dataModals.variant" header-text-variant="light" :hide-footer="true" :no-close-on-backdrop="true" size="lg" @hide="onInit()">
      <modal-deleteestudiante v-if="dataModals.actions==='Eliminar'"/>
      <modal-estudiante :items="dataModals.data" v-else/>
    </b-modal>
</section>
</template>

<script>
import modalEstudiante from './modals/estudiante.vue'
import modalDeleteestudiante from './modals/deleteEstudiante.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name: "estudiantes",
    components: {
      modalEstudiante,
      modalDeleteestudiante
    },
    data() {
        return {
            fields: [
                {
                    key: 'identificacion_tipo.name',
                    label: 'Tipo Identificación',
                },
                {
                    key: 'identificacion_numero',
                    label: 'Número Documento',
                    sortable: true
                },
                {
                    key: 'nombres',
                    sortable: true,
                },
                {
                    key: 'apellidos',
                    sortable: true,
                },
                {
                    key: 'fecha_nacimiento',
                },
                {
                    key: 'genero.name',
                    label: 'Genero',
                },
                {
                    key: 'carreras.name',
                    label: 'Carrera',
                },
                {  
                    key: 'actions', 
                    label: 'Actions' 
                }
            ],
            items: [],
            filter: null,
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15],
        }
    },
    created() {
        this.onInit()
    },
    computed: {
        ...mapState({
            dataModals: state => state.globalStore.dataModals,
        }),
    },
    methods: {
        ...mapActions({
            getEstudiantes: 'estudiantesStore/getEstudiantes',
            getListas:  'globalStore/getListas',
            assingGlobalState:  'globalStore/assingGlobalState',
        }),
        openModal() {
            this.assingGlobalState(['dataModals', { value: true , title: 'Nuevo Estudiante', variant: 'info', actions: 'Nuevo', data: []}])
        },
        editModal(data) {
            this.assingGlobalState(['dataModals', { value: true , title: 'Editar Estudiante', variant: 'primary', actions: 'Editar', data: [data.item]}])
        },
        deleteModal(data) {
            this.assingGlobalState(['dataModals', { value: true , title: 'Eliminar Estudiante', variant: 'danger', actions: 'Eliminar', data: data.item}])
        },
        async onInit()
        {            
            await this.getListas()
            let items= await this.getEstudiantes()
            this.items=items.data
            this.totalRows = this.items.length
        }
    }
}
</script>

<style>
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
    background: #fcfcfc;
    font-weight: 500;
}
</style>
