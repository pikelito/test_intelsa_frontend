<template>
    <div class="container">
      <b-row align-v="center" align-h="center" class="min-height-100vh">
        <b-col md="7" lg="6">
            <div class="card p-4">
                <h1 class="mt-0 mb-4">Iniciar sesión</h1>
                <validation-observer v-slot="{ invalid, handleSubmit }">
                  <b-form @submit.prevent="handleSubmit(onSubmit)" :refForm="refForm" class="hide-label">
                      <validation-provider rules="required" immediate  v-slot="{ errors }"
                          name="validate.nombres" style="position:relative">
                          <b-form-group
                            id="field.nombres"
                            label="Email"
                            label-for="input.nombres"
                          >
                            <b-form-input id="input.nombres" name="user.email" v-model="user.email"/>
                          </b-form-group>
                          <small  class="text-danger input-errors">{{errors[0]}}</small>
                      </validation-provider>
                      <validation-provider rules="required" immediate  v-slot="{ errors }"
                          name="validate.password" style="position:relative">
                          <b-form-group
                            id="field.password"
                            label="Password"
                            label-for="input.password"
                          >
                            <b-form-input id="input.password" type="password" name="user.password" v-model="user.password"/>
                          </b-form-group>
                          <small  class="text-danger input-errors">{{errors[0]}}</small>
                      </validation-provider>
                      <div class="pb-3">
                          <b-form-checkbox v-model="user.rememberMe">Recuerdame</b-form-checkbox>
                      </div>
                      <b-button type="submit" class="btn btn-primary btn-block" :loading="loading">Iniciar sesión</b-button>
                  </b-form>
                </validation-observer> 
            </div>           
        </b-col>
      </b-row>
    </div>
</template>
<script>
import {  mapActions } from "vuex"
export default {                
    data()
    {
        return {
            loading:false,
            user: {
                email:'miguelanmarino@gmail.com',
                password:'password1234',
                rememberMe:false
            },
            refForm: 'form-login'
        }
    },
    methods:{
        ...mapActions({
        	login: 'authStore/login',
        }),
        onSubmit() {
            this.loading = true;
            this.login(this.user)
            .then(response => {
                if(response.data.access_token)
                {
                    this.$router.push('/estudiantes/lista');    
                }
            }).catch(error => { console.log(error)
            }).finally(() => this.loading = false);
        },
    }
}
</script>