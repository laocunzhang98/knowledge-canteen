<template>
  <div>
    <el-card>
      <div slot="header">成员</div>
      <div class="mem-box">
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
              <div>
                <el-dropdown trigger="click" placement="bottom">
                  <div @click="handleRole" class="role">
                    <span>{{scope.row.level | role}}</span>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="MangerLevel(16,scope.row.member_id)">
                      管理员
                      <div class="tip" >拥有所有权限</div>
                    </el-dropdown-item >
                    <el-dropdown-item @click.native="MangerLevel(8,scope.row.member_id)">
                      成员
                      <div class="tip">拥有知识库管理权限</div>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="MangerLevel(0,scope.row.member_id)">
                      只读成员
                      <div class="tip">仅有阅读下载权限</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button type="danger" size="mini">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrgMembers,modifyMemberLevle } from "@/api/team";

export default {
  mounted() {
    getOrgMembers({ organize_id: this.$route.params.id }).then((res) => {
      console.log(res.data);
      this.tableData = res.data.rows;
    });
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    MangerLevel(level,uid){
      let data = {
        level:level,
        uid:uid,
        organize_id:this.$route.params.id
      }
      modifyMemberLevle(data).then(res=>{
        console.log(res)
      })
    },
    handleRole() {
    },
  },
  filters: {
    role(val) {
      switch (val) {
        case 0:
          return "只读成员";
          break;
        case 8:
          return "成员";
          break;
        case 16:
          return "管理员";
          break;
        case 32:
          return "圈主";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item{
  border-bottom: 1px solid rgba(0,0,0,0.1);
  line-height: 30px;
  .tip{
    color: #909090;
    line-height: 22px;
  }
}
.role {
  cursor: pointer;
  
}
</style>