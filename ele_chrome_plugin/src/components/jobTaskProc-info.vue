<template>
  <div class="main-panel">
    <!-- 节点title -->
    <div class="title-container">
      <h2 class="name">作业任务处理</h2>
    </div>
    <!-- 按钮区域 -->
    <div class="operator-container">
      <div class="fl">
        <el-button-group>
          <el-button type="" size="small" class="button-radius btn" @click="jobTaskClick">提取
          </el-button>
          <el-button type="" size="small" class="button-radius btn" @click="jobTaskClick">定向提取
          </el-button>
          <el-button type="" size="small" class="button-radius btn" @click="jobTaskClick">调整
          </el-button>
          <el-button type="" size="small" class="button-radius btn" @click="jobTaskClick">挂起
          </el-button>
          <el-button type="" size="small" class="button-radius btn" @click="jobTaskClick">查看
          </el-button>
          <el-button class="button-no-radius" @click="multiEditDialgShow" v-show="showEditButton">
            编辑
          </el-button>
          <el-button class="button-no-radius" @click="multiDeleteDialgShow"
                     v-show="showDeleteButton">删除
          </el-button>
        </el-button-group>
      </div>
      <ul class="lc">
        <li style="font-size: 12px; padding-top:6px">
          待办类型：
          
          <el-radio-group v-model="vm_dblx">
            <el-radio-button class="button-radio tabbtn" label="待处理"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="已处理"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="已驳回"></el-radio-button>
          </el-radio-group>
        </li>
        <li style="font-size: 12px; margin:6px 0px">
          业务活动：
          
          <el-radio-group v-model="vm_ywhd">
            <el-radio-button class="button-radio tabbtn" label="全部"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="审核"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="复核"></el-radio-button>
          </el-radio-group>
        </li>
        <li style="font-size: 12px; margin:6px 0px">
          派工时间：
          
          <el-radio-group v-model="vm_pgsj">
            <el-radio-button class="button-radio tabbtn" label="全部"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="今天"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="本周"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="本月"></el-radio-button>
          </el-radio-group>
        </li>
        <li style="font-size: 12px; margin:6px 0px">
          紧急状态：
          
          <el-radio-group v-model="vm_jjzt">
            <el-radio-button class="button-radio tabbtn" label="全部"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="紧急"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="不紧急"></el-radio-button>
          </el-radio-group>
        </li>
        <li style="font-size: 12px; margin:6px 0px">
          任务状态：
          
          <el-radio-group v-model="vm_rwzt">
            <el-radio-button class="button-radio tabbtn" label="全部"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="挂起"></el-radio-button>
            <el-radio-button class="button-radio tabbtn" label="待调整"></el-radio-button>
          </el-radio-group>
        </li>
        <li style="font-size: 12px; padding-top:6px">
          业务类型：
          
          <el-tabs v-model="vm_ywlx" type="card" @tab-click="handleClick">
            <el-tab-pane class="tabc" label="费用管理" name="fxgl">
              <el-checkbox v-model="checked">主报销单</el-checkbox>
              <el-checkbox v-model="checked">主借款单</el-checkbox>
              <el-checkbox v-model="checked">费用申请单</el-checkbox>
              <el-checkbox v-model="checked">费用预提单</el-checkbox>
            </el-tab-pane>
            <el-tab-pane class="tabc" label="应付业务" name="yfyw">
              <el-checkbox v-model="checked">主报销单1</el-checkbox>
              <el-checkbox v-model="checked">主借款单1</el-checkbox>
              <el-checkbox v-model="checked">费用申请单1</el-checkbox>
              <el-checkbox v-model="checked">费用预提单1</el-checkbox>
            </el-tab-pane>
            <el-tab-pane class="tabc" label="应收业务" name="ysyw">
              <el-checkbox v-model="checked">主报销单2</el-checkbox>
              <el-checkbox v-model="checked">主借款单2</el-checkbox>
              <el-checkbox v-model="checked">费用申请单2</el-checkbox>
              <el-checkbox v-model="checked">费用预提单2</el-checkbox>
            </el-tab-pane>
            <el-tab-pane class="tabc" label="固定资产类" name="gdzc">
              <el-checkbox v-model="checked">主报销单3</el-checkbox>
              <el-checkbox v-model="checked">主借款单3</el-checkbox>
              <el-checkbox v-model="checked">费用申请单3</el-checkbox>
              <el-checkbox v-model="checked">费用预提单4</el-checkbox>
            </el-tab-pane>
            <div style="text-align:center;height:40px;line-height:40px;">
              <el-button style="line-height:8px; background-color: #b71c1c;" type="danger"
                         @click="searchClickOK" class="button-radius btn1">确定
              </el-button>
              <el-button style="line-height:8px;" type="" @click="searchClickCancel"
                         class="button-radius btn1">取消
              </el-button>
            </div>
          </el-tabs>
        </li>
      </ul>
      <!-- 查询模板组件 -->
      <!--<ifbp-search class="fr"-->
      <!--v-if="searchTemplate"-->
      <!--:searchTemplate="searchTemplate"-->
      <!--@search="advancedSearch">-->
      <!--</ifbp-search>-->
    </div>
    
    <!-- 主体区域 -->
    <div class="list-main-container clearfix">
      <!-- UI模板组件 -->
      <ifbp-template ref="expenseaccountTableRef"
                     tpl-id="expenseaccountTableId"
                     :pk-temp="expenseaccountTablePk"
                     :tpl-data="expenseaccountTableData"
                     show-type="table"
                     :tpl-reset-fun="expenseaccountTableResetFun"
                     @selection-change="expenseaccountSelectionChange"
                     @edit-table-click="expenseaccountTableEditClick"
                     @delete-table-click="expenseaccountTableDeleteClick">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements">
      </el-pagination>
    </div>
    
    <!--删除确认Dialog-->
    <ifbp-del-dialog
      v-model="delDialogVisible"
      message="确认删除该数据？删除后无法恢复。"
      @click="deleteClick"
    >
    </ifbp-del-dialog>
    <ifbp-del-dialog
      v-model="multiDelDialogVisible"
      message="确认删除所选数据？删除后无法恢复。"
      @click="multiDeleteClick"
    >
    </ifbp-del-dialog>
  </div>
</template>

<script>
  //  import test from "./info-mock.js";
//  import testSearchTemplate from "./testSearchTemplate.json";
  
  export default {
    data() {
      return {
        // 给页签初始化值
        vm_dblx: '待处理',
        vm_ywhd: '全部',
        vm_pgsj: '全部',
        vm_jjzt: '全部',
        vm_rwzt: '全部',
        vm_ywlx: 'gdzc',
        
        // 查询模板传入参数
        searchTemplate: null,
        // UI模板传入参数
        //pk_temp：0001D21000000000H4K4
        //
        //id：34191cb9-6aa7-414d-bd1e-0d9091e554af
        expenseaccountTablePk: "0001D21000000000IN2O",
        expenseaccountTableData: {},
        expenseaccountTableResetFun: function ($node) {
          var $table = this.getNodeById($node, "kq1zocfyu4");
          var operateHtml = this.getBaseTableOperateHtml();
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        
        // 分页组件传入参数
        totalElements: 0,
        currentPage: 1,
        size: 10,
        // 是否显示批量删除按钮
        showDeleteButton: false,
        // 是否显示编辑按钮
        showEditButton: false,
        // 是否显示删除dialog
        delDialogVisible: false,
        multiDelDialogVisible: false
      };
    },
    created() {
      this.request(1, 10);
      this.getSearchData();
    },
    methods: {
      // 请求数据
      request(n, s) {
        var url =
          "/uapbd/expenseaccount/pageList?pn=" + n + "&ps=" + s + "&sortColumn=&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
        this.$http({
          url: url,
          method: "get",
          dataType: "json"
        })
          .then(res => {
            this.$refs.expenseaccountTableRef.setData(
              "activetask_t",
              res.data.data.content
            );
            this.totalElements = res.data.data.totalElements;
            this.size = res.data.data.size;
          })
          .catch(() => {
            this.$message({
              message: "信息获取失败",
              type: "error"
            });
          });
      },
      
      // 获取查询模板数据
      getSearchData() {
        this.searchTemplate = testSearchTemplate;
      },
      // table行的编辑操作
      expenseaccountTableEditClick(scope) {
        //debugger;
        location.hash = "/jobTaskProc/detail/" + scope.row.pk_jkbx;
      },
      // table行的删除操作
      expenseaccountTableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_jkbx;
      },
      // table选中改变
      expenseaccountSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showEditButton = true;
          this.showDeleteButton = true;
        } else {
          this.showEditButton = false;
          this.showDeleteButton = false;
        }
      },
      
      // 跳转到添加地点页面
      jobTaskClick() {
        location.hash = "/jobTaskProc/detail";
      },
      
      // 批量删除点击处理
      multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
      multiEditDialgShow(){
        //this.multiEditDialogVisible = true;
        //debugger;
        var selectRow = this.$refs.expenseaccountTableRef.comp.$refs.bxzb_t_table.getSelection();
        if (selectRow.length != 1) {
          this.$message({
            message: '只能选择一条数据进行编辑！',
            type: 'error'
          });
          return;
        }
        location.hash = "/expenseaccount/detail/" + selectRow[0].pk_jkbx;
      },
      
      // 查询区点击搜索后的处理
      advancedSearch(searchTemplate) {
        console.log("search triggered", searchTemplate);
      },
      
      // 翻页标签改变每页显示数据
      handleSizeChange(val) {
        this.request(1, val);
      },
      
      // 翻页标签改变当前页
      handleCurrentChange(val) {
        this.request(val, this.size);
      },
      
      // 删除处理
      deleteClick() {
        var delId = this.delId;
        console.log("delete" + delId);
        this.delDialogVisible = false;
      },
      
      // 批量删除处理
      multiDeleteClick() {
        var tableSelections = this.$refs.expenseaccountTableRef.comp.$refs.er_busitem_t_table.getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_jkbx;
            delIds.push(id);
          }
        }
        console.log("multiDelete" + delIds);
        this.multiDelDialogVisible = false;
      },
      
      // 搜索操作
      searchClickOK() {
        var item = this.vm_dblx;
        console.log("TabMessage" + item);
      },
      // 搜索取消操作
      searchClickCancel() {
      
      }
    }
  };
</script>

<style>
  .fl .btn {
    background-color: #0090d9;
    color: white;
    height: 30px
  }
  
  .lc {
    clear: both
  }
  
  .operator-container {
    height: auto
  }
  
  .lc .tabbtn span {
    padding: 0px 5px;
    line-height: 20px;
    font-size: small
  }
</style>

