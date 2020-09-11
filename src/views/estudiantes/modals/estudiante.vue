<template>
<div>
    <div class="modalsave" v-if="loading"/>
    <validation-observer v-slot="{ invalid, handleSubmit }">
        <b-form inline class="mb-2" novalidate>
            <b-row>
              <b-col :md="3">
                  <validation-provider rules="required" immediate  v-slot="{ errors }"
                      name="validate.nombres" style="position:relative">
                      <b-form-group
                        id="field.nombres"
                        label="Nombres"
                        label-for="input.nombres"
                      >
                        <b-form-input id="input.nombres" name="estudiante.nombres" v-model="estudiante.nombres"/>
                      </b-form-group>
                      <small  class="text-danger input-errors">{{errors[0]}}</small>
                  </validation-provider>
              </b-col>
              <b-col  :md="3">
                  <validation-provider rules="required" immediate  v-slot="{ errors }"
                      name="validate.apellidos" style="position:relative">
                      <b-form-group
                        id="field.apellidos"
                        label="Apellidos"
                        label-for="input.apellidos"
                      >
                        <b-form-input id="input.apellidos" name="estudiante.apellidos" v-model="estudiante.apellidos"/>
                      </b-form-group>
                      <small  class="text-danger input-errors">{{errors[0]}}</small>
                  </validation-provider>
              </b-col>
              <b-col  :md="3">
                  <validation-provider rules="required" immediate  v-slot="{ errors }"
                      name="validate.identificacion_tipo_id" style="position:relative">
                      <b-form-group
                        id="field.identificacion_tipo_id"
                        label="Tipo Identificación"
                        label-for="input.identificacion_tipo_id"
                      >
                       <c-multiselect
                         id="input.identificacion_tipo_id"
                         name="estudiante.identificacion_tipo_id"
                         v-model="estudiante.identificacion_tipo_id"
                         :options="listas.lista_identificacion"
                         label="name"
                         :allow-empty="false">
                       </c-multiselect>
                      </b-form-group>
                      <small  class="text-danger input-errors">{{errors[0]}}</small>
                  </validation-provider>
              </b-col>
              <b-col  :md="3">
                    <validation-provider rules="required|minLength:6" immediate  v-slot="{ errors }"
                        name="validate.apellidos" style="position:relative">
                        <b-form-group
                          id="field.apellidos"
                          label="Número Identificación"
                          label-for="input.apellidos"
                        >
                        <vue-numeric
                            separator="."
                            class="form-control"
                            :empty-value="0"
                            id="input.identificacion_numero"
                            name="estudiante.identificacion_numero"
                            v-model="estudiante.identificacion_numero"
                            :precision="0">
                          </vue-numeric>
                        </b-form-group>
                        <small  class="text-danger input-errors">{{errors[0]}}</small>
                    </validation-provider>
              </b-col>
              <b-col  :md="3">
                  <validation-provider rules="required" immediate  v-slot="{ errors }"
                      name="validate.genero_id" style="position:relative">
                      <b-form-group
                        id="field.genero_id"
                        label="Genero"
                        label-for="input.genero_id"
                      >
                       <c-multiselect
                         id="input.genero_id"
                         name="estudiante.genero_id"
                         v-model="estudiante.genero_id"
                         :options="listas.lista_genero"
                         label="name"
                         :allow-empty="false">
                       </c-multiselect>
                      </b-form-group>
                      <small  class="text-danger input-errors">{{errors[0]}}</small>
                  </validation-provider>
              </b-col>
              <b-col :md="3">
                  <validation-provider rules="required" immediate  v-slot="{ errors }"
                      name="validate.fecha_nacimiento" style="position:relative">
                      <b-form-group
                        id="field.fecha_nacimiento"
                        label="Fecha de Nacimiento"
                        label-for="input.fecha_nacimiento"
                      >
                      <input
                        class="input-date"
                        id="input.fecha_nacimiento"
                        name="estudiante.fecha_nacimiento"
                        v-model="estudiante.fecha_nacimiento"
                        type="date">
                      </b-form-group>
                      <small  class="text-danger input-errors">{{errors[0]}}</small>
                  </validation-provider>
              </b-col>
              <b-col  :md="3">
                  <validation-provider rules="required" immediate  v-slot="{ errors }"
                      name="validate.carrera_id" style="position:relative">
                      <b-form-group
                        id="field.carrera_id"
                        label="Carrera"
                        label-for="input.carrera_id"
                      >
                       <c-multiselect
                         id="input.carrera_id"
                         name="estudiante.carrera_id"
                         v-model="estudiante.carrera_id"
                         :options="listas.lista_carreras"
                         label="name"
                         :allow-empty="false">
                       </c-multiselect>
                      </b-form-group>
                      <small  class="text-danger input-errors">{{errors[0]}}</small>
                  </validation-provider>
              </b-col>
              <b-col :md="12" class="text-right pt-4" v-if="items.length>0">
                    <b-button @click="saveForm" variant="primary" type="button" :disabled="invalid" size="sm">Editar Estudiante</b-button>
              </b-col>
              <b-col :md="12" class="text-right pt-4" v-else>
                    <b-button @click="resetForm" variant="outline-secondary" type="button" size="sm" class="mr-4">Limpiar</b-button>
                    <b-button @click="saveForm" variant="info" type="button" :disabled="invalid" size="sm">Guardar Estudiante</b-button>
              </b-col>
            </b-row>
          </b-form>
    </validation-observer>
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
    props: {
      items: {
        type: Array,
        default: function()
        {
          return []
        }
      },
    },
    data()
    {
      return {
        estudiante: {
          id: null,
          nombres: null,
          apellidos: null,
          identificacion_tipo_id: 1,
          identifiacion_numero: null,
          genero_id: 1,
          fecha_nacimiento: null,
          carrera_id: 1,
        },
        accion: 'Guardar'
      }
    },
    computed: {
        ...mapState({
            estudiantes: state => state.estudiantesStore.estudiantes,
        })
    },
    created()
    {
      if(this.items.length>0)
      {
            this.accion='Editar'
            Object.assign(this.estudiante,this.items[0])
      }
      else 
      {
          this.accion='Guardar'
      }
    },
    destroyed(){},
    methods: {
        async saveForm() {
          this.loading = true;
          let confirmar = confirm(`¿Está seguro de ${this.accion} este estudiante?`)
          if(confirmar)
          {
              switch(this.accion)
              {
                  case 'Guardar':
                      //guardo datos 
                      await this.saveEstudiante(this.estudiante) 
                      //alerta 
                      this.showAlert('Datos guardados con éxito')
                      //cierro modal
                      this.assingGlobalState(['dataModals', { value: false, title: null,variant: null,actions: null,data: [], }])
                    break;
                  case 'Editar':
                      //guardo datos 
                      await this.updateEstudiante(this.estudiante) 
                      //alerta 
                      this.showAlert('Datos Actualizados con éxito')
                      //cierro modal
                      this.assingGlobalState(['dataModals', { value: false, title: null,variant: null,actions: null,data: [], }])
                    break;
              }                       
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
