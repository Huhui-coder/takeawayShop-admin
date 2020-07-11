<template>
  <div v-loading="loading" class="container">
    <div class="btn-wrap">
      <el-button
        type="success"
        @click="dialogFormVisible = true"
      >新增</el-button>
    </div>
    <div class="table-wrap">
      <el-table
        :data="productList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" width="50" />
        <el-table-column label="图片" width="80" height="80">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="" width="80" height="80">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="desc" label="商品描述" />
        <el-table-column label="商品状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'normal'">上架中</span>
            <span v-else>已下架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template slot-scope="scope">
            <el-button
              type="primary"
              :disabled="scope.row.status === 'normal'"
              size="mini"
              plain
              @click="editStatus(scope.row._id, NORMAL)"
            >上架</el-button>
            <el-button
              type="success"
              :disabled="scope.row.status === 'offShelf'"
              size="mini"
              plain
              @click="editStatus(scope.row._id, OFFSHELF)"
            >下架</el-button>
            <el-button
              type="info"
              size="mini"
              plain
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="warning"
              size="mini"
              plain
              @click="del(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="删除"
      :visible.sync="delDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="actionType"
      :visible.sync="dialogFormVisible"
      center
      @close="dialogClose"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="商品描述"
          prop="desc"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="商品状态"
          prop="status"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.status" placeholder="请选择商品状态">
            <el-option label="上架" value="normal" />
            <el-option label="下架" value="offShelf" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="url" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            name="recfile"
            action="http://127.0.0.1:3000/upload/single"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="submit('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      submitLoading: false,
      dialogFormVisible: false,
      delDialogVisible: false,
      formLabelWidth: '120px',
      actionType: '新增商品',
      NORMAL: 'normal',
      OFFSHELF: 'offShelf',
      current_pId: '',
      // url: "",
      form: {
        price: '',
        name: '',
        desc: '',
        status: '',
        url: ''
      },
      rules: {
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择商品状态', trigger: 'change' }
        ],
        url: [{ required: true, message: '请上传商品图片', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapState('product', {
      productList: state => state.productList
    })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    edit(data) {
      (this.actionType = '编辑商品'), (this.form = Object.assign({}, data))
      this.current_pId = data._id
      this.dialogFormVisible = true
    },
    delConfirm() {
      const { _id, current_pId } = this
      const params = { _id, p_id: current_pId }
      this.$store
        .dispatch('product/del', params)
        .then(res => {
          if (res === 0) {
            this.delDialogVisible = false
            this.fetch()
          }
        })
        .catch(() => {
          this.delDialogVisible = false
        })
    },
    handleClose() {
      this.current_pId = ''
    },
    del(p_id) {
      this.delDialogVisible = true
      this.current_pId = p_id
    },
    editStatus(p_id, status) {
      const params = { _id: this._id, p_id: p_id, status }
      this.$store
        .dispatch('product/statusProduct', params)
        .then(res => {
          if (res === 0) {
            this.fetch()
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.actionType === '新增商品') {
            this.submitLoading = true
            const { form, _id } = this
            form._id = _id
            this.$store
              .dispatch('product/add', form)
              .then(async res => {
                if (res === 0) {
                  this.submitLoading = false
                  this.dialogFormVisible = false
                  await this.fetch()
                }
              })
              .catch(() => {
                this.submitLoading = false
              })
          } else {
            // 编辑商品
            this.submitLoading = true
            const { form, _id, current_pId } = this
            const params = { form, _id, p_id: current_pId }
            this.$store
              .dispatch('product/put', params)
              .then(async res => {
                if (res === 0) {
                  this.submitLoading = false
                  this.dialogFormVisible = false
                  await this.fetch()
                }
              })
              .catch(() => {
                this.submitLoading = false
              })
          }
        } else {
          return false
        }
      })
    },
    dialogClose() {
      this.resetForm('ruleForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status === 'normal') {
        return 'success-row'
      } else if (row.status === 'offShelf') {
        return 'warning-row'
      }
      return ''
    },
    fetch() {
      this.loading = true
      this.$store
        .dispatch('product/fetch', { _id: this._id })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleAvatarSuccess(res, file) {
      // this.url = URL.createObjectURL(file.raw);
      this.form.url = `${this.baseURL}/${res.path.split('/')[1]}`
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
