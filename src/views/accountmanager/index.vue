<template>
  <div>
    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-button type="primary" @click="getExchanges()">添加账号</el-button>
    </el-row>

    <el-dialog :visible.sync="showDialog" title="添加" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%">
      <el-form ref="ruleForm" :model="form" :rules="rules1" label-width="120px" style="width: 80%;">
        <el-form-item label="交易所：" prop="templateName">
          <el-col :span="5">
            <el-select v-model="form.valueExchange" placeholder="请选择">
              <el-option
                v-for="item in form.listExchange"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="账号名称：">
          <el-input v-model="form.accountName" type="text"/>
        </el-form-item>
        <el-form-item label="手续费：" prop="fee">
          <el-input v-model="form.fee" type="text"/>
        </el-form-item>
        <!-- <el-form-item label="账号ID：">
          <el-input v-model="form.accountId" type="text"/>
        </el-form-item> -->
        <el-form-item label="API Key：">
          <el-input v-model="form.accessKey" type="text"/>
        </el-form-item>
        <el-form-item label="Secret Key：">
          <el-input v-model="form.secretKey" type="text"/>
        </el-form-item>
        <el-form-item v-if="form.valueExchange.toLowerCase() == 'okex'" label="Passphrase：">
          <el-input v-model="form.passphrase" type="text"/>
        </el-form-item>
        <el-form-item label="交易密码：">
          <el-input v-model="form.tradePwd" type="text"/>
        </el-form-item>
        <!-- <el-form-item label="名称：" prop="name">
          <el-input type="text"/>
        </el-form-item>
        <el-form-item label="模板：" prop="template">
          <el-col :span="5">
            <el-select v-model="form.valueTemplate" placeholder="请选择">
              <el-option
                v-for="item in form.listTemplate"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-col> -->
        <!-- <el-col :span="5"><el-button type="primary" @click="add">添加新模板</el-button></el-col> -->
        <!-- <router-link
            :to="{
              path: '/templatemanager', params:{showDialog: true}
          }">
            <el-button type="primary">添加新模板</el-button>
          </router-link>
        </el-form-item> -->
        <el-form-item label=" ">
          <el-button type="primary" @click="addAccount()">添加</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editVisible" title="编辑">
      <el-form ref="ruleForm" :model="accountEdit[0]" :rules="rules" label-width="120px" style="width: 80%;">
        <el-form-item label="交易所：" prop="templateName">
          <el-col :span="5">
            <el-select :placeholder="accountEdit[0].exchangeName" disabled />
          </el-col>
        </el-form-item>
        <el-form-item label="账号名称：">
          <el-input v-model="accountEdit[0].accountName" type="text"/>
        </el-form-item>
        <el-form-item label="手续费：" prop="fee">
          <el-input v-model="accountEdit[0].fee" type="text"/>
        </el-form-item>
        <!-- <el-form-item label="账号ID：">
          <el-input v-model="accountEdit[0].accountId" type="text"/>
        </el-form-item> -->
        <el-form-item label="API Key：">
          <el-input v-model="accountEdit[0].apikey" type="text"/>
        </el-form-item>
        <el-form-item label="Secret Key：">
          <el-input v-model="accountEdit[0].secret" type="text"/>
        </el-form-item>
        <el-form-item v-if="accountEdit[0].exchangeName.toLowerCase() == 'okex'" label="Passphrase：">
          <el-input v-model="accountEdit[0].passphrase" type="text"/>
        </el-form-item>
        <el-form-item label="交易密码：">
          <el-input v-model="accountEdit[0].tradePwd" type="text"/>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveAccount()">保存</el-button>
          <el-button type="primary" @click="editVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-form :inline="true" style="margin: 20px 5px 5px;">
      <el-form-item label="账号名称">
        <el-input v-model="filter.accountName" />
      </el-form-item>
      <el-form-item label="交易所">
        <el-input v-model="filter.exchangeName" />
      </el-form-item>
      <!-- <el-form-item label="名称">
        <el-input />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker type="daterange" placeholder="选择日期范围" format="yyyy/MM/dd"/>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="queryAccount()">查询</el-button>
        <el-button type="primary" @click="resetFilter()">重置</el-button>

      </el-form-item>
    </el-form>

    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-table
        :data="accountList"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%">
        <el-table-column
          prop="accountName"
          label="账号名称"
          sortable>
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditAccount(scope.row)">{{ scope.row.accountName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="exchangeName"
          label="交易所"/>
        <el-table-column
          prop="creator"
          label="创建人"/>
        <el-table-column
          prop="createTime"
          label="创建时间"/>
        <el-table-column
          prop="lastModifier"
          label="最后修改人"/>
        <el-table-column
          prop="lastModifyTime"
          label="最后修改时间"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button :disabled="scope.row.statusDisabled" :type="scope.row.statusColor" :loading="scope.row.loading" size="small" round @click="handleOperateAccount(scope.row)">{{ scope.row.statusOp }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination
          :current-page="pageinfo.currentPage"
          :page-sizes="pageinfo.pageSizes"
          :page-size="pageinfo.pageSize"
          :total="pageinfo.total"
          style="float:right;"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { operateAccount, saveAccount, getExchangeList, addAccount, queryAccount, deleteAccount } from '@/api/api'
import Util from '@/api/util'
export default {
  name: 'TemplateManager',
  data() {
    var feeValidator1 = (rule, value, callback) => {
      const feeValid = this.form.fee
      if (feeValid <= 0) {
        callback(new Error('手续费必须大于0'))
      } else {
        callback()
      }
    }
    var feeValidator = (rule, value, callback) => {
      const feeValid = this.accountEdit[0].fee
      if (feeValid <= 0) {
        callback(new Error('手续费必须大于0'))
      } else {
        callback()
      }
    }

    return {
      rules1: {
        fee: [
          { required: true, message: '手续费必填', trigger: 'blur' },
          { validator: feeValidator1, trigger: 'blur' }
        ]
      },
      rules: {
        fee: [
          { required: true, message: '手续费必填', trigger: 'blur' },
          { validator: feeValidator, trigger: 'blur' }
        ]
      },
      editVisible: false,
      showDialog: false,
      form: {
        accountName: '',
        fee: '',
        accountId: '',
        accessKey: '',
        secretKey: '',
        passphrase: '',
        listExchange: [],
        valueExchange: '',
        tradePwd: ''
      },
      filter: {
        exchangeName: '',
        accountName: ''
      },
      pageinfo: {
        pageSizes: [10, 50, 100, 200],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      accountList: [],
      accountEdit: [{
        exchangeName: '',
        accountName: '',
        fee: '',
        oldAccountName: '',
        accountId: '',
        apikey: '',
        secret: '',
        passphrase: '',
        tradePwd: ''
      }]
    }
  },
  created() {
    this.resetFilter()
  },
  methods: {
    // handleValide(fee) {
    //   if (this.accountEdit[0].fee === '' || this.accountEdit[0].fee <= 0) {
    //     this.$refs.feeInput.focus()
    //   }
    // },
    handleOperateAccount(row) {
      row.loading = true

      operateAccount(
        {
          account: row.accountName,
          exchange: row.exchangeName,
          opCode: row.status === 2 ? 1 : 2
        }
      ).then((result) => {
        if (result.data.status === 'ok') {
          this.$message({
            message: result.data.data,
            type: 'success'
          })
        } else {
          this.$message({
            message: result.data.errMsg,
            type: 'error'
          })
        }

        this.queryAccount()
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleEditAccount(row) {
      this.editVisible = true
      this.editAccount(row)
      this.resetFilter()
    },
    getExchanges() {
      this.showDialog = true

      getExchangeList().then((result) => {
        this.form.listExchange = result.data
        this.form.valueExchange = result.data[0]
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    addAccount() {
      if (this.form.fee !== '' && this.form.fee > 0) {
        addAccount({
          exchangeName: this.form.valueExchange,
          accountName: this.form.accountName,
          fee: this.form.fee,
          accountId: this.form.accountId,
          apikey: this.form.accessKey,
          secret: this.form.secretKey,
          passphrase: this.form.passphrase,
          tradePwd: this.form.tradePwd
        }).then((result) => {
          console.log(result.data)
          if (result.data) {
            this.resetForm()
            this.showDialog = false

            this.queryAccount()
          }
        }).catch((error) => {
          console.log('error occur=' + error)
        })
      }
    },
    saveAccount() {
      // this.handleValide()

      if (this.accountEdit[0].fee !== '' && this.accountEdit[0].fee > 0) {
        saveAccount({
          exchangeName: this.accountEdit[0].exchangeName,
          accountName: this.accountEdit[0].accountName,
          fee: this.accountEdit[0].fee,
          oldAccountName: this.accountEdit[0].oldAccountName,
          acountId: this.accountEdit[0].accountId,
          apikey: this.accountEdit[0].apikey,
          secret: this.accountEdit[0].secret,
          passphrase: this.accountEdit[0].passphrase,
          tradePwd: this.accountEdit[0].tradePwd
        }).then((result) => {
          console.log(result.data)
          if (result.data) {
            this.editVisible = false
          }
          this.queryAccount()
        }).catch((error) => {
          console.log('error occur=' + error)
        })
      }
    },
    resetForm() {
      this.form.valueExchange = ''
      this.form.accountName = ''
      this.form.fee = ''
      this.form.accountId = ''
      this.form.accessKey = ''
      this.form.secretKey = ''
      this.form.passphrase = ''
      this.form.tradePwd = ''
    },
    resetFilter() {
      this.filter.exchangeName = ''
      this.filter.accountName = ''
      this.queryAccount()
    },
    queryAccount() {
      queryAccount({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        exchange: this.filter.exchangeName,
        account: this.filter.accountName
      }).then((result) => {
        this.pageinfo.total = result.data.total
        this.accountList = result.data.data.map(i => {
          i.createTime = Util.formatDate.format(new Date(i.createTime), 'yyyy-MM-dd hh:mm:ss')
          i.lastModifyTime = Util.formatDate.format(new Date(i.lastModifyTime), 'yyyy-MM-dd hh:mm:ss')
          if (i.status === 0) {
            i.statusDisabled = true
            // i.statusOp = '账号异常'
            i.statusOp = '启用'
            i.statusColor = 'danger'
          }
          if (i.status === 1) {
            i.statusOp = '启用'
            i.statusColor = 'warning'
          }
          if (i.status === 2) {
            i.statusOp = '停止'
            i.statusColor = 'success'
          }
          i.loading = false
          return i
        })
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    editAccount(row) {
      queryAccount({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        exchange: row.exchangeName,
        account: row.accountName
      }).then((result) => {
        this.accountEdit = result.data.data.map(i => {
          i.oldAccountName = i.accountName
          i.createTime = Util.formatDate.format(new Date(i.createTime), 'yyyy-MM-dd hh:mm:ss')
          i.lastModifyTime = Util.formatDate.format(new Date(i.lastModifyTime), 'yyyy-MM-dd hh:mm:ss')
          if (i.status === 0) {
            i.statusDisabled = true
            // i.statusOp = '账号异常'
            i.statusOp = '启动'
            i.statusColor = 'danger'
          }
          if (i.status === 1) {
            i.statusOp = '启用'
            i.statusColor = 'warning'
          }
          if (i.status === 2) {
            i.statusOp = '停止'
            i.statusColor = 'success'
          }
          return i
        })
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleDelete(row) {
      this.$confirm(`确认删除账号 ${row.accountName}吗?`, '提示', {
        type: 'warning'
      }).then(() => {
      //
        deleteAccount({
          exchange: row.exchangeName,
          account: row.accountName
        }).then((result) => {
          console.log(result.data)
          this.queryAccount()
        }).catch((error) => {
          console.log('error occur=' + error)
        })
      //
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageinfo.currentPage = val
    }
  }
}
</script>

<style>
  .edit {
    cursor: pointer;
    color: #20A0FF;
  }
  .line {
    text-align: center;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-danger {
    color: #ff4d51;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
