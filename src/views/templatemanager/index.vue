<!--suppress ALL -->
<template>
  <div>
    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-button type="primary" @click="handleAddTemplate()">添加模板</el-button>
    </el-row>

    <el-dialog :visible.sync="showDialog" title="添加新模板" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%">
      <el-form ref="ruleForm" label-width="130px" style="width: 90%;">
        <el-form-item prop="templateName" label="模板名称：">
          <el-input v-model="addElement.templateName" type="text"/>
        </el-form-item>
        <el-form-item label="策略：">
          <el-select v-model="addElement.valueStrategy" filterable placeholder="请选择">
            <el-option
              v-for="item in addElement.listStrategy"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="templateName" label="期望收益：">
          <el-input v-model="addElement.expectProfit" type="text"/>
        </el-form-item>
        <!-- <el-form-item prop="templateName" label="最大交易量：">
          <el-input v-model="addElement.maxBuyAmount" type="text"/>
        </el-form-item> -->
        <el-form-item prop="templateName" label="交易数量百分比：">
          <el-input v-model="addElement.transAmountRatio" type="text"/>
        </el-form-item>
        <el-form-item label="交易对：" prop="coinpair">
          <el-col :span="3"><el-input v-model="addElement.baseCoin1" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="3"><el-input v-model="addElement.fixCoin1" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <el-col :span="3"><el-input v-model="addElement.baseCoin2" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="3"><el-input v-model="addElement.fixCoin2" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <el-col :span="3"><el-input v-model="addElement.baseCoin3" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="3"><el-input v-model="addElement.fixCoin3" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1"><el-button type="primary" @click="addPairPair()">+</el-button></el-col>
        </el-form-item>
        <el-form-item v-if="addElement.pairpair.length > 0">
          <el-table :data="addElement.pairpair" :show-header="false" border style="width:100%">
            <el-table-column prop="pairpair1" label="pairpair1" align="center" />
            <el-table-column prop="pairpair2" label="pairpair2" align="center" />
            <el-table-column prop="pairpair3" label="pairpair3" align="center" />
            <el-table-column align="center"> <template slot-scope="scope">
              <el-button type="primary" @click="deletePairPair(scope.$index)">删除</el-button>
            </template></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="交易所：" prop="coinpair">
          <el-col :span="5">
            <el-select v-model="addElement.valueExchange" placeholder="交易所" filterable @change="getExchangeValue">
              <el-option
                v-for="item in addElement.listExchange"
                :key="item"
                :value="item"
                :label="item"
              />
          </el-select></el-col>

          <el-col :span="1" class="line">&nbsp</el-col>
          <el-col :span="5">
            <el-select v-model="addElement.valueAccount1" placeholder="账号1" filterable @change="chooseAccount1">
              <el-option
                v-for="item in addElement.listAccount1"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <!--
          <el-col :span="5">
            <el-select v-model="addElement.valueAccount2" placeholder="账号2" filterable @change="chooseAccount2">
              <el-option
                v-for="item in addElement.listAccount2"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <el-col :span="5">
            <el-select v-model="addElement.valueAccount3" placeholder="账号3" filterable @change="chooseAccount3">
              <el-option
                v-for="item in addElement.listAccount3"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col> -->
          <el-col :span="1"><el-button type="primary" @click="addPair()">+</el-button></el-col>
        </el-form-item>
        <!-- <el-form-item label="交易对：" prop="coinpair">
          <el-col :span="6">
            <el-cascader
              :options="cascaderOptions"
              v-model="cascaderOption"
              expand-trigger="hover"
              filterable
              @change="cascaderhandleChange"
            />
          </el-col>
          <el-col :span="1"/>
          <el-col :span="5"><el-input v-model="addElement.transCoinInput" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="5"><el-input v-model="addElement.fixCoinInput" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1"><el-button type="primary" @click="addPair()">+</el-button></el-col>
        </el-form-item> -->
        <el-form-item v-if="addElement.pair.length > 0">
          <el-table :data="addElement.pair" :show-header="false" border style="width:100%">
            <el-table-column prop="exchange" label="exchange" align="center" />
            <el-table-column prop="account1" label="account1" align="center" />
            <el-table-column align="center"> <template slot-scope="scope">
              <el-button type="primary" @click="deletePair(scope.$index)">删除</el-button>
            </template></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="平衡币种：">
          <el-select v-model="addElement.withdrawalTypeStr" filterable style="width:150px" @change="chooseTypeOfAdd">
            <el-option
              v-for="item in listBanlanceType"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-table v-if="addElement.set.addresslist.length > 0" :data="addElement.set.addresslist" :show-header="false" border style="width:100%">
            <el-table-column prop="exchangeName" label="exchangeName" align="center" />
            <el-table-column prop="currencySymbol" label="currencySymbol" align="center" />
            <el-table-column align="center"> <template slot-scope="scope">
              <el-input v-model="scope.row.withdrawalAddress" type="primary"/>
            </template></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="addTemplate()">添加</el-button>
          <el-button type="primary" plain @click="reset()" >重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editVisible" title="编辑" size="tiny" class="add-role-dialog-wrapper" custom-class="add-role-dialog center-dialog" top="10%">
      <el-form ref="ruleForm" label-width="130px" style="width: 90%;">
        <el-form-item prop="templateName" label="模板名称：">
          <el-input v-model="editableTemplate.templateName" type="text"/>
        </el-form-item>
        <el-form-item label="策略：">
          <el-select v-model="editableTemplate.strategyName" filterable>
            <el-option
              v-for="item in addElement.listStrategy"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="templateName" label="期望收益：">
          <el-input v-model="editableTemplate.expectProfit" type="text"/>
        </el-form-item>
        <!-- <el-form-item prop="templateName" label="最大买入量：">
          <el-input v-model="editableTemplate.maxBuyAmount" type="text"/>
        </el-form-item> -->
        <el-form-item prop="templateName" label="交易数量百分比：">
          <el-input v-model="editableTemplate.transAmountRatio" type="text"/>
        </el-form-item>
        <el-form-item label="交易对：" prop="coinpair">
          <el-col :span="3"><el-input v-model="editableTemplate.baseCoin1" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="3"><el-input v-model="editableTemplate.fixCoin1" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <el-col :span="3"><el-input v-model="editableTemplate.baseCoin2" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="3"><el-input v-model="editableTemplate.fixCoin2" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <el-col :span="3"><el-input v-model="editableTemplate.baseCoin3" type="text" placeholder="基础币种"/></el-col>
          <el-col :span="1" class="line">/</el-col>
          <el-col :span="3"><el-input v-model="editableTemplate.fixCoin3" type="text" placeholder="定价币种"/></el-col>
          <el-col :span="1"><el-button type="primary" @click="addPairJson()">+</el-button></el-col>
        </el-form-item>
        <el-form-item v-if="editableTemplate.pairJson">
          <el-table v-if="editableTemplate.pairJson.length > 0" :data="editableTemplate.pairJson" :show-header="false" border style="width:100%">
            <el-table-column prop="pairpair1" label="pairpair1" align="center" />
            <el-table-column prop="pairpair2" label="pairpair2" align="center" />
            <el-table-column prop="pairpair3" label="pairpair3" align="center" />
            <el-table-column align="center"> <template slot-scope="scope">
              <el-button type="primary" @click="deletePairJson(scope.$index)">删除</el-button>
            </template></el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="交易所：" prop="coinpair">
          <el-col :span="5">
            <el-select v-model="addElement.valueExchange" placeholder="交易所" filterable @change="getExchangeValue">
              <el-option
                v-for="item in addElement.listExchange"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col>
          <el-col :span="1" class="line">&nbsp</el-col>
          <el-col :span="5">
            <el-select v-model="addElement.valueAccount1" placeholder="账号1" filterable @change="chooseAccount1">
              <el-option
                v-for="item in addElement.listAccount1"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <!--
          <el-col :span="5">
            <el-select v-model="addElement.valueAccount2" placeholder="账号2" filterable @change="chooseAccount2">
              <el-option
                v-for="item in addElement.listAccount2"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col>
          <el-col :span="1" class="line">&nbsp</el-col>

          <el-col :span="5">
            <el-select v-model="addElement.valueAccount3" placeholder="账号3" filterable @change="chooseAccount3">
              <el-option
                v-for="item in addElement.listAccount3"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-col> -->
          <el-col :span="1"><el-button type="primary" @click="addAccountsJson()">+</el-button></el-col>
        </el-form-item>
        <el-form-item v-if="editableTemplate.accountsJson">
          <el-table v-if="editableTemplate.accountsJson.length > 0" :data="editableTemplate.accountsJson" :show-header="false" border style="width:100%">
            <el-table-column prop="exchange" label="exchange" align="center" />
            <el-table-column prop="account1" label="account1" align="center" />
            <el-table-column align="center"> <template slot-scope="scope">
              <el-button type="primary" @click="deleteAccountsJson(scope.$index)">删除</el-button>
            </template></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="平衡币种：">
          <el-select v-model="editableTemplate.withdrawalTypeStr" filterable style="width:150px" @change="chooseType">
            <el-option
              v-for="item in listBanlanceType"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-table v-if="set.addresslist.length > 0" :data="set.addresslist" :show-header="false" border style="width:100%">
            <el-table-column prop="exchangeName" label="exchangeName" align="center" />
            <el-table-column prop="currencySymbol" label="currencySymbol" align="center" />
            <el-table-column align="center"> <template slot-scope="scope">
              <el-input v-model="scope.row.withdrawalAddress" type="primary"/>
            </template></el-table-column>
          </el-table>
        </el-form-item>
        <!-- <el-form-item v-if="precisions">
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
            </el-table-column> -->

        <el-form-item label=" ">
          <el-button type="primary" @click="saveTemplate()">保存</el-button>
          <el-button type="primary" plain @click="editVisible = false" >取消</el-button>
      </el-form-item></el-form>
    </el-dialog>

    <el-form :inline="true" style="margin: 20px 5px 5px;">
      <el-form-item label="模板名称">
        <el-input v-model="filter.templateName" />
      </el-form-item>
      <el-form-item label="策略">
        <el-input v-model="filter.templateStrategy" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryTemplate()">查询</el-button>
        <el-button type="primary" @click="resetFilter()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20" style="margin: 20px 5px 5px;">
      <el-table
        :data="templateList"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%">
        <el-table-column
          prop="templateName"
          sortable
          label="模板名称">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditTemplate(scope.row)">{{ scope.row.templateName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="strategyName"
          label="策略"/>
        <el-table-column
          prop="createTime"
          sortable
          label="创建时间"/>
        <el-table-column
          prop="creator"
          label="创建人"/>
        <el-table-column
          prop="lastModifyTime"
          sortable
          label="最后修改时间"/>
        <el-table-column
          prop="lastModifier"
          label="最后修改人"/>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="deleteTemplate(scope.row)">删除</el-button>
            <el-button :disabled="scope.row.statusDisabled" :type="scope.row.statusColor" :loading="scope.row.loading" size="small" round @click="handleOperateTemplate(scope.row)">{{ scope.row.statusOp }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination
          :current-page="pageinfo.currentPage"
          :page-sizes="pageinfo.pageSizes"
          :page-size="pageinfo.pageSize"
          :total="pageinfo.total"
          layout="total, sizes, prev, pager, next, jumper"
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryWithdrawAddress, operateTemplate, queryAllAccount, getExchangeList, updateTemplate, addTemplate, queryTemplate, deleteTemplate, queryStrategy } from '@/api/api'
import Util from '@/api/util'
export default {
  name: 'TemplateManager',
  data() {
    return {
      cascaderOptions: [],
      cascaderOption: [],
      editableTemplate2: {
        valueStrategy: '',
        listStrategy: [],
        valueExchange: '',
        listExchange: [],
        valueAccount: '',
        listAccount: []
      },
      editableTemplate: {
        tmpSortStrArr: [],
        pairJson: []
      },
      editVisible: false,
      addElement: {
        templateName: '',
        name: '',
        transCoinInput: '',
        fixCoinInput: '',
        pairpair: [],
        baseCoin1: '',
        fixCoin1: '',
        baseCoin2: '',
        fixCoin2: '',
        baseCoin3: '',
        fixCoin3: '',
        pair: [],
        valueStrategy: '',
        listStrategy: [],
        valueExchange: '',
        listExchange: [],
        listAccount: [],
        valueAccount1: '',
        listAccount1: [],
        valueAccount2: '',
        listAccount2: [],
        valueAccount3: '',
        listAccount3: [],
        withdrawalTypeStr: '设置',
        set: {
          exchange: '',
          account: '',
          exchangeAccountList: [],
          addresslist: [],
          pairlist: []
        }

      },
      filter: {
        templateName: '',
        templateStrategy: ''
      },
      showDialog: false,
      value: '',
      pageinfo: {
        pageSizes: [10, 50, 100, 200],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      templateList: [],
      tableData3: [{
        exchange: 'OKEX',
        latancy: '300 ms'
      }
      ],
      tmpSortStrArr: [],
      listBanlanceType: ['自动', '设置'],
      set: {
        exchange: '',
        account: '',
        exchangeAccountList: [],
        addresslist: [],
        pairlist: []
      }
    }
  },
  created() {
    this.queryTemplate()
  },
  methods: {
    // chooseType(scope) {
    chooseTypeOfAdd() {
      this.addElement.set.addresslist = []
      if (this.addElement.withdrawalTypeStr === '自动') {
        // queryWithdrawAddress({
        //   templateId: this.editableTemplate.id
        // }).then((result) => {
        // 统计交易所
        this.addElement.set.exchangeAccountList = []
        for (var i = 0; i < this.addElement.pair.length; i++) {
          this.addElement.set.exchangeAccountList.push({
            exchange: this.addElement.pair[i].exchange,
            account: this.addElement.pair[i].account1
          })
        }

        // 统计币种
        this.addElement.set.pairlist = []
        for (var j = 0; j < this.addElement.pairpair.length; j++) {
          var ss = this.addElement.pairpair[j].pairpair1.split('/')
          if (!this.addElement.set.pairlist.includes(ss[0])) {
            this.addElement.set.pairlist.push(ss[0])
          }
          if (!this.addElement.set.pairlist.includes(ss[1])) {
            this.addElement.set.pairlist.push(ss[1])
          }

          ss = this.addElement.pairpair[j].pairpair2.split('/')
          if (!this.addElement.set.pairlist.includes(ss[0])) {
            this.addElement.set.pairlist.push(ss[0])
          }
          if (!this.addElement.set.pairlist.includes(ss[1])) {
            this.addElement.set.pairlist.push(ss[1])
          }

          ss = this.addElement.pairpair[j].pairpair3.split('/')
          if (!this.addElement.set.pairlist.includes(ss[0])) {
            this.addElement.set.pairlist.push(ss[0])
          }
          if (!this.addElement.set.pairlist.includes(ss[1])) {
            this.addElement.set.pairlist.push(ss[1])
          }
        }

        for (var k = 0; k < this.addElement.set.exchangeAccountList.length; k++) {
          for (var l = 0; l < this.addElement.set.pairlist.length; l++) {
            this.addElement.set.addresslist.push({
              // templateId: this.editableTemplate.id,
              exchangeName: this.addElement.set.exchangeAccountList[k].exchange,
              accountName: this.addElement.set.exchangeAccountList[k].account,
              currencySymbol: this.addElement.set.pairlist[l],
              withdrawalAddress: ''
            })
          }
        }
        // console.log('xxx')
        // console.log(this.addElement.set.addresslist)

        // DB中查询结果
        // var queryResult = result.data.data === null ? [] : result.data.data

        // for (var m = 0; m < this.set.addresslist.length; m++) {
        //   for (var n = 0; n < queryResult.length; n++) {
        //     if (this.set.addresslist[m].exchangeName === queryResult[n].exchangeName && this.set.addresslist[m].currencySymbol === queryResult[n].currencySymbol) {
        //       this.set.addresslist.splice(m, 1, {
        //         templateId: this.editableTemplate.id,
        //         exchangeName: queryResult[n].exchangeName,
        //         accountName: this.set.addresslist[m].accountName,
        //         currencySymbol: queryResult[n].currencySymbol,
        //         withdrawalAddress: queryResult[n].withdrawalAddress
        //       })
        //     }
        //   }
        // }

        // }).catch((result) => {
        //   console.error("error=" + result)
        // })
      }
    },
    chooseType() {
      this.set.addresslist = []
      if (this.editableTemplate.withdrawalTypeStr === '自动') {
        queryWithdrawAddress({
          templateId: this.editableTemplate.id
        }).then((result) => {
          // 统计交易所
          this.set.exchangeAccountList = []
          for (var i = 0; i < this.editableTemplate.accountsJson.length; i++) {
            this.set.exchangeAccountList.push({
              exchange: this.editableTemplate.accountsJson[i].exchange,
              account: this.editableTemplate.accountsJson[i].account1
            })
          }

          // 统计币种
          this.set.pairlist = []
          for (var j = 0; j < this.editableTemplate.pairJson.length; j++) {
            var ss = this.editableTemplate.pairJson[j].pairpair1.split('/')
            if (!this.set.pairlist.includes(ss[0])) {
              this.set.pairlist.push(ss[0])
            }
            if (!this.set.pairlist.includes(ss[1])) {
              this.set.pairlist.push(ss[1])
            }

            ss = this.editableTemplate.pairJson[j].pairpair2.split('/')
            if (!this.set.pairlist.includes(ss[0])) {
              this.set.pairlist.push(ss[0])
            }
            if (!this.set.pairlist.includes(ss[1])) {
              this.set.pairlist.push(ss[1])
            }

            ss = this.editableTemplate.pairJson[j].pairpair3.split('/')
            if (!this.set.pairlist.includes(ss[0])) {
              this.set.pairlist.push(ss[0])
            }
            if (!this.set.pairlist.includes(ss[1])) {
              this.set.pairlist.push(ss[1])
            }
          }

          //
          for (var k = 0; k < this.set.exchangeAccountList.length; k++) {
            for (var l = 0; l < this.set.pairlist.length; l++) {
              this.set.addresslist.push({
                templateId: this.editableTemplate.id,
                exchangeName: this.set.exchangeAccountList[k].exchange,
                accountName: this.set.exchangeAccountList[k].account,
                currencySymbol: this.set.pairlist[l],
                withdrawalAddress: ''
              })
            }
          }

          // DB中查询结果
          var queryResult = result.data.data === null ? [] : result.data.data

          for (var m = 0; m < this.set.addresslist.length; m++) {
            for (var n = 0; n < queryResult.length; n++) {
              if (this.set.addresslist[m].exchangeName === queryResult[n].exchangeName && this.set.addresslist[m].currencySymbol === queryResult[n].currencySymbol) {
                this.set.addresslist.splice(m, 1, {
                  templateId: this.editableTemplate.id,
                  exchangeName: queryResult[n].exchangeName,
                  accountName: this.set.addresslist[m].accountName,
                  currencySymbol: queryResult[n].currencySymbol,
                  withdrawalAddress: queryResult[n].withdrawalAddress
                })
              }
            }
          }
        }).catch((result) => {
          console.error('error=' + result)
        })
      }
    },
    chooseTypeExchange(scope) {
      this.set.account = []
      this.set.exchangeAccountList = []

      for (var i = 0; i < this.editableTemplate.accountsJson.length; i++) {
        if (this.editableTemplate.accountsJson[i].exchange === scope) {
          this.set.exchangeAccountList.push(this.editableTemplate.accountsJson[i].account1)
        }
      }
    },
    chooseTypeAccount(scope) {
    },
    cascaderhandleChange() {
      this.addElement.valueAccount = ''
      var tmp = this.cascaderOption[0]
      queryAllAccount({
        exchange: this.cascaderOption[0]
      }).then((result) => {
        result.data.map(i => {
          this.cascaderOptions.forEach(function(item) {
            if (item.value === tmp) {
              if (item.children == undefined) {
                item.children = []
              }
              item.children.push({ value: i, label: i })
            }
          })
          return i
        })
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleOperateTemplate(row) {
      row.loading = true

      operateTemplate({
        templateName: row.templateName,
        templateStrategy: row.strategyName,
        opCode: row.status === 1 ? 0 : 1
      }).then((result) => {
        if (result.data.status === 'ok') {
          this.$message({
            message: result.data.data,
            type: 'success'
          })
        } else {
          this.$message({
            // message: '操作失败',
            message: result.data.errMsg,
            type: 'error'
          })
        }

        this.queryTemplate()
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleEditTemplate(row) {
      this.editableTemplate.tmpSortStrArr = []
      this.editableTemplate.pairJson = []

      this.editVisible = true

      queryStrategy().then((result) => {
        this.addElement.listStrategy = result.data
      }).catch((error) => {
        console.log('error occur=' + error)
      })

      getExchangeList().then((result) => {
        this.addElement.listExchange = result.data
      }).catch((error) => {
        console.log('error occur=' + error)
      })

      this.editTemplate(row)

      this.resetFilter()
    },
    chooseAccount1() {
      this.addElement.listAccount2 = this.addElement.listAccount2.filter(i => {
        return i != this.addElement.valueAccount1 && i != this.addElement.valueAccount3
      })
      this.addElement.listAccount3 = this.addElement.listAccount3.filter(i => {
        return i != this.addElement.valueAccount1 && i != this.addElement.valueAccount2
      })
    },
    chooseAccount2() {
      this.addElement.listAccount1 = this.addElement.listAccount1.filter(i => {
        return i != this.addElement.valueAccount2 && i != this.addElement.valueAccount3
      })
      this.addElement.listAccount3 = this.addElement.listAccount3.filter(i => {
        return i != this.addElement.valueAccount2 && i != this.addElement.valueAccount3
      })
    },
    chooseAccount3() {
      this.addElement.listAccount1 = this.addElement.listAccount1.filter(i => {
        return i != this.addElement.valueAccount2 && i != this.addElement.valueAccount3
      })
      this.addElement.listAccount2 = this.addElement.listAccount2.filter(i => {
        return i != this.addElement.valueAccount2 && i != this.addElement.valueAccount3
      })
    },
    getExchangeValue() {
      this.addElement.valueAccount = ''
      this.addElement.valueAccount1 = ''
      this.addElement.valueAccount2 = ''
      this.addElement.valueAccount3 = ''
      queryAllAccount({
        exchange: this.addElement.valueExchange
      }).then((result) => {
        this.addElement.listAccount = result.data
        this.addElement.listAccount1 = this.addElement.listAccount
        this.addElement.listAccount2 = this.addElement.listAccount
        this.addElement.listAccount3 = this.addElement.listAccount
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    handleAddTemplate() {
      this.reset()
      this.showDialog = true

      queryStrategy().then((result) => {
        this.addElement.listStrategy = result.data
      }).catch((error) => {
        console.log('error occur=' + error)
      })

      getExchangeList().then((result) => {
        this.addElement.listExchange = result.data
        this.cascaderOptions = []
        console.log('===========')
        console.log(this.addElement.listExchange)
        console.log(this.cascaderOptions)
        result.data.map(i => {
          this.cascaderOptions.push({ value: i, label: i })
          return i
        })
        console.log(this.cascaderOptions)
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    addPair() {
      if (this.addElement.valueExchange !== '' && this.addElement.valueAccount1 !== '') {
        this.addElement.pair.push({ exchange: this.addElement.valueExchange, account1: this.addElement.valueAccount1 })
        this.addElement.listExchange = this.addElement.listExchange.filter(i => {
          return i != this.addElement.valueExchange
        })
      }

      this.chooseTypeOfAdd()

      this.addElement.transCoinInput = ''
      this.addElement.fixCoinInput = ''
      this.addElement.valueExchange = ''
      this.addElement.valueAccount = ''
      this.addElement.listAccount = []
      this.addElement.valueAccount1 = ''
      this.addElement.listAccount1 = []
      this.addElement.valueAccount2 = ''
      this.addElement.listAccount2 = []
      this.addElement.valueAccount3 = ''
      this.addElement.listAccount3 = []
    },
    addPairPair() {
      if (this.addElement.baseCoin1 !== '' && this.addElement.baseCoin2 !== '' && this.addElement.baseCoin3 !== '' &&
        this.addElement.fixCoin1 !== '' && this.addElement.fixCoin2 !== '' && this.addElement.fixCoin3 !== '') {
        var v1 = this.addElement.baseCoin1.toString().toUpperCase() + '/' + this.addElement.fixCoin1.toString().toUpperCase()
        var v2 = this.addElement.baseCoin2.toString().toUpperCase() + '/' + this.addElement.fixCoin2.toString().toUpperCase()
        var v3 = this.addElement.baseCoin3.toString().toUpperCase() + '/' + this.addElement.fixCoin3.toString().toUpperCase()
        if (v1 != v2 && v1 != v3 && v2 != v3) {
          var tmpArr = []
          tmpArr.push(v1)
          tmpArr.push(v2)
          tmpArr.push(v3)
          tmpArr.sort()

          var tmpStr = ''
          for (var i = 0; i < tmpArr.length; i++) {
            tmpStr = tmpStr + tmpArr[i] + ','
          }
          if (!this.tmpSortStrArr.includes(tmpStr)) {
            this.addElement.pairpair.push({ pairpair1: tmpArr[0], pairpair2: tmpArr[1], pairpair3: tmpArr[2] })
            this.tmpSortStrArr.push(tmpStr)
          }
        }
      }

      this.chooseTypeOfAdd()

      this.addElement.baseCoin1 = ''
      this.addElement.fixCoin1 = ''
      this.addElement.baseCoin2 = ''
      this.addElement.fixCoin2 = ''
      this.addElement.baseCoin3 = ''
      this.addElement.fixCoin3 = ''
    },
    addAccountsJson() {
      if (this.addElement.valueExchange !== '' && this.addElement.valueAccount1 !== '') {
        this.editableTemplate.accountsJson.push({ exchange: this.addElement.valueExchange, account1: this.addElement.valueAccount1 })
        this.addElement.listExchange = this.addElement.listExchange.filter(i => {
          return i != this.addElement.valueExchange
        })
      }

      this.chooseType()

      this.addElement.transCoinInput = ''
      this.addElement.fixCoinInput = ''
      this.addElement.valueExchange = ''
      this.addElement.valueAccount = ''
      this.addElement.listAccount = []
      this.addElement.valueAccount1 = ''
      this.addElement.listAccount1 = []
      this.addElement.valueAccount2 = ''
      this.addElement.listAccount2 = []
      this.addElement.valueAccount3 = ''
      this.addElement.listAccount3 = []
    },
    addPairJson() {
      if (this.editableTemplate.baseCoin1 !== '' && this.editableTemplate.baseCoin2 !== '' && this.editableTemplate.baseCoin3 !== '' &&
        this.editableTemplate.fixCoin1 !== '' && this.editableTemplate.fixCoin2 !== '' && this.editableTemplate.fixCoin3 !== '') {
        var v1 = this.editableTemplate.baseCoin1.toString().toUpperCase() + '/' + this.editableTemplate.fixCoin1.toString().toUpperCase()
        var v2 = this.editableTemplate.baseCoin2.toString().toUpperCase() + '/' + this.editableTemplate.fixCoin2.toString().toUpperCase()
        var v3 = this.editableTemplate.baseCoin3.toString().toUpperCase() + '/' + this.editableTemplate.fixCoin3.toString().toUpperCase()
        if (v1 != v2 && v1 != v3 && v2 != v3) {
          var tmpArr = []
          tmpArr.push(v1)
          tmpArr.push(v2)
          tmpArr.push(v3)
          tmpArr.sort()

          var tmpStr = ''
          for (var i = 0; i < tmpArr.length; i++) {
            tmpStr = tmpStr + tmpArr[i] + ','
          }

          if (!this.editableTemplate.tmpSortStrArr.includes(tmpStr)) {
            this.editableTemplate.pairJson.push({ pairpair1: tmpArr[0], pairpair2: tmpArr[1], pairpair3: tmpArr[2] })
            this.editableTemplate.tmpSortStrArr.push(tmpStr)
          }
        }
      }

      this.chooseType()

      this.editableTemplate.baseCoin1 = ''
      this.editableTemplate.fixCoin1 = ''
      this.editableTemplate.baseCoin2 = ''
      this.editableTemplate.fixCoin2 = ''
      this.editableTemplate.baseCoin3 = ''
      this.editableTemplate.fixCoin3 = ''
    },
    deletePair(index) {
      this.addElement.listExchange.push(this.addElement.pair[index].exchange)
      this.addElement.pair.splice(index, 1)

      this.chooseTypeOfAdd()
    },
    deletePairPair(index) {
      this.addElement.pairpair.splice(index, 1)
      this.tmpSortStrArr.splice(index, 1)

      this.chooseTypeOfAdd()
    },
    deletePairJson(index) {
      this.editableTemplate.pairJson.splice(index, 1)

      this.chooseType()
    },
    deleteAccountsJson(index) {
      this.addElement.listExchange.push(this.editableTemplate.accountsJson[index].exchange)
      this.editableTemplate.accountsJson.splice(index, 1)

      this.chooseType()
    },
    addTemplate() {
      // 没有点+，而是直接保存，也得把当前算进去
      if ((this.addElement.baseCoin1 !== undefined && this.addElement.baseCoin1 !== '') &&
        this.addElement.baseCoin2 !== '' && this.addElement.baseCoin3 !== '' &&
        this.addElement.fixCoin1 !== '' && this.addElement.fixCoin2 !== '' && this.addElement.fixCoin3 !== '') {
        if (this.addElement.pairpair === '' || this.addElement.pairpair.length === 0) {
          var v1 = this.addElement.baseCoin1.toString().toUpperCase() + '/' + this.addElement.fixCoin1.toString().toUpperCase()
          var v2 = this.addElement.baseCoin2.toString().toUpperCase() + '/' + this.addElement.fixCoin2.toString().toUpperCase()
          var v3 = this.addElement.baseCoin3.toString().toUpperCase() + '/' + this.addElement.fixCoin3.toString().toUpperCase()
          if (v1 != v2 && v1 != v3 && v2 != v3) {
            var tmpArr = []
            tmpArr.push(v1)
            tmpArr.push(v2)
            tmpArr.push(v3)
            tmpArr.sort()

            var tmpStr = ''
            for (var i = 0; i < tmpArr.length; i++) {
              tmpStr = tmpStr + tmpArr[i] + ','
            }
            if (!this.tmpSortStrArr.includes(tmpStr)) {
              this.addElement.pairpair.push({ pairpair1: tmpArr[0], pairpair2: tmpArr[1], pairpair3: tmpArr[2] })
              this.tmpSortStrArr.push(tmpStr)
            }
          }
        }
      }

      if (this.addElement.valueExchange !== '' && this.addElement.valueAccount1 !== '' && (this.addElement.pair === '' || this.addElement.pair.length === 0)) {
        this.addElement.pair.push({ exchange: this.addElement.valueExchange, account1: this.addElement.valueAccount1 })
        this.addElement.listExchange = this.addElement.listExchange.filter(i => {
          return i != this.addElement.valueExchange
        })
      }

      addTemplate({
        templateName: this.addElement.templateName,
        strategyName: this.addElement.valueStrategy,
        expectProfit: this.addElement.expectProfit,
        baseCoin: this.addElement.baseCoin,
        maxBuyAmount: this.addElement.maxBuyAmount,
        transAmountRatio: this.addElement.transAmountRatio,
        pairs: JSON.stringify(this.addElement.pairpair),
        accounts: JSON.stringify(this.addElement.pair),
        replaceType: this.addElement.withdrawalTypeStr == '自动' ? 'auto' : 'custom',
        replaceAddress: JSON.stringify(this.addElement.set.addresslist)
      }).then((result) => {
        this.reset()
        this.showDialog = false
        this.resetFilter()
        this.queryTemplate()
      }).catch((error) => {
        console.log('error occur=' + error)
      })
    },
    saveTemplate() {
      // 没有点+，而是直接保存，也得把当前算进去
      if ((this.editableTemplate.baseCoin1 !== undefined && this.editableTemplate.baseCoin1 !== '') && this.editableTemplate.baseCoin2 !== '' && this.editableTemplate.baseCoin3 !== '' &&
        (this.editableTemplate.fixCoin1 !== undefined && this.editableTemplate.fixCoin1 !== '') &&
        this.editableTemplate.fixCoin2 !== '' && this.editableTemplate.fixCoin3 !== '') {
        if (this.editableTemplate.pairJson === '' || this.editableTemplate.pairJson.length === 0) {
          var v1 = this.editableTemplate.baseCoin1.toString().toUpperCase() + '/' + this.editableTemplate.fixCoin1.toString().toUpperCase()
          var v2 = this.editableTemplate.baseCoin2.toString().toUpperCase() + '/' + this.editableTemplate.fixCoin2.toString().toUpperCase()
          var v3 = this.editableTemplate.baseCoin3.toString().toUpperCase() + '/' + this.editableTemplate.fixCoin3.toString().toUpperCase()
          if (v1 != v2 && v1 != v3 && v2 != v3) {
            var tmpArr = []
            tmpArr.push(v1)
            tmpArr.push(v2)
            tmpArr.push(v3)
            tmpArr.sort()

            var tmpStr = ''
            for (var i = 0; i < tmpArr.length; i++) {
              tmpStr = tmpStr + tmpArr[i] + ','
            }

            if (!this.editableTemplate.tmpSortStrArr.includes(tmpStr)) {
              this.editableTemplate.pairJson.push({ pairpair1: tmpArr[0], pairpair2: tmpArr[1], pairpair3: tmpArr[2] })
              this.editableTemplate.tmpSortStrArr.push(tmpStr)
            }
          }
        }
      }

      if ((this.addElement.valueExchange !== undefined && this.addElement.valueExchange !== '') &&
        this.addElement.valueAccount1 !== '' && (this.addElement.pair === '' || this.addElement.pair.length === 0)) {
        this.editableTemplate.accountsJson.push({ exchange: this.addElement.valueExchange, account1: this.addElement.valueAccount1 })
        this.addElement.listExchange = this.addElement.listExchange.filter(i => {
          return i != this.addElement.valueExchange
        })
      }

      updateTemplate({
        oldTemplateName: this.editableTemplate.oldTemplateName,
        oldTemplateStrategy: this.editableTemplate.oldTemplateStrategy,
        templateName: this.editableTemplate.templateName,
        strategyName: this.editableTemplate.strategyName,
        expectProfit: this.editableTemplate.expectProfit,
        baseCoin: this.editableTemplate.baseCoin,
        maxBuyAmount: this.editableTemplate.maxBuyAmount,
        transAmountRatio: this.editableTemplate.transAmountRatio,
        pairs: JSON.stringify(this.editableTemplate.pairJson),
        accounts: JSON.stringify(this.editableTemplate.accountsJson),
        replaceType: this.editableTemplate.withdrawalTypeStr == '自动' ? 'auto' : 'custom',
        replaceAddress: JSON.stringify(this.set.addresslist)
      }).then((result) => {
        this.reset()
        this.resetFilter()
        this.editVisible = false
        this.queryTemplate()
      }).catch((error) => {
        console.log('error occur=' + error)
      })

      console.log(this.set.addresslist)
    },
    editTemplate(row) {
      queryTemplate({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        templateName: row.templateName,
        templateStrategy: row.strategyName
      }).then((result) => {
        this.editableTemplate = result.data.data.map(i => {
          i.createTime = Util.formatDate.format(new Date(i.createTime), 'yyyy-MM-dd hh:mm:ss')
          i.lastModifyTime = Util.formatDate.format(new Date(i.lastModifyTime), 'yyyy-MM-dd hh:mm:ss')
          if (i.status === 1) {
            i.statusOp = '停止'
            i.statusColor = 'success'
          }
          if (i.status === 0) {
            i.statusOp = '启用'
            i.statusColor = 'warning'
          }

          if (i.withdrawalType == 'custom') {
            i.withdrawalTypeStr = '设置'
          } else if (i.withdrawalType == 'auto') {
            i.withdrawalTypeStr = '自动'
          }

          return i
        })[0]
        this.editableTemplate.oldTemplateName = row.templateName
        this.editableTemplate.oldTemplateStrategy = row.strategyName
        this.editableTemplate.pairJson = JSON.parse(this.editableTemplate.pairs)
        this.editableTemplate.accountsJson = JSON.parse(this.editableTemplate.accounts)
        this.editableTemplate.tmpSortStrArr = []

        for (var i = 0; i < this.editableTemplate.accountsJson.length; i++) {
          this.addElement.listExchange = this.addElement.listExchange.filter(j => {
            return j != this.editableTemplate.accountsJson[i].exchange
          })
        }

        this.set.exchange = ''
        this.set.account = ''

        this.set.addresslist = []
        if (this.editableTemplate.withdrawalTypeStr === '自动') {
          this.chooseType()
        }
      })
    },
    reset() {
      this.addElement.transCoinInput = ''
      this.addElement.fixCoinInput = ''
      this.addElement.pairpair = []
      this.tmpSortStrArr = []
      this.addElement.pair = []
      this.addElement.templateName = ''
      this.addElement.expectProfit = ''
      this.addElement.baseCoin = ''
      this.addElement.maxBuyAmount = ''
      this.addElement.transAmountRatio = ''
      this.addElement.valueStrategy = ''
      this.addElement.valueExchange = ''
      this.addElement.valueAccount = ''
      this.addElement.valueAccount1 = ''
      this.addElement.valueAccount2 = ''
      this.addElement.valueAccount3 = ''
      this.addElement.listAccount = []

      this.chooseTypeOfAdd()
      this.addElement.withdrawalTypeStr = '设置'

      this.editableTemplate.pairJson = []
      this.editableTemplate.tmpSortStrArr = []
    },
    resetFilter() {
      this.filter.templateName = ''
      this.filter.templateStrategy = ''
      this.queryTemplate()
    },
    queryTemplate() {
      queryTemplate({
        pageSize: this.pageinfo.pageSize,
        currentPage: this.pageinfo.currentPage,
        templateName: this.filter.templateName.trim(),
        templateStrategy: this.filter.templateStrategy.trim()
      }).then((result) => {
        this.pageinfo.total = result.data.total
        this.templateList = result.data.data.map(i => {
          i.createTime = Util.formatDate.format(new Date(i.createTime), 'yyyy-MM-dd hh:mm:ss')
          i.lastModifyTime = Util.formatDate.format(new Date(i.lastModifyTime), 'yyyy-MM-dd hh:mm:ss')
          if (i.status === 1) {
            i.statusOp = '停止'
            i.statusColor = 'success'
          }
          if (i.status === 0) {
            i.statusOp = '启用'
            i.statusColor = 'warning'
          }
          i.loading = false

          return i
        })
      }).catch((error) => {
        console.log('error occur=' + error)
      })
      // this.resetFilter()
    },
    deleteTemplate(row) {
      console.log(row)

      this.$confirm(`确认删除模板 ${row.templateName}吗?`, '提示', {
        type: 'warning'
      }).then(() => {
        //
        deleteTemplate({
          templateId: row.id,
          templateName: row.templateName,
          templateStrategy: row.templateStrategy
        }).then((result) => {
          if (result.status === 200 && result.data) {
            this.$message.success('删除成功')
            this.queryTemplate()
          } else {
            this.$message.error('删除失败')
          }
        }).catch((error) => {
          console.error('error occur=' + error)
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
