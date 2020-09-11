<template>
<div>
    <div class="modalsave" v-if="loading"/>
    <div>
      <p class="text-center">Datos del estudiante que será eliminado</p>   
      <b-table striped hover :items="[this.dataModals.data]" :fields="fields"></b-table>   
      <div class="text-right pt-4">
           <b-button @click="saveForm" variant="secondary" type="button" size="sm">Eliminar</b-button>
      </div>
    </div>
    
</div>
</template>

<script>
import Multiselect  from '@/components/vue-multiselect/src/'
import estudiantesMixins  from '@/mixins/estudiantes.js'
import VueNumeric   from '@/components/vue-numeric/vue-numeric.vue'
import {  mapState } from "vuex"
export default {
    name: 'estudiantes',
    mixins: [estudiantesMixins],
    components: {
      'c-multiselect': Multiselect,
      VueNumeric
    },
    data()
    {
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
        ],
      }
    },
    computed: {
        ...mapState({
            estudiantes: state => state.estudiantesStore.estudiantes,
            dataModals: state => state.globalStore.dataModals,
        })
    },
    created()
    {

    },
    destroyed(){},
    methods: {
        async saveForm() {
          this.loading = true;
          let confirmar = confirm(`¿Está seguro de eliminar este estudiante?`)
          if(confirmar)
          {
            // elimino
            await this.deleteEstudiante(this.dataModals.data.id)  
            //alerta 
            this.showAlert('Datos eliminados con éxito')
            //cierro modal
            this.assingGlobalState(['dataModals', { value: false, title: null,variant: null,actions: null,data: [], }])           
          }
          this.loading = false;
        },
        resetForm()
        {
          this.estudiante= {
            id: null,
            nombres: null,
            apellidos: null,
            identificacion_tipo_id: 1,
            identifiacion_numero: null,
            genero_id: 1,
            fecha_nacimiento: null,
            carrera_id: 1,
          }
        },
    }
}
</script>

<style>
.input-date {
  width: 100%;
  border: 1px solid #cecece;
  padding: 5px 2px;
  height: 30px;
  border-radius: 3px;
  background: white;
}
.input-date:focus{
   border-color: #80bdff;
  -webkit-box-shadow: 0 0 0 0.4px rgba(0, 123, 255, 0.25);
  box-shadow: 0 0 0 0.4px rgba(0, 123, 255, 0.25);
}
.input-date.is-invalid {
   border-color: #dc3545;
 }
.input-date:disabled{
  background-color: #e9ecef;
  opacity: 1;
 }
 .footer {
   width: 100%
 }
</style>
