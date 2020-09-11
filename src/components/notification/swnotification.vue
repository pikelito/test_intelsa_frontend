<template>
    <div class="panel-notification" v-if="saveAlert.notification.view"> 
        <div style="position:relative">
            <button type="button" @click="clickView()" class="close close-notification" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <i class="material-icons icon-notification" :class="{'text-primary': saveAlert.notification.color!==false, 'text-success': saveAlert.notification.color===false}" v-if="saveAlert.notification.error===false" >check_circle</i>
            <i class="material-icons icon-notification text-warning" v-if="saveAlert.notification.error" >info</i>            
            <h6>{{saveAlert.notification.title}}</h6>
        </div>
    </div>
</template>
<script>
import {  mapState, mapActions } from "vuex"
export default{
    name: 'notification',
    data(){
        return {
            duration: 3000,
        }
    },
    updated() {
        if (this.saveAlert.notification.error) 
        {
            this.duration= 5000
        }       
    },
    computed: {
        ...mapState({
            saveAlert: state => state.globalStore.saveAlert,
        })
    },
    methods: {
        ...mapActions({
            assingGlobalState:  'globalStore/assingGlobalState',
        }),
        clickView()
        {
            this.assingGlobalState(['saveAlert', {
                    notification: {
                        title: '',
                        content: '',
                        error: false,
                        view: false,
                        color: false,
                    },
                    loading: false,
                    capa: false,
                }])
        },
    }
}
</script>
<style>
.panel-notification{    
    border: 1px solid rgba(30,135,219,0.4);
    box-shadow: 1px 3px 4px rgba(30,135,219,0.1);
    z-index:1047;
    right: 30px;
    position: fixed;
    top: 80px;
    background: white;
    padding: 15px 30px 15px 50px;
    border-radius: 5px;
}
.close-notification{
    position: absolute;
    right: -25px;
    top:-15px;
}
.icon-notification.success{
    color:#28a745;
}
.icon-notification.info{
    color:#1e87db;
}
.icon-notification{
    font-size:35px;
    position: absolute;
    left: -40px;
    top:-5px;
}
</style>