<template>
  <div>
    <ta-table :pagination="false" :columns="columns" :dataSource="data" @change="handleChange"/>
  </div>
</template>
<script>
  const data = [{
    name: 'John Brown',
    age: 1,
    address: 'New York No. 1 Lake Park',
  }, {
    name: 'Jim Green',
    age: 45,
    address: 'London No. 1 Lake Park',
  }, {
    name: 'Joe Black',
    age: 4,
    address: 'Sidney No. 1 Lake Park',
  }, {
    name: 'Jim Red',
    age: 5,
    address: 'London No. 2 Lake Park',
  }]

  export default {
    data () {
      return {
        data,
        sortedInfo: null,
      }
    },

    computed: {
      //列的计算属性
      columns () {
        let sortedInfo=this.sortedInfo || {};
        const columns = [{
          title: 'Name',
          dataIndex: 'name',
        },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            //可自定义的排序函数
            sorter: (a, b) => a.age - b.age,
            //可控制的排序,首先设置排序的列,然后设置排序的方式
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order

          }
        ]
        return columns
      }
    },
    methods: {
      //表格改变函数,传入分页,过滤,排序参数
      handleChange (pagination, filters, sorter) {
        //设置当前过滤参数为当前选择出的value
        // this.filteredInfo = filters.name
        //设置当前排序条件为传入的sorter
        this.sortedInfo = sorter
      },
    }
  }
</script>


