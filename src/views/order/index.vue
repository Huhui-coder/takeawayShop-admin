<template>
  <div v-loading="loading" class="container">
    <div class="table-wrap">
      <el-table :data="orderList" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column
          prop="_id"
          label="订单编号"
          width="150"
        />
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户信息">
          <template slot-scope="scope">
            <span>{{ formateUserInfo(scope.row.userAddressInfo) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点餐类型">
          <template slot-scope="scope">
            <span>{{ formateorderTypeInfo(scope.row.orderType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品信息">
          <template slot-scope="scope">
            <span v-for="item in scope.row.product" :key="item._id">
              {{ item.name }} - {{ item.price }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remake" label="备注" />
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'ordered'">已下单</span>
            <span v-else-if="scope.row.status === 'receiving'">已确认</span>
            <span v-else>已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              :disabled="scope.row.status === 'complete'"
              @click="put(scope.row._id)"
            >确认订单</el-button>
            <el-button
              type="warning"
              plain
              size="mini"
              @click="view(scope.row._id)"
            >查看详情</el-button>
            <el-button
              type="warning"
              plain
              size="mini"
              @click="attend(scope.row.userAddressInfo.telNumber)"
            >提醒用户取餐</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="订单状态"
      :visible.sync="putDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定将订单状态设置为已确认吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="putDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="putConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      current_oId: '',
      putDialogVisible: false
    }
  },
  computed: {
    ...mapState('order', {
      orderList: state => state.orderList
    })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    formateorderTypeInfo(data) {
      const mapper = {
        takeAway: '外送',
        selfTake: '自提',
        dine: '堂食'
      }
      return mapper[data]
    },
    formateUserInfo(userAddressInfo) {
      if (userAddressInfo) {
        const {
          userName,
          provinceName,
          cityName,
          countyName,
          detailInfo,
          telNumber
        } = userAddressInfo
        if (provinceName === cityName) { return `${userName}-${telNumber}-${cityName}-${countyName}-${detailInfo}` }
        return `${userName}-${telNumber}-${provinceName}-${cityName}-${countyName}-${detailInfo}`
      }
    },
    handleClose() {
      this.current_oId = ''
    },
    putConfirm() {
      const params = { o_id: this.current_oId, status: 'receiving' }
      this.$store
        .dispatch('order/put', params)
        .then(res => {
          if (res === 0) {
            this.fetch()
            this.loading = false
            this.putDialogVisible = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    put(id) {
      this.current_oId = id
      this.putDialogVisible = true
    },
    fetch() {
      this.loading = true
      this.$store
        .dispatch('order/fetch', { _id: this._id })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    view(id) {
      this.$router.push({ path: `/order/detail/${id}` })
    },
    attend(phone) {
      console.log(phone)
      this.$store
        .dispatch('order/attend', { phone: phone })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style></style>
