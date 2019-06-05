<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-table
          v-if="exchangeWarnTable.length > 0"
          :data="exchangeWarnTable"
          :row-class-name="tableWarn"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="交易所"/>
          <el-table-column
            prop="lantency"
            label="延迟(ms)"/>
          <el-table-column
            prop="ts"
            label="采样时间(s)"/>
        </el-table>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-danger"/></el-col>
    </el-row>

    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-col :span="8" :xs="24">
        <el-table
          v-if="exchangeNormalTable.length > 0"
          :data="exchangeNormalTable"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="交易所"/>
          <el-table-column
            prop="lantency"
            label="延迟(ms)"/>
          <el-table-column
            prop="ts"
            label="采样时间(s)"/>
        </el-table>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-table
          :data="tableData3"
          hidden
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="交易所"/>
          <el-table-column
            prop="latancy"
            label="延迟(ms)"/>
      </el-table></el-col>
      <el-col :span="8" :xs="24">
        <el-table
          :data="tableData3"
          hidden
          border
          style="width: 100%">
          <el-table-column
            prop="exchange"
            label="交易所"/>
          <el-table-column
            prop="latancy"
            label="延迟"/>
      </el-table></el-col>
    </el-row>

    <el-form :inline="true" style="margin: 20px 5px 5px;">
      <el-form-item label="交易所">
        <el-input v-model="filter.exchangeName" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="filter.accountName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryAccount()">查询</el-button>
        <el-button type="primary" @click="resetFilter()">重置</el-button>

      </el-form-item>
    </el-form>

    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-table
        :data="accountList"
        border
        style="width: 100%">
        <el-table-column
          prop="exchangeName"
          label="交易所"/>
        <el-table-column
          prop="accountName"
          label="账号"/>
        <el-table-column
          prop="templateName"
          label="模板"/>
        <el-table-column
          prop="bootTime"
          label="策略起始时间"/>
        <el-table-column
          prop="balanceBegin"
          label="期初"/>
        <el-table-column
          prop="balanceEnd"
          label="期末"/>
        <el-table-column
          prop="profitRatio"
          label="利润比"/>
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

import { queryAccount } from '@/api/api'
export default {
  name: 'TemplateManager',
  data() {
    return {
      websock: null,
      exchangeWarnTable: [],
      exchangeNormalTable: [],
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
      tableData3: [{
        exchange: 'OKEX',
        latancy: '300 ms'
      },
      {
        exchange: '币安',
        latancy: '300 ms'
      },
      {
        exchange: '火币',
        latancy: '300 ms'
      },
      {
        exchange: 'EbuyCoin',
        latancy: '300 ms'
      }
      ]
    }
  },
  created() {
    this.initWebSocket()
    this.resetFilter()
    this.queryAccount()
  },
  destroyed() {
    this.websocketclose()
  },
  methods: {
    resetFilter() {
      this.filter.exchangeName = ''
      this.filter.accountName = ''
    },
    queryAccount() {
      queryAccount({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        exchange: this.filter.exchangeName,
        account: this.filter.accountName
      }).then((result) => {
        this.pageinfo.total = result.data.total
        this.accountList = result.data.data
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
    initWebSocket() {
      const wsuri = 'ws://127.0.0.1:8080/websocket/1'
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      console.log('WebSocket连接成功')
    },
    websocketonerror(e) { // 错误
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage(result) {
      console.log(result.data)
      // this.exchangeWarnTable = result.data.replace('\"', '\'').split(' ')
      // this.exchangeWarnTableTmp = result.data.replace(/\"/g, "'").split(' ')
      this.exchangeWarnTableTmp = result.data.split(' ')
      this.exchangeWarnTable = []
      this.exchangeNormalTable = []
      for (let i = 0; i < this.exchangeWarnTableTmp.length; i++) {
        var json = JSON.parse(this.exchangeWarnTableTmp[i])

        var h = new Date(json.ts).getHours()
        if (h >= 0 && h <= 9) {
          h = '0' + h
        }
        var m = new Date(json.ts).getMinutes()
        if (m >= 0 && m <= 9) {
          m = '0' + m
        }
        var s = new Date(json.ts).getSeconds()
        if (s >= 0 && s <= 9) {
          s = '0' + s
        }

        json.ts = h + ':' + m + ':' + s

        if (json.lantency > 10 * 1000) {
          json.lantency = '超时'
          this.exchangeWarnTable.push(json)
        } else {
          this.exchangeNormalTable.push(json)
        }
      }
    },
    websocketsend(agentData) { // 数据发送
      this.websock.send(agentData)
    },
    websocketclose(e) { // 关闭
      // console.log('connection closed (' + e.code + ')')
      console.log('connection closed ')
    },
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageinfo.currentPage = val
    },
    tableWarn({ row, rowIndex }) {
      // if (row.lantency === '超时' || row.lantency > 10 * 1000) {
      return 'timeout-row'
      // }
    }
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     // if (rowIndex === 0 || rowIndex === 1 || rowIndex === 2 || rowIndex === 3) {
    //     if (rowIndex === 0) {
    //     // if (row.exchange === 'OKEX') {
    //       return {
    //         rowspan: 4,
    //         colspan: 1
    //       }
    //     } else {
    //       return {
    //         rowspan: 1,
    //         colspan: 1
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style>
  .el-table .timeout-row {
    color: red;
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
