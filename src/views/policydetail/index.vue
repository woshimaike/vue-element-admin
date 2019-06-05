<template>
  <div>
    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-button type="primary" @click="getTemplates()">添加机器人</el-button>
    </el-row>

    <el-dialog :visible.sync="showDialog" title="添加机器人" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%">
      <el-form ref="ruleForm" label-width="120px" style="width: 80%;">
        <el-form-item label="机器人名称：" prop="robotname">
          <el-input v-model="form.robotname" type="text"/>
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
          </el-col>
          <!-- <el-col :span="5"><el-button type="primary" @click="add">添加新模板</el-button></el-col> -->
          <!--<router-link
            :to="{
              path: '/templatemanager', params:{showDialog: true}
          }">
            <el-button type="primary">添加新模板</el-button>
          </router-link> -->
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="addRobot()">添加</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showEditDialog" title="添加机器人" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%">
      <el-form ref="ruleForm" label-width="120px" style="width: 80%;">
        <el-form-item label="机器人名称：" prop="robotname">
          <el-input v-model="currentRobot.robotName" type="text"/>
        </el-form-item>
        <el-form-item label="模板：" prop="template">
          <el-col :span="5">
            <el-select v-model="currentRobot.templateName">
              <el-option
                v-for="item in form.listTemplate"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveRobot()">保存</el-button>
          <el-button type="primary" @click="showEditDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="showPrecisionDialog" title="设置下单精度" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%" width="80%">
      <el-form ref="ruleForm" label-width="180px" style="width: 80%;">
        <el-form-item v-if="precisions">
          <el-table v-if="precisions.length > 0" :data="precisions" :show-header="true" border style="width:100%">
            <el-table-column prop="exchange" label="交易所" align="center" />

            <el-table-column label="下单精度类型" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.precisionValue" placeholder="请选择" filterable @change="chooseType(scope)">
                  <el-option
                    v-for="item in listPrecisionType"
                    :key="item"
                    :value="item"
                    :label="item"
                  />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="交易对" align="center">
              <template slot-scope="scope">
                <!-- <el-col
                  v-for="p in scope.row.pair"
                  :span="10"
                  :key="p"
                  :value="p"
                  :label="p">
                  {{ p.pairpair1 }}
                  <el-input type="text" placeholder="0"/>
                </el-col>
                <el-col :span="2"><el-input type="text" placeholder="0"/></el-col>
                <el-col :span="1" class="line"/> -->
                <!-- <el-row v-for="p in scope.row.pair" :key="p" :value="p" :label="p">
                  <el-col> {{ p.pairpair1 }}<el-input-number :min="1" :max="10" v-model="p.inputv1" :disabled="p.disabled1" label="精度" size="mini" @change="changeValue"/></el-col>
                  <el-col> {{ p.pairpair2 }}<el-input-number :min="1" :max="10" label="精度" size="mini"/></el-col>
                  <el-col> {{ p.pairpair3 }}<el-input-number :min="1" :max="10" label="精度" size="mini"/></el-col>
                </el-row> -->
                <el-row v-for="p in scope.row.symbol_precesion" :key="p" :value="p" :label="p">
                  <el-col>{{ p.symbol }} <el-input-number :min="1" :max="10" v-model="p.prec" :disabled="scope.row.precisionValue === '自动'" label="精度" size="mini" @change="changeValue(scope)"/></el-col>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
          <el-form-item label=" ">
            <el-button :loading="setPrecLoading" type="primary" @click="handleAddPrec()">设置</el-button>
            <el-button type="primary" @click="handleResetPrec()">取消</el-button>
          </el-form-item>
      </el-form-item></el-form>
    </el-dialog>

    <el-dialog :visible.sync="profitShow" title="盈利" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%" width="80%">
      <el-form ref="ruleForm" label-width="180px" style="width: 80%;">
        <el-form-item v-if="profitThis.length > 0">
          <el-table v-if="profitThis.length > 0" :data="profitThis" :show-header="true" border style="width:100%">
            <el-table-column prop="currencyProfit" label="币种" align="center" />
            <el-table-column prop="profit" label="盈利" align="center" />
          </el-table>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-form :inline="true" style="margin: 20px 5px 5px;">
      <el-form-item label="机器人名称">
        <el-input v-model="filter.robotname" />
      </el-form-item>
      <el-form-item label="模板">
        <el-input v-model="filter.template" />
      </el-form-item>
      <!-- <el-form-item label="名称">
        <el-input />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker type="daterange" placeholder="选择日期范围" format="yyyy/MM/dd"/>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="queryRobot()">查询</el-button>
        <el-button type="primary" @click="resetFilter()">重置</el-button>

      </el-form-item>
    </el-form>

    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-table
        :data="robotList"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%">
        <el-table-column
          prop="robotName"
          sortable
          label="机器人名称">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditRobot(scope.row)"> {{ scope.row.robotName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板"/>
        <el-table-column
          prop="strategyName"
          label="策略"/>
        <el-table-column label="盈利" align="center">
          <tmplate slot-scope="scope">
            <el-button type="text" size="small" @click="handleShowProfit(scope.row)">{{ scope.row.currencyProfit }}</el-button>
          </tmplate>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"/>
        <el-table-column
          prop="createTime"
          label="创建时间"/>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <!--<a class="edit" @click="handleDelete(scope.row)">删除</a> -->
            <el-button type="primary" size="small" @click="handleEditPrecision(scope.row)">下单精度</el-button>
            <el-button type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button :disabled="scope.row.statusDisabled" :type="scope.row.statusColor" :loading="scope.row.loading" size="small" round @click="handleOperateRobot(scope.row)">{{ scope.row.statusOp }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="errMsg" label="错误信息"/>
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

import { setPrecision, queryPrecision, queryTemplate, operateRobot, updateRobot, queryRobot, getTemplateList, addRobot, deleteRobot } from '@/api/api'
import Util from '@/api/util'
export default {
  name: 'TemplateManager',
  data() {
    return {
      showPrecisionDialog: false,
      showEditDialog: false,
      showDialog: false,
      form: {
        robotname: '',
        listTemplate: [],
        valueTemplate: ''
      },
      filter: {
        robotname: '',
        template: ''
      },
      pageinfo: {
        pageSizes: [10, 50, 100, 200],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      robotList: [],
      currentRobot: {
      },
      addElement: {
        valueExchange: '',
        listExchange: []
      },
      templateList: [],
      precisions: [],
      exchanges: [],
      listPrecisionType: ['自动', '设置'],
      setPrecLoading: false,
      profitShow: false,
      profitThis: {}
      //  symbol_precesion: []
    }
  },
  created() {
    this.resetFilter()
    this.queryRobot()
  },
  methods: {
    handleShowProfit(row) {
      this.profitShow = true

      this.profitThis = JSON.parse(row.profit)
    },
    handleOperateRobot(row) {
      row.loading = true

      operateRobot({
        id: row.id,
        robotName: row.robotName,
        templateName: row.templateName,
        opCode: row.status === 2 ? 1 : 2
      }).then((result) => {
        // console.log(result.data)
        if (result.data.status === 'error') {
          this.$message({
            message: result.data.errMsg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }

        this.queryRobot()
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    saveRobot() {
      updateRobot({
        oldRobotName: this.currentRobot.oldRobotName,
        oldTemplateName: this.currentRobot.oldTemplateName,
        robotName: this.currentRobot.robotName,
        templateName: this.currentRobot.templateName
      }).then((result) => {
        this.showEditDialog = false
        this.queryRobot()
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleEditRobot(row) {
      this.showEditDialog = true

      getTemplateList().then((result) => {
        this.form.listTemplate = result.data
      }).catch((error) => {
        console.log('error occur=' + error)
      })

      queryRobot({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        robotName: row.robotName,
        templateName: row.templateName
      }).then((result) => {
        this.currentRobot = result.data.data[0]
        this.currentRobot.oldRobotName = row.robotName
        this.currentRobot.oldTemplateName = row.templateName
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleEditPrecision(row) {
      this.showPrecisionDialog = true

      this.queryTemplate(row)
    },
    queryTemplate(row) {
      queryTemplate({
        templateName: row.templateName
      }).then((result) => {
        this.templateList = result.data.data.map(i => {
          return i
        })[0]
        this.templateList.pairJson = JSON.parse(this.templateList.pairs)
        this.templateList.accountsJson = JSON.parse(this.templateList.accounts)

        this.precisions = []
        for (var i = 0; i < this.templateList.accountsJson.length; i++) {
          if (this.exchanges.indexOf(this.templateList.accountsJson[i].exchange) === -1) {
            this.exchanges.push(this.templateList.accountsJson[i].exchange)
          }
        }

        for (var j = 0; j < this.exchanges.length; j++) {
          var tmp_symbol_precesion = []
          for (var x = 0; x < this.templateList.pairJson.length; x++) {
            // if (this.symbol_precesion.indexOf(this.templateList.pairJson[x].pairpair1) === -1) {
            tmp_symbol_precesion.push({ symbol: this.templateList.pairJson[x].pairpair1, prec: 0 })
            // }
            // if (this.symbol_precesion.indexOf(this.templateList.pairJson[x].pairpair2) === -1) {
            tmp_symbol_precesion.push({ symbol: this.templateList.pairJson[x].pairpair2, prec: 0 })
            // }
            // if (this.symbol_precesion.indexOf(this.templateList.pairJson[x].pairpair3) === -1) {
            tmp_symbol_precesion.push({ symbol: this.templateList.pairJson[x].pairpair3, prec: 0 })
            // }
          }
          this.precisions.push({ exchange: this.exchanges[j], precisionValue: this.listPrecisionType[0], listPrecisionType: this.listPrecisionType, pair: this.templateList.pairJson, symbol_precesion: tmp_symbol_precesion })
        }

        queryPrecision({
          exchanges: this.exchanges
        }).then((result) => {
          for (var e = 0; e < this.precisions.length; e++) {
            for (var f = 0; f < result.data.data.length; f++) {
              if (this.precisions[e].exchange === result.data.data[f].exchangeName) {
                if (result.data.data[f].precisionType === 'auto') {
                  this.precisions[e].precisionValue = '自动'
                } else if (result.data.data[f].precisionType === 'custom') {
                  this.precisions[e].precisionValue = '设置'

                  for (var h = 0; h < this.precisions[e].symbol_precesion.length; h++) {
                    if (this.precisions[e].symbol_precesion[h].symbol === result.data.data[f].pair) {
                      this.precisions[e].symbol_precesion.splice(h, 1)
                      this.precisions[e].symbol_precesion.push({ symbol: result.data.data[f].pair, prec: result.data.data[f].amountPrecision })
                    }
                  }
                }
              }
            }
          }
        })
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    getTemplates() {
      this.showDialog = true

      getTemplateList().then((result) => {
        this.form.listTemplate = result.data
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    addRobot() {
      addRobot({
        robotName: this.form.robotname,
        templateName: this.form.valueTemplate
      }).then((result) => {
        console.log(result.data)
        if (result.data) {
          this.resetForm()
          this.showDialog = false

          this.queryRobot()
        }
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleAddPrec() {
      this.setPrecLoading = true

      var req = []
      for (var e = 0; e < this.precisions.length; e++) {
        var type = 'auto'
        if (this.precisions[e].precisionValue === '设置') {
          type = 'custom'
        }

        for (var h = 0; h < this.precisions[e].symbol_precesion.length; h++) {
          req.push({ exchangeName: this.precisions[e].exchange, precisionType: type, pair: this.precisions[e].symbol_precesion[h].symbol, amountPrecision: this.precisions[e].symbol_precesion[h].prec })
        }
      }
      setPrecision({
        esps: req
      }).then((result) => {
        if (result.data.status === 'error') {
          this.$message({
            message: result.data.errMsg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }

        this.setPrecLoading = false
        this.showPrecisionDialog = false
      })
    },
    resetForm() {
      this.form.robotname = ''
      this.form.valueTemplate = ''
    },
    handleResetPrec() {
      this.showPrecisionDialog = false
    },
    resetFilter() {
      this.filter.robotname = ''
      this.filter.template = ''
      this.queryRobot()
    },
    queryRobot() {
      queryRobot({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        robotName: this.filter.robotname,
        templateName: this.filter.template
      }).then((result) => {
        this.pageinfo.total = result.data.total
        this.robotList = result.data.data.map(i => {
          i.createTime = Util.formatDate.format(new Date(i.createTime), 'yyyy-MM-dd hh:mm:ss')
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
    handleDelete(row) {
      console.log(row)

      this.$confirm(`确认删除机器人 ${row.robotName}吗?`, '提示', {
        type: 'warning'
      }).then(() => {
        //
        deleteRobot({
          robotName: row.robotName,
          templateName: row.templateName
        }).then((result) => {
          console.log(result.data)

          this.queryRobot()
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
    },
    chooseType(scope) {
      // console.log(scope.row.precisionValue)
    },
    changeValue(value) {
      console.log(value)
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
