<template>
  <div  style="height: 100%">  
    <b-container  style="height:100%" class="bv-example-row bv-example-row-flex-cols">
      <b-row  style="height:100%;padding-top:150px" align-v="start"  align-h="center">
        <b-col><router-view></router-view></b-col>
      </b-row> 
    </b-container>      
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "center-layout",
  data () {
    return {
      aside: true
    }
  },
  components: {   
  },
  async created () {    
  },
};
</script>
<style>
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
</style>
