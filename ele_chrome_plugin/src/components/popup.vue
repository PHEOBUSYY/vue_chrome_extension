<template>
  <div>
    <h3>My WebSite Reporter</h3>
    <el-menu :default-active="currentIndex" class="el-menu-demo" mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="1">常用</el-menu-item>
      <el-menu-item index="2">收藏</el-menu-item>
      <el-menu-item index="3">禁用</el-menu-item>
    </el-menu>
    <el-table v-if="currentIndex ===  '1'"
              :data="webData"
              :default-sort="{prop: 'frequency'}"
              @cell-click="clickEvent"
              @selection-change="handleselection"
    >
      <el-table-column
        v-if="showEdit"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="frequency"
        label="频率"
        width="80"
        stripe
        border
        sortable
      >
        <template slot-scope="scope">
          <span class="el-icon-time">{{ scope.row.frequency }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="网址"
        sortable
        @click="goToWeb(scope.row.url)"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>标题: {{ scope.row.title }}</p>
            <p>网址: {{ scope.row.url }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.url }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">{{ scope.row.isStar ? '已收藏' : '收藏'}}
          
          
          
          
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">{{ scope.row.isForbid ? '已禁用' : '禁用'}}
          
          
          
          
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-if="currentIndex ===  '2'"
      :data="starData"
    >
      <el-table-column
        v-if="showEdit"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="频率"
        width="80"
        sortable
      >
        <template slot-scope="scope">
          <span class="el-icon-time">{{ scope.row.frequency }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="网址"
        sortable
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>标题: {{ scope.row.title }}</p>
            <p>网址: {{ scope.row.url }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.url }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">{{ scope.row.isStar ? '已收藏' : '收藏'}}
          
          
          
          
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-table
      v-if="currentIndex ===  '3'"
      :data="forbidData"
    >
      <el-table-column
        v-if="showEdit"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="frequency"
        label="频率"
        width="80"
        sortable
      >
        <template slot-scope="scope">
          <span class="el-icon-time">{{ scope.row.frequency }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="网址"
        sortable
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>标题: {{ scope.row.title }}</p>
            <p>网址: {{ scope.row.url }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.url }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">{{ scope.row.isForbid ? '已禁用' : '禁用'}}
          
          
          
          
          
          
          
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <ul>
      <li>
        <span class="el-icon-document"><a style="padding: 5px;">数据操作</a></span>
        <el-button type="text" size="mini" @click="goToSecond">新建记录</el-button>
        <el-button type="text" size="mini" @click="remove">删除记录</el-button>
        <el-button type="text" size="mini" @click="clear">清空记录</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentIndex: '1',
        webData: [],
        showEdit: true,
        multipleSelection: []
      }
    },
    mounted: function () {
      if (window.localStorage.getItem('webData')) {
        this.webData = JSON.parse(window.localStorage.getItem('webData'));
      } else {
//        this.webData = [{
//          frequency: 12,
//          title: '链融云',
//          url: 'https://www.imfbp.com',
//          isStar: false,
//          isForbid: false,
//        },
//          {
//            frequency: 15,
//            title: 'twitter',
//            url: 'http://www.twitter.com',
//            isStar: false,
//            isForbid: false,
//          },
//          {
//            frequency: 2,
//            title: '百度',
//            url: 'http://www.baidu.com',
//            isStar: false,
//            isForbid: false,
//          }];
//        window.localStorage.setItem('webData', JSON.stringify(this.webData));
      }
    },
    props: {},
    computed: {
      starData: function () {
        let data = [];
        this.webData.forEach(function (item) {
          if (item.isStar) {
            data.push(item);
          }
        });
        return data;
      },
      forbidData: function () {
        let data = [];
        this.webData.forEach(function (item) {
          if (item.isForbid) {
            data.push(item);
          }
        });
        return data;
      }
    },
    methods: {
      handleSelect: function (key, keyPath) {
        console.log(key + ' --- ' + keyPath);
        this.currentIndex = key;
      },
      handleEdit: function (index, row) {
        console.log(index + ' --- ' + row.url);
        row.isStar = !row.isStar;
        this.save();
      },
      handleDelete: function (index, row) {
        console.log(index + ' --- ' + row.url);
        row.isForbid = !row.isForbid;
        this.save();
      },
      goToWeb: function (url) {
        window.open(url);
      },
      clickEvent: function (row, column, cell, event) {
        console.log(row, column, cell, event);
        if (column.label === '网址') {
          window.open(row.url);
        }
      },
      clear: function () {
        this.webData = [];
        window.localStorage.removeItem('webData');
      },
      save: function () {
        window.localStorage.setItem('webData', JSON.stringify(this.webData));
      },
      goToSecond: function () {
        this.$router.push('create');
      },
      remove: function () {
        this.webData = this.webData.filter((item) => {
          return this.multipleSelection.indexOf(item) <= -1;
        });
        this.multipleSelection = [];
        this.save();
      },
      handleselection: function (val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        
      }
    }
  }
</script>
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  span {
    display: block;
  }
</style>
