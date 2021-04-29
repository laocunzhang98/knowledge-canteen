<template>
  <div>
    <el-card>
      <div slot="header">操作日志</div>
      <div>
        <el-table
          :data="Logdata"
          style="width: 100%">
          <el-table-column
            label="操作"
            width="320px">
            <template slot-scope="scope">
              <span>{{scope.row.target&&scope.row.target.nickname}}</span>{{scope.row.log.info}} <span class="title">{{scope.row.art && scope.row.art.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user.nickname"
            label="操作人">
          </el-table-column>
          <el-table-column
            label="操作时间">
            <template slot-scope="scope">
              {{scope.row.log.createdAt | getFormatDate }}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="pagination">
         <el-pagination
          layout="prev, pager, next"
          hide-on-single-page
          prev-text
          background
          :total="50">
          </el-pagination>
       </div>
    </el-card>
  </div>
</template>

<script>
import {getOrgLogList} from "@/api/team"
import {getFormatDate} from "@/utils/util"
export default {
  data() {
    return {
      Logdata:[]
    }
  },
  filters:{
    getFormatDate(date){
      return getFormatDate(date,true)
    }
  },
  created(){
    getOrgLogList({
      organize_id : this.$route.params.id || 0,
    }).then(res=>{
      console.log(res)
      this.Logdata = res.data
    })
  }
}
</script>

<style scoped>
  .title{
    color: skyblue;
    cursor: pointer;
  }
  .pagination{
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
</style>