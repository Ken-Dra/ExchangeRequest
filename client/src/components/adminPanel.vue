<template>
<div class="root-element">
<div class="main-element" v-for="request in requests">
  <b-card bg-variant="light" text-variant="black">
    <b-card>
     <div class="element-1">
       <div class="element-2"><strong>  Сделка {{request.deal_id}} </strong>(Заявка {{request.id}})  </div>
       <div class="element-2">  Мейкер: {{request.maker_username}}  Рейтинг: {{request.maker_rank}} </div>
       <div class="element-2">  Тейкер: {{request.taker_username}}  Рейтинг: {{request.taker_rank}} </div>
       <div class="element-2"> {{request.created_on.replace(/T/, ' ').slice(0, -7)}} </div>
       <div class="element-2"> Статус: {{request.status}} </div>
     </div>
      <div class="element-1">
        <div class="element-2"> <strong>От Мейкера: </strong></div>
      <div class="element-2"> {{request.current_amount}} {{request.current_currency}} </div>
       <div class="element-2"> {{request.current_type}} </div>
       <div class="element-2"> {{request.current_country}} {{request.current_city}} </div>
       <div class="element-2"> {{request.current_bank}} {{request.current_purpose}} </div>
     </div>
      <div class="element-1">
        <div class="element-2"> <strong> От Тейкера: </strong></div>
      <div class="element-2"> {{request.wanted_amount}} {{request.wanted_currency}}</div>
      <div class="element-2"> {{request.wanted_type}}</div>
      <div class="element-2"> {{request.wanted_country}} {{request.wanted_city}}</div>
      <div class="element-2"> {{request.wanted_bank}} {{request.wanted_purpose}}</div>
    </div>
      <div class="element-2"><strong> Профит: </strong>{{ request.profit }}</div>
    </b-card>
    <b-button @click="$router.push('/chatAdminView')" variant="primary">Чат сделки</b-button>
    <b-button @click="deleteDeal(request)" variant="dark">!!Отменить сделку!!</b-button>
  </b-card>
</div>
</div>
</template>

<script>
import axios from "axios";
import Config from '../../envConfig'

export default {
  name: "adminPanel",
  data() {
    return {
      requests: []
    }
  },
  methods: {
    async getData() {
      this.requests = await this.$store.getters.getDeals
    },
    async deleteDeal(request) {
      try {
        await axios.delete(
          `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/request/delete/${request.deal_id}`)
          .then(await this.$store.dispatch('getDeals'))
          .then(location.reload())

      } catch (e) {
        console.log(e)
        alert("Error!");
      }
    }
  },
  beforeMount(){
    this.getData()
  }
};
</script>

<style scoped>

.main-element{
  display: flex;
  flex-direction: column;
  margin-left: 1%;
  margin-top: 1%;
  justify-content: center;
  }

</style>

