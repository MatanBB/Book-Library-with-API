import { eventBus } from '../services/event-bus.service.js'
export default {
  template: `
      <section class="send-msg">
        <h3>Hey im nick</h3>
      </section>
  `,
  created(){
    eventBus.on('user-msg',this.showMsg)
  },
  methods:{
    showMsg(payload){
      
    }
  }
}