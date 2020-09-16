<template>
  <div>
    <div>
      <ta-button @click="fnQueryInfo" type="primary" style="margin-bottom: 10px" >查询表格数据</ta-button>
      <ta-table
              :dataSource="userData"
              :columns="userColumns"
              style="width: 80%;"
      >
      </ta-table>
    </div>
    <div>
      <ta-back-top />
    </div>
  </div>

</template>
<script>
  const userColumns = [
    { title: '序号', dataIndex: 'id'},
    { title: '人员编号', dataIndex: 'psnNo'},
    { title: '姓名', dataIndex: 'psnName'},
    { title: '证件类型', dataIndex: 'psnCertType'},
    { title: '证件号', dataIndex: 'idCard'},
    { title: '性别', dataIndex: 'gend'},
    { title: '爱好', dataIndex: 'hobby'},
    { title: '日期', dataIndex: 'brdy'},
    { title: '是否有效', dataIndex: 'valiFlag'},
    { title: '地址', dataIndex: 'address'},
  ]

  export default {
    data() {
      return {
        userColumns,
        userData:[],
      }
    },
    methods: {
      //返回分页查询时要一同提交的参数（json对象格式）
      // pageParams(){
      //   return {};
      // },
      //查询数据
      fnQueryInfo(){
        //调用分页条方法查询数据（默认查询第一页）
        // this.$refs.userGridPager.loadData();
        this.Base.submit(
          null,
          {
            url : "nathenTest/queryNathenWuInfoList",
            // data: {'psnName': '张三'}
          },
          {
            // 成功回调
            successCallback: (data) => {
              console.log(data)
              this.userData = data.data.resultData
            },
            // 失败回调
            failCallback: (data) => {
              console.log(data)
            }
          })
      }
    },
  }
</script>
