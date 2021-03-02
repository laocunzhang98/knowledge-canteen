<template>
  <div>
    <el-card>
      <div slot="header">成员</div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="昵称" min-width="25%">
            <template slot-scope="scope">
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" min-width="30%">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" min-width="25%">
            <template slot-scope="scope">
              <span>{{ scope.row.level }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getOrgMembers} from "@/api/team"
export default {
  mounted(){
    getOrgMembers({organize_id:this.$route.params.id}).then(res=>{
      console.log(res.data)
      this.tableData = res.data.rows
    })
  },
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>