<template>
  <v-row login class="fill-height pa-0 flex-column flex-nowrap align-center"
         style="position: fixed; top:0; left:0; right: 0; z-index: 100">
    <v-col>

    </v-col>
    <v-avatar size="170">
      <v-img src="img/logo_circle.png"></v-img>
    </v-avatar>
    <div class="pa-1 tagline text-center">
      <span>КОПНОЕ ПРАВО</span>
      <div style="font-size: smaller">в телефоне каждого славянина</div>
    </div>
    <v-col class="d-flex align-end" style="width: inherit">

      <!--            <v-btn @click="href_login_click" class="mt-4">Войти через ВКонтакте</v-btn>-->
      <v-btn v-if="application.user===null" color="primary" @click="login_click" class="mb-12">Войти через ВКонтакте
      </v-btn>
      <v-btn v-if="application.user==null" color="primary" @click="login2_click" class="mb-12">Войти через ВКонтакте2
      </v-btn>
      <!--      <v-btn v-if="application.user===null && env==='development'" color="primary" @click="snow_click" class="mb-12">snow</v-btn>-->
      <!--            <v-btn @click="vk_login_click" class="mt-4">Войти через ВКонтакте</v-btn>-->
      <!--        <div id="vk_auth" ></div>-->
    </v-col>
    <!--        <div class="text-center mt-2 ml-5 mr-5" style="font-size: smaller; -min-height: 100px; -max-width: 250px;">
     &lt;!&ndash;           <div class="" style="">{{ $t(`quotes[${quoteIndex}].value`) }}</div>
                <div class="font-weight-light mt-1" style="font-size: smaller">
                    <div>{{ $t(`quotes[${quoteIndex}].owner.name`) }}</div>
                    <div>{{ $t(`quotes[${quoteIndex}].owner.position`) }}</div>
                </div>&ndash;&gt;

            </div>-->

  </v-row>
</template>
<script>
import _ from 'lodash'
import Kopnik from "../models/Kopnik"
import {container} from "../bottle/bottle";
import i18n from "../plugins/i18n";
import logger from "./mixin/logger";
import snow from "@/utils/snow";

export default {
  name: "Login",
  mixins: [logger],
  components: {},

  data() {
    return {
      application: container.application,
      quoteIndex: 0
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    snow_click() {
      snow()
    },
    login_click() {
      location.href = container.constants.messenger.loginUrl
    },
    login2_click() {
      container.vkClient.auth()
      // return `https://oauth.vk.com/authorize?scope=${0}&client_id=${process.env.VUE_APP_VK_CLIENT_ID}&redirect_uri=${encodeURIComponent(location.href)}&response_type=token&state=1&revoke=0`
    },
    vk_login_click() {
      VK.Auth.login((...args) => {
        console.log(args)
      }, 2 + 1024 + 65536 + 262144 + 4194304)
    },
    href_login_click() {
      location.href = container.constants.messenger.loginUrl
    },
  },
  async created() {
    // this.request = await this.$root.$options.app.user.loaded()
    setInterval(() => {
      this.quoteIndex = _.random(i18n.messages.ru.length)
    }, 30000)
  },
}
</script>
<style>
.tagline {
  border-radius: 4px;
  line-height: 1;
  background-color: white;
}
</style>
