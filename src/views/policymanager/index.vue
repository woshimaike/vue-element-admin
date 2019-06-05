<template>
  <div>
    <el-form :inline="true" style="margin: 20px 5px 5px;">
      <el-form-item label="策略">
        <el-input v-model="filter.strategy" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="summaryStrategy()">查询</el-button>
        <el-button type="primary" @click="resetFilter()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-table
        :data="policyList"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%">
        <el-table-column
          prop="strategyName"
          label="策略"
          align="center"/>
        <el-table-column
          prop="accountStat"
          label="账号统计"
          align="center"/>
        <el-table-column
          prop="assetStat"
          label="资产统计"
          align="center"/>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="demogoto">详情</el-button>
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
    </el-col></el-row>
  </div>
</template>

<script>

import { summaryStrategy } from '@/api/api'
export default {
  name: 'TemplateManager',
  data() {
    return {
      filter: {
        strategy: ''
      },
      policyList: [],
      pageinfo: {
        pageSizes: [10, 50, 100, 200],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      tableData2: [{
        name: '三角套利',
        accountCount: '10',
        coinAsset: '5.2 ETH, 3.3BTC, 8.8 USDT'
      }
      ]
    }
  },
  created() {
    this.resetFilter()
    this.summaryStrategy()
  },
  methods: {
    resetFilter() {
      this.filter.strategy = ''
    },
    summaryStrategy() {
      summaryStrategy({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        strategyName: this.filter.strategy
      }).then((result) => {
        this.pageinfo.total = result.data.total
        this.policyList = result.data.data
      }).catch((error) => {
        console.log('error occur=' + error)
      })

      this.resetFilter()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    demogoto() {
      window.open('http://localhost:9527/#/policydetail')
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
