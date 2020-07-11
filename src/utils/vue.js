import Vue from 'vue'
import { mapState } from 'vuex'
import dayjs from 'dayjs'

Vue.mixin({
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    ...mapState('user', {
      _id: state => state.merchantId
    })
  },
  methods: {
    formatTime(value, type = 'YYYY-MM-DD HH:mm:ss') {
      return dayjs(value).format(type)
    }
  }
})

export default Vue
