<template>
  <div style="height:800px">
    <ta-border-layout
            :layout="{header:'800px'}"
    >
      <div slot="header" >
        <span style="font-weight: bold;font-size: 18px;border-left:4px solid #1B65B9;padding-left: 10px"> 查询条件</span>
        <ta-form
                layout="horizontal"
                :formLayout="true"
                label-width="100px"
                :autoFormCreate="(form)=>{this.searchForm = form}"
                :col="col"
        >
          <div v-show="isDisplay">
            <ta-form-item
                    label="人员编号"
                    fieldDecoratorId="psnNo"
            >
              <ta-auto-complete
                      @select="onSelect"
                      @focus="clearAndSet(1)"
                      @search="handleSearch"
                      placeholder="请输入人员编号"
              >
                <template slot="dataSource">
                  <ta-select-option v-for="psnNo in searchData"  :key="psnNo">{{psnNo}}</ta-select-option>
                </template>
              </ta-auto-complete>
            </ta-form-item>
            <ta-form-item
                    label="姓名"
                    fieldDecoratorId="psnName"
            >
              <ta-auto-complete
                      @select="onSelect"
                      @focus="clearAndSet(2)"
                      @search="handleSearch"
                      placeholder="请输入姓名"
              >
                <template slot="dataSource">
                  <ta-select-option v-for="name in searchData"  :key="name">{{name}}</ta-select-option>
                </template>
              </ta-auto-complete>
            </ta-form-item>
            <ta-form-item
                    label="身份证号"
                    fieldDecoratorId="idCard">
              <ta-auto-complete
                      @select="onSelect"
                      @search="handleSearch"
                      @focus="clearAndSet(3)"
                      placeholder="请输入身份证号">
                <template slot="dataSource">
                  <ta-select-option v-for="idCard in searchData"  :key="idCard">{{idCard}}</ta-select-option>
                </template>
              </ta-auto-complete>
            </ta-form-item>
            <ta-form-item
                    label="证件类型"
                    fieldDecoratorId="psnCertType"
            >
              <ta-select style="width: 100%" placeholder="请选择证件类型">
                <ta-select-option value="0">居民身份证(户口簿)</ta-select-option>
                <ta-select-option value="1">护照</ta-select-option>
                <ta-select-option value="2">军官证</ta-select-option>
                <ta-select-option value="3">其他</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item
                    label="性别"
                    fieldDecoratorId="gend"
            >
              <ta-select style="width: 100%" placeholder="请选择性别">
                <ta-select-option value="1">男</ta-select-option>
                <ta-select-option value="2">女</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item
                    label="地址"
                    fieldDecoratorId="address">
              <ta-auto-complete
                      @select="onSelect"
                      @search="handleSearch"
                      @focus="clearAndSet(4)"
                      placeholder="请输入地址">
                <template slot="dataSource">
                  <ta-select-option v-for="address in searchData" :key="address">{{address}}</ta-select-option>
                </template>
              </ta-auto-complete>
            </ta-form-item>
          </div>
          <br>
          <div style="float: right">
            <ta-button style="margin-left: 8px" @click="UpOrDown">
              {{messageUpOrDown}} <ta-icon :type="iconUpOrDown" />
            </ta-button>
            <ta-button @click="fnClearValue">重置</ta-button>
            <ta-button type="primary" @click="filterUser">查询</ta-button>
          </div>
        </ta-form>
        <div>
          <ta-divider style="margin-bottom: 10px"/>
          <span style="font-weight: bold;font-size: 18px;border-left:4px solid #1B65B9;padding-left: 10px">人员基本信息</span>

          <ta-button type="primary" @click="showModal" style="float: right">新增</ta-button>
          <ta-modal
                  title="新增人员信息"
                  :visible="visible"
                  @cancel="handleCancel"
                  :maskClosable=false
                  :footer="null"
                  :destroyOnClose=true
          >
            <div>
              <ta-form :autoFormCreate="(form)=>{this.addForm = form}" style="margin-right: 8%">
                <ta-form-item
                        label='人员编号'
                        fieldDecoratorId="psnNo"
                        :require="{message:'请输入人员编号!'}"
                >
                  <ta-input placeholder='input placeholder' />
                </ta-form-item>
                <ta-form-item
                        label='姓名'
                        fieldDecoratorId="psnName"
                        :require="{message:'请输入姓名!'}"
                >
                  <ta-input placeholder='input placeholder' />
                </ta-form-item>
                <ta-form-item
                        label='证件类型'
                        fieldDecoratorId="psnCertType"
                        :require="{message:'请选择证件类型!'}">
                  <ta-select style="width: 100%">
                    <ta-select-option value="0">居民身份证(户口簿)</ta-select-option>
                    <ta-select-option value="1">护照</ta-select-option>
                    <ta-select-option value="2">军官证</ta-select-option>
                    <ta-select-option value="3">其他</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item
                        label='证件号码'
                        fieldDecoratorId="idCard"
                        :require="{message:'请输入身份证号码!'}"
                        :fieldDecoratorOptions="{rules: [{ type: 'number', idCard: '2', message: '输入的身份证号码不合法'}]}">
                  <ta-input placeholder='input placeholder' />
                </ta-form-item>
                <ta-form-item
                        label='性别'
                        fieldDecoratorId="gend"
                        :require="{message:'请选择性别!'}">
                  <ta-select style="width: 100%">
                    <ta-select-option value="1">男</ta-select-option>
                    <ta-select-option value="2">女</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item
                        label="爱好"
                        fieldDecoratorId="hobby"
                >
                  <ta-input placeholder='input placeholder' />
                </ta-form-item>
                <ta-form-item
                        label="日期"
                        fieldDecoratorId="brdy"
                >
                  <ta-date-picker :format="'YYYY-MM-DD'" />
                </ta-form-item>
                <ta-form-item
                        label="是否有效"
                        fieldDecoratorId="valiFlag"
                        :require="{message:'请选择人员信息是否有效!'}"
                >
                  <ta-select style="width: 58%">
                    <ta-select-option value="0">无效</ta-select-option>
                    <ta-select-option value="1">有效</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item
                        label='地址'
                        fieldDecoratorId="address">
                  <ta-input placeholder='input placeholder' />
                </ta-form-item>
                <ta-form-item label="" :wrapperCol="{span: 18,offset: 9}">
                  <ta-button @click="handleCancel" style="margin-right: 10px">取消</ta-button>
                  <ta-button type='primary' @click="handleSubmit">提交</ta-button>
                </ta-form-item>
              </ta-form>
            </div>
          </ta-modal>
          <ta-form :autoFormCreate="(form)=>{this.form = form}">
            <ta-table :columns="columns" :dataSource="tableData" :scroll="{ x: 1500,y: 400 }" style="padding-top: 15px" rowKey="id">
              <span slot="ID">序号</span>
              <ta-table-edit slot="id" slot-scope="text, record" type="inputNumber"></ta-table-edit>
              <ta-table-edit slot="psnNo" slot-scope="text, record" type="input" :row-editable="true" ></ta-table-edit>
              <ta-table-edit slot="psnName" slot-scope="text, record" type="input" :row-editable="true"></ta-table-edit>
              <ta-table-edit slot="psnCertType" slot-scope="text, record" type="select" :row-editable="true" :option="CollectionData('IDCARDTYPE')"></ta-table-edit>
              <ta-table-edit slot="idCard" slot-scope="text, record" type="inputNumber" :row-editable="true" :fieldDecoratorOptions="{rules: [{ idCard: '2', message: '输入的身份证号码不合法'}]}"></ta-table-edit>
              <ta-table-edit slot="gend" slot-scope="text, record" type="select" :option="CollectionData('SEX')" :row-editable="true"></ta-table-edit>
              <ta-table-edit slot="hobby" slot-scope="text, record" type="input" :multiple="true" :row-editable="true"></ta-table-edit>
              <ta-table-edit slot="brdy" slot-scope="text, record" type="datePicker" :row-editable="true"></ta-table-edit>
              <ta-table-edit slot="valiFlag" slot-scope="text, record" type="select" :row-editable="true" :option="CollectionData('CRT_VALI_FLAG')"></ta-table-edit>
              <ta-table-edit slot="address" slot-scope="text, record" type="input" :row-editable="true"></ta-table-edit>
              <ta-table-edit slot="action" slot-scope="text, record" :dataSource="tableData" type="rowEdit" row-key="id" :beforeChange="fnBeforeChange" @change="changeData" @tableChange="fnTableChange" @rowDelete="fnRowDelete"></ta-table-edit>
            </ta-table>
          </ta-form>
          <div>
            <ta-pagination
                    style="text-align: right;margin-top: 10px"
                    :dataSource.sync="tableData"
                    :params="userPageParams"
                    :total="liveTotal"
                    url="nathenTest/queryNathenWuInfoPage"
                    ref="gridPager"
            />
          </div>
        </div>
      </div>
    </ta-border-layout>
  </div>
</template>

<script>
  import moment from 'moment';

  const columns = [
    { dataIndex: 'id', width: 100, slots: { title: 'ID' }, overflowTooltip: true },
    { title: '人员编号', dataIndex: 'psnNo', width: 200, scopedSlots: { customRender: 'psnNo' } },
    { title: '姓名', dataIndex: 'psnName', width: 150, scopedSlots: { customRender: 'psnName' } },
    { title: '证件类型', dataIndex: 'psnCertType', width: 200, scopedSlots: { customRender: 'psnCertType' } },
    { title: '证件号', dataIndex: 'idCard', width: 250, scopedSlots: { customRender: 'idCard' } },
    { title: '性别', dataIndex: 'gend', width: 100, scopedSlots: { customRender: 'gend' } },
    { title: '爱好', dataIndex: 'hobby', width: 150, scopedSlots: { customRender: 'hobby' } },
    { title: '日期', dataIndex: 'brdy', width: 150, scopedSlots: { customRender: 'brdy' } },
    { title: '是否有效', dataIndex: 'valiFlag', width: 100, scopedSlots: { customRender: 'valiFlag' } },
    { title: '地址', dataIndex: 'address', width: 200, scopedSlots: { customRender: 'address' } },
    { title: '操作', dataIndex: 'action', width: 150, scopedSlots: { customRender: 'action' }, fixed: 'right'}
  ]

  export default {
    name: "partComponent",
    props: {},
    data () {
      return {
        tableData: [],
        //存放搜索实时显示的信息
        searchData: [],
        paramsNum: 0,
        columns,
        iconFlag: true,
        messageUpOrDown: '收起',
        iconUpOrDown: 'up',
        //控制是否展示
        isDisplay: true,
        //控制新增人员信息模块框关闭
        visible: false,
        //保存查询的数据
        filterSave: [],
        //实时更新数据总条数
        liveTotal: 0 ,
        col: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }
      }
    },
    mounted(){
      //进入页面后默认查询表格第一页(分页条实例提供了loadData方法会默认查询第一页,并将数据渲染入表格)
      this.$refs.gridPager.loadData((data)=>{
        //这里是查询后的回调,可以不实现
        // console.log(data)
      })
    },
    methods: {
      fnBeforeChange ({ newData, record, rowKey }, callback) {
        // 单元格数据保存前数据处理（newData：返回改变后的行数据、record：该行的行数据、rowKey：该行的rowKey值、callback：回调函数，可判断数据是否正确）
        // 注意，callback 必须被调用
        if (newData.psnName == '123') {
          callback('name不能为123')
        }
        if (newData.psnName == '') {
          callback('name不能为空')
        } else {
          callback()
          // 可在此处对表格数据进行处理
          Object.assign(record, newData)
        }
      },
      changeData ({ newData, record, rowKey }) {
        // 将行数据修改为新值（newData：返回改变的值、record：该行的行数据、rowKey：该行的rowKey值）
        // 也可当表格编辑状态关闭后，在此处对表格数据进行处理
        this.Base.submit(
                // 表单对象this.form,如果没有自动校验可以为null
                null, {
                  url: 'nathenTest/editNathenWuInfo', // url
                  data: newData, // 表单数据
                  autoValid: true// 提交前是否自动验证
                }, {
                  // 成功回调
                  successCallback: (data) => {
                    // console.log(data)
                    this.$message.success('修改成功');
                  },
                  // 失败回调
                  failCallback: (data) => {
                    console.log(data)
                  }
                })
        Object.assign(record, newData)
        console.log(newData)
      },
      fnTableChange (dataSource) {
        // 将返回有editable属性的表格数据，赋给表格
        this.tableData = dataSource
      },
      fnRowDelete (deleteId) {
        // 返回主键id，即rowKey的值
        this.Base.submit(
                // 表单对象this.form,如果没有自动校验可以为null
                null, {
                  url: 'nathenTest/removeNathenWuById', // url
                  data: { 'id': deleteId }, // 表单数据
                }, {
                  // 成功回调
                  successCallback: (data) => {
                    this.Base.submit(
                            // 表单对象this.form,如果没有自动校验可以为null
                            null, {
                              url: 'nathenTest/queryNathenWuInfoList', // url
                            }, {
                              // 成功回调
                              successCallback: (data) => {
                                this.liveTotal = data.data.resultData.length
                                console.log(data.data.resultData.length)
                                this.$refs.gridPager.$refs.vcPage.handleChange(this.$refs.gridPager.$refs.vcPage.stateCurrent)
                                this.$message.success('删除成功')
                                console.log(this.$refs.gridPager.$refs.vcPage)
                              },
                              // 失败回调
                              failCallback: (data) => {
                                // this.$message.error('删除失败');
                                console.log(data)
                              }
                            })
                  },
                  // 失败回调
                  failCallback: (data) => {
                    this.$message.error('删除失败');
                    console.log(data)
                  }
                })
      },
      userPageParams () {
        //这里返回的对象是分页要一同提交的参数
        return this.filterSave
      },
      handleSearch (value) {
        let paramsName = ''
        let params = {}
        if (this.paramsNum == 1){
          paramsName = 'psnNo'
          params = {'psnNo': value}
        }else if (this.paramsNum == 2){
          paramsName = 'psnName'
          params = {'psnName': value}
        }else if (this.paramsNum == 3){
          paramsName = 'idCard'
          params = {'idCard': value}
        }else if (this.paramsNum == 4){
          paramsName = 'address'
          params = {'address': value}
        }
        let arr = [];
        if (value) {
          this.Base.submit(null, {
            url: 'nathenTest/queryNathenWuInfoList',
            data: params
          }, {
            // 成功回调
            successCallback: (data) => {
              for (let item of data.data.resultData) {
                arr.push(item[paramsName])
              }
              let set = new Set(arr);
              this.searchData = [...set];
            },
            // 失败回调
            failCallback: (data) => {
              console.log('请求失败')
            }
          })
        } else {
          this.searchData = [];
          // console.log('为空')
        }
      },
      clearAndSet(value){
        this.searchData = []
        this.paramsNum = value
      },
      onSelect (value, item, option) {
        // 选中回调，value即为每条数据的id，在optionConfig中进行配置
        this.filterSave = this.searchForm.getFieldsValue();
        this.$refs.gridPager.loadData((data)=>{
          //这里是查询后的回调,可以不实现
        })
        // console.log(this.filterSave)
      },
      //重置
      fnClearValue () {
        this.searchForm.resetFields()
        this.filterSave = this.searchForm.getFieldsValue();
        this.$refs.gridPager.loadData((data) => {
          //这里是查询后的回调,可以不实现
        })
      },
      //展开收起控制
      UpOrDown () {
        this.iconFlag = !this.iconFlag
        if (this.iconFlag) {
          this.messageUpOrDown = '收起'
          this.iconUpOrDown = 'up'
        }else{
          this.messageUpOrDown = '展开'
          this.iconUpOrDown = 'down'
        }
        this.isDisplay = !this.isDisplay
      },
      showModal () {
        this.visible = true
      },
      moment,
      handleSubmit(){
        let formData = this.addForm.getFieldsValue();
        formData.brdy = moment(formData.brdy).format('YYYY-MM-DD')
        this.Base.submit(
                // 表单对象this.form,如果没有自动校验可以为null
                this.addForm, {
                  url: 'nathenTest/addNathenWuInfo', // url
                  data: formData, // 表单数据
                  autoValid: true// 提交前是否自动验证
                }, {
                  // 成功回调
                  successCallback: (data) => {
                    this.visible = false
                    //进入页面后默认查询表格第一页(分页条实例提供了loadData方法会默认查询第一页,并将数据渲染入表格)
                    this.$refs.gridPager.loadData((data)=>{
                      //这里是查询后的回调,可以不实现
                      console.log(data)
                    })
                    this.$message.success('添加成功');
                  },
                  // 失败回调
                  failCallback: (data) => {
                    console.log(data)
                  }
                })
        console.log(formData)
      },
      handleCancel (e) {
        this.visible = false
      },
      filterUser () {
        this.filterSave = this.searchForm.getFieldsValue();
        // console.log(this.filterSave)
        this.$refs.gridPager.loadData((data)=>{
          //这里是查询后的回调,可以不实现
        })
      }
    }
  }

</script>

<style scoped type="text/less">
</style>
