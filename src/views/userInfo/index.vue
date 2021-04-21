<template>
  <div v-loading="loading" class="user-info">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-text="营业中"
          inactive-text="休息中"
        />
      </el-form-item>
      <el-form-item label="新建公告内容">
        <el-input v-model="form.announcement" />
      </el-form-item>
      <el-form-item label="商家店铺名">
        <el-input v-model="form.shopName" />
      </el-form-item>
      <el-form-item label="商家地址">
        <el-input v-model="form.merchantAddress" />
      </el-form-item>
      <el-form-item label="商家电话">
        <el-input v-model="form.merchantPhone" />
      </el-form-item>
      <el-form-item label="起送价">
        <el-input v-model="form.limitPrice" />
      </el-form-item>
      <el-form-item label="外送距离(单位km)">
        <el-input v-model="form.limitDistance" />
      </el-form-item>
      <el-form-item label="商家描述">
        <el-input v-model="form.merchantDesc" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      form: {
        status: false,
        announcement: '',
        merchantAddress: '',
        merchantPhone: '',
        merchantDesc: '',
        shopName: '',
        limitDistance: 0,
        limitPrice: 0
      }
    }
  },
  computed: {
    ...mapState('user', {
      info: state => state.info
    })
  },
  mounted() {
    const obj = { ...this.info }
    delete obj.product
    this.form = Object.assign(this.form, obj)
  },
  methods: {
    async onSave() {
      this.loading = true
      this.$store.dispatch('user/putUserInfo', this.form).then(async(res) => {
        console.log(res)
        await this.fetch()
        this.loading = false
        this.$notify({
          title: '成功',
          message: '商户信息更新成功',
          type: 'success'
        })
      })
    },
    async fetch() {
      this.$store.dispatch('user/getInfo').then((res) => {
        this.form = Object.assign(this.form, this.info)
      })
    }
  }
}
</script>

<style></style>
