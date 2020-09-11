<template>
  <div  style="height: 100%">
    <div  v-if="cargado">
      <header>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-brand href="#">Estudiantes</b-navbar-brand>   
            <b-navbar-nav class="ml-auto">            
              <b-nav-item-dropdown right>
                <template v-slot:button-content>
                  <em>Usuario</em>
                </template>
                <b-dropdown-item @click="logoutFtn()">Cerrar Sesión</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </header>
      <b-container  style="height:100%" class="bv-example-row bv-example-row-flex-cols">     
        <b-row  class="pt-5" align-v="start"  align-h="center">
          <b-col><router-view></router-view></b-col>
        </b-row> 
      </b-container>  
    </div>
    <div v-else>
      <div class="blocksave gradient-blocksave d-none md-block">  
           <b-row  style="height:70%" align-v="center">
              <b-col></b-col>
              <b-col class="text-center">                          
                <p>Hola, estamos cargando la aplicación...</p>
              </b-col>
              <b-col></b-col>
            </b-row>
      </div>     
    </div> 
    <sw-notification></sw-notification>   
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SwNotification  from '@/components/notification/swnotification.vue'

export default {
  name: "master-layout",
  data () {
    return {
      aside: true,
      cargado: true,
      openMenuMovil: false
    }
  },
  components: {   
    SwNotification
  },
  async created () {
        await this.onInit()
  },
  computed: {
    ...mapState({
      loading: state => state.globalStore.saveConfig.loading,
    })
  },
  methods: {
    ...mapActions({
        logout:     'authStore/logout',
    }),
    async onInit()
    {
    },
    logoutFtn()
    { 
        this.logout() 
    }
  }
};
</script>
<style>
.option-btn {
  cursor:pointer
}
.body-sw{
  padding: 50px;
}
.card-body{
  padding: 10px
}
.title-form{
   border-bottom: 1px solid rgba(85, 85, 85, .6);
   padding-bottom:10px;
   margin:30px 0 10px;
   color:#555
}
.form-control{

    height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
:focus {
    outline: none;
}
.box-effect.linear {
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    transition: all 0.1s ease;
}
.is-invalid{
  background-image: none !important
}
.btn.disabled {
  cursor: no-drop;
}
.col-form-label{
    padding-bottom: 3px !important;
    color: rgb(85, 85, 85);
}
.header-card{
   text-align: center;
   font-weight: 600;
   font-size: 20px;

 }
.row{
  margin-left: 0;
  margin-right: 0;
}
.menu-movil-sidedar .b-sidebar {
  padding-top:0 !important;
}
.blocksave{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0px;
  background: rgba(255,255,255,.7);
  z-index: 1000;
}
.gradient-blocksave{
  background: rgba(247,252,255,1);
  background: -moz-linear-gradient(left, rgba(247,252,255,1) 0%, rgba(218,237,250,1) 100%);
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(247,252,255,1)), color-stop(100%, rgba(218,237,250,1)));
  background: -webkit-linear-gradient(left, rgba(247,252,255,1) 0%, rgba(218,237,250,1) 100%);
  background: -o-linear-gradient(left, rgba(247,252,255,1) 0%, rgba(218,237,250,1) 100%);
  background: -ms-linear-gradient(left, rgba(247,252,255,1) 0%, rgba(218,237,250,1) 100%);
  background: linear-gradient(to right, rgba(247,252,255,1) 0%, rgba(218,237,250,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7fcff', endColorstr='#daedfa', GradientType=1 );
}
.modalsave{
  position: absolute;
  width: 100%;
  height: calc(100% + 65px);
  top: -64px;;
  left: 0px;
  background: rgba(255,255,255,.7);
  z-index: 1046;
  border-radius: 5px;
}
.min-logo-load {
  right:25px;
  top: 54px;
  position: absolute;
  animation: spin-around 3500ms infinite linear;
}
.loading-btn
{
  position: relative;
  color: transparent !important;
}
.loading-btn-active
{
    position: absolute;
    right: 0;
    z-index: 17;
}
.loading-btn:after
{

  border-left-color: #fff !important;
  border-bottom-color: #fff !important;
  animation: spin-around 500ms infinite linear;
  border: 2px solid #888888;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 16px;
  width: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -8px;
  margin-top: -8px;
}
.border-edit{
  border-color: rgba(0,123,255,0.5)
}
.opacity-save{
  opacity: 0.7
}
.btn:focus, .btn.focus{
 box-shadow:inherit
}
.dropdown-item.active, .dropdown-item:active{
  background-color: #563d7c;
}
.text-inactive{
  color: #E66B32 !important
}
.bg-sw-inactive{
  background: #737575 !important
}
.bg-sw-nuevo{
  background: #60438A;
}
.sw-md{
  width: 800px !important
}
.btn-outline-modal{
    color: #8C63C9 !important;
    border-color: #8C63C9 !important;
}
.btn-outline-modal:hover{
    color: white !important;
    background-color: #60438A !important;
}
.popover.b-popover{
  max-width: 800px
}
.custom-checkbox label{
  justify-content: initial !important;
}
.title-form.subtitle-form{
  font-size:18px;
}
.multiselect__tag{
  background-color: #17a2b8 !important;
  border:none !important
}
.multiselect__tag-icon{
  border:none !important;
  font-size: 16px;
  padding: 3px 4px;
}
@-webkit-keyframes spin-around {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  to {
    -webkit-transform: rotate(359deg);
            transform: rotate(359deg); } }

@keyframes spin-around {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  to {
    -webkit-transform: rotate(359deg);
            transform: rotate(359deg); } }
.input-group > .form-control, .input-group > .form-control-plaintext, .input-group > .custom-select, .input-group > .custom-file
{
  flex: 1 1;
}
.input-group
{
  flex-wrap:inherit;
}
.filter-sw-group
{
  margin-top:10px !important;
}
.multiselect__option--highlight
{
  background: #eaeaea !important;
}
@media only screen and (max-width: 992px)
{
  .card-body{
    padding-left:0 !important;
    padding-right: 0 !important;
  }
}
</style>
