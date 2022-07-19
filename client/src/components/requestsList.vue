<!--  <v-expansion-panels>-->
<!--    <v-expansion-panel-->
<!--      v-for="(request, id) in requests"-->
<!--      :key="id"-->
<!--    >-->
<!--      <v-expansion-panel-header class="element-0">-->

<!--        <div class="element-1"> {{ request.current_amount }} {{ request.current_currency }} {{-->
<!--            request.current_type-->
<!--          }}-->
<!--        </div>-->
<!--        <div class="element-1"> {{ request.wanted_amount }} {{ request.wanted_currency }} {{-->
<!--            request.wanted_type-->
<!--          }}-->
<!--        </div>-->

<!--      </v-expansion-panel-header>-->
<!--      <v-expansion-panel-content>-->
<div class="element-1"><strong> {{ request.id }} </strong></div>
<div class="element-2" v-if="isCurrentUser(request.maker_username)"> Создатель заявки: Я</div>
<div class="element-2" v-else><strong>Создатель заявки:</strong> {{ request.maker_username }} Рейтинг:
{{ request.maker_rank }} <br>ID: {{ request.maker_id }}
</div>

<!--        <div class="element-2"><strong> Вы получите: </strong> {{ request.current_amount }} {{-->
<!--            request.current_currency-->
<!--          }} {{ request.current_type }} {{ request.current_country }} {{ request.current_city }} {{-->
<!--            request.current_bank-->
<!--          }} {{ request.current_purpose }}-->
<!--        </div>-->

<!--        &lt;!&ndash;                <div class="element-2"><strong>Вы получите: </strong></div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.current_amount }} {{ request.current_currency }}</div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.current_type }}</div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.current_country }} {{ request.current_city }}</div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.current_bank }} {{ request.current_purpose }}</div>&ndash;&gt;-->
<!--        <div class="element-2"><strong> Вы отдаете: </strong> {{ request.wanted_amount }} {{ request.wanted_currency }}-->
<!--          {{ request.wanted_type }} {{ request.wanted_country }} {{ request.wanted_city }} {{ request.wanted_bank }}-->
<!--          {{ request.wanted_purpose }}-->
<!--        </div>-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.wanted_amount }} {{ request.wanted_currency }}</div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.wanted_type }}</div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.wanted_country }} {{ request.wanted_city }}</div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <div class="element-2"> {{ request.wanted_bank }} {{ request.wanted_purpose }}</div>&ndash;&gt;-->
<!--        <div class="element-2"><strong> Профит: </strong> {{ request.profit }}</div>-->
<!--        <div class="element-2"> {{ request.created_on.replace(/T/, ' ').slice(0, -7) }}</div>-->

<!--        <b-button v-if="isNoMaker(request.maker_id)" @click="send(request)" variant="primary">-->
<!--          Связаться-->
<!--        </b-button>-->
<!--        <b-button v-else-if="isLoggedIn" variant="primary" disabled>Моя заявка</b-button>-->
<!--        <b-button v-else @click="$router.push('/login')" variant="primary">Войти в аккаунт</b-button>-->
<!--      </v-expansion-panel-content>-->
<!--    </v-expansion-panel>-->
<!--  </v-expansion-panels>-->

<!--  <div class="root-element">-->
<!--    <div class="main-element" v-for="request in requests">-->
<!--      <b-card bg-variant="light" text-variant="black">-->
<!--        <b-card>-->
<!--          <div class="element-1">-->
<!--            <div class="element-2"><strong> {{ request.id }} </strong></div>-->
<!--            <div class="element-2" v-if="isCurrentUser(request.maker_username)"> Создатель заявки: Я</div>-->
<!--            <div class="element-2" v-else> Создатель заявки: {{ request.maker_username }} Рейтинг: {{ request.maker_rank }}</div>-->
<!--            <div class="element-2"> {{ request.created_on.replace(/T/, ' ').slice(0, -7) }}</div>-->
<!--          </div>-->
<!--          <div class="element-1">-->
<!--            <div class="element-2"><strong>Вы получите: </strong></div>-->
<!--            <div class="element-2"> {{ request.current_amount }} {{ request.current_currency }}</div>-->
<!--            <div class="element-2"> {{ request.current_type }}</div>-->
<!--            <div class="element-2"> {{ request.current_country }} {{ request.current_city }}</div>-->
<!--            <div class="element-2"> {{ request.current_bank }} {{ request.current_purpose }}</div>-->
<!--          </div>-->
<!--          <div class="element-1">-->
<!--            <div class="element-2"><strong> Вы отдаете: </strong></div>-->
<!--            <div class="element-2"> {{ request.wanted_amount }} {{ request.wanted_currency }}</div>-->
<!--            <div class="element-2"> {{ request.wanted_type }}</div>-->
<!--            <div class="element-2"> {{ request.wanted_country }} {{ request.wanted_city }}</div>-->
<!--            <div class="element-2"> {{ request.wanted_bank }} {{ request.wanted_purpose }}</div>-->
<!--          </div>-->
<!--          <div class="element-2"><strong> Профит: </strong> {{ request.profit }}</div>-->
<!--        </b-card>-->
<!--        <b-button v-if="isNoMaker(request.maker_id)" @click="send(request)" variant="primary">-->
<!--          Связаться-->
<!--        </b-button>-->
<!--        <b-button v-else-if="isLoggedIn" variant="primary" disabled>Моя заявка</b-button>-->
<!--        <b-button v-else @click="$router.push('/login')" variant="primary">Войти в аккаунт</b-button>-->
<!--      </b-card>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <v-container fluid>
      <template>
        <v-row>
          <v-col
            v-for="request in requests"
            :key="request.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <strong>{{ request.id }}</strong>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.created_on.replace(/T/, ' ').slice(0, -7) }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Создатель заявки: </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.maker_username }}
                  </v-list-item-content>

                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Рейтинг</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.maker_rank }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>ID</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.maker_id }}
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-content>Вы отдаете:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.wanted_amount }} {{ request.wanted_currency }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content></v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.wanted_type }}
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-content>Вы получите:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.current_amount }} {{ request.current_currency }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content></v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.current_type }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Профит</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ request.profit }}
                  </v-list-item-content>
                </v-list-item>




                <v-list-item>
                  <v-list-item-content></v-list-item-content>
                  <v-list-item-content>
                    <b-button v-if="isNoMaker(request.maker_id)" @click="send(request)" variant="primary">
                      Связаться
                    </b-button>
                    <b-button v-else-if="isLoggedIn" variant="primary" disabled>Моя заявка</b-button>
                    <b-button v-else @click="$router.push('/login')" variant="primary">Войти в аккаунт</b-button>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
  </v-container>
</template>
<script>
import axios from "axios";
import Config from '../../envConfig'
import request from "./request";

export default {
  name: "requestsList",
  data() {
    return {
      requests: [],
      itemsPerPage: 4,
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    send: async function (request) {
      const data = {
        id: request.id,
        current_amount: request.current_amount,
        wanted_amount: request.wanted_amount,
        current_country: request.current_country || "",
        current_city: request.current_city || "",
        wanted_city: request.wanted_city || "",
        current_bank: request.current_bank || "",
        wanted_bank: request.wanted_bank || "",
        current_purpose: request.current_purpose || "",
        wanted_purpose: request.wanted_purpose || "",
        wanted_country: request.wanted_country || "",
        current_currency: request.current_currency,
        wanted_currency: request.wanted_currency,
        current_type: request.current_type,
        wanted_type: request.wanted_type,
        profit: request.profit,
        maker_id: request.maker_id,
        taker_id: `${JSON.parse(this.$store.getters.getUser)['id']}`,
        maker_rank: request.maker_rank,
        taker_rank: `${JSON.parse(this.$store.getters.getUser)['rank']}`,
        maker_username: request.maker_username,
        taker_username: `${JSON.parse(this.$store.getters.getUser)['username']}`,
      }
      if (this.isDealExist(data)) {
        alert('Сделка уже открыта')
        await this.$router.push('/myDeals')
      } else {
        axios.post(`http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/request/open-deal`, data)
          .then(this.$store.dispatch('getDeals'))
          .then(this.$router.push('/chat'))
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    async getData() {
      try {
        const requests = await axios.get(
          `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/request/getlist`
        );
        this.requests = requests.data;
      } catch (e) {
        alert("Error!");
      }
    },
    // createChat: async function (request) {
    //   const data = {
    //     id: request.id,
    //     maker_id: request.maker_id,
    //     taker_id: `${JSON.parse(this.$store.getters.getUser)['id']}`,
    //     maker_username: request.maker_username,
    //     taker_username: `${JSON.parse(this.$store.getters.getUser)['username']}`,
    //   }
    //   console.log(data)
    //   axios.post(`http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/request/open-deal`, data)
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    isNoMaker: function (makerId) {
      try {
        const currentUserId = JSON.parse(this.$store.getters.getUser)['id'].replace(/-/gi, '')
        makerId = makerId.replace(/-/gi, '')
        return currentUserId !== makerId
      } catch (e) {
        console.log(e)
      }
    },
    isCurrentUser(username) {
      try {
        const currentUsername = JSON.parse(this.$store.getters.getUser)['username']
        return currentUsername === username
      } catch (e) {
        console.log(e)
      }
    },
    isDealExist(data) {
      const deals = this.$store.getters.getDeals
      if (deals) {
        let thisDeal = []
        for (let deal of deals) {
          if (deal.id === data.id && deal.taker_username === data.taker_username) {
            thisDeal.push(deal)
          }
        }
        return thisDeal.length >= 1
      }
    }
  },
  beforeMount() {
    this.getData()
  }
};
</script>

<style scoped>


</style>
