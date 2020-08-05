<template>
  <div v-loading="loading" class="container">
    <div class="title">
      <p>
        订单类型: <span>{{ order === 'selfTake' ? '自取': '外送' }} </span>
      </p>
    </div>
    <div class="title">
      <p>
        顾客信息: <span>{{ userInfo(order.userAddressInfo) }} </span>
      </p>
    </div>
    <div class="title">
      商品信息:
      <div v-for="item in order.product" :key="item._id" class="content">
        <p>
          商品图片: <span> {{ item.url }} </span>
        </p>
        <p>
          商品名称: <span>{{ item.name }} </span>
        </p>
        <p>
          商品价格: <span>{{ item.price }} </span>
        </p>
        <p>
          商品描述: <span>{{ item.desc }} </span>
        </p>
        <p>
          商品状态: <span>{{ formatProductStatus(item.status) }} </span>
        </p>
      </div>
    </div>
    <div class="title">
      <p>
        备注: <span> {{ order.remake }} </span>
      </p>
    </div>
    <div class="title">
      <p>
        状态: <span> {{ formatOrderStatus(order.status) }} </span>
      </p>
    </div>
    <div class="title">
      <p>
        下单时间: <span>{{ formatTime(order.create_time) }} </span>
      </p>
      <p v-if="order.mealTime">
        取餐时间: <span v-if="order.mealTime">{{ formatTime(order.mealTime) }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['id'],
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('order', {
      order: state => state.order[0]
    })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.loading = true
      this.$store
        .dispatch('order/view', { o_id: this.id })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    userInfo(value) {
      return Object.values(value)
    },
    formatOrderStatus(value) {
      const obj = {
        complete: '已完成',
        ordered: '用户已下单',
        receiving: '商家已确认'
      }
      return obj[value]
    },
    formatProductStatus(value) {
      const obj = {
        normal: '上架中',
        offShelf: '已下架'
      }
      return obj[value]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 10px;
  padding: 10px;
  .title {
    font-weight: bolder;
    // & > p {
    //   font-weight: normal;
    // }
  }
  .content {
    text-indent: 2em;
    font-weight: bolder;
  }
}
</style>
