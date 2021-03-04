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
                    <el-dropdown-item
                      @click.native="MangerLevel(16,scope.row.member_id,scope.row.level)"
                    >
                      管理员
                      <div class="tip">拥有所有权限</div>
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="MangerLevel(8,scope.row.member_id,scope.row.level)"
                    >
                      成员
                      <div class="tip">拥有知识库管理权限</div>
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="MangerLevel(0,scope.row.member_id,scope.row.level)"
                    >
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
              <el-button
                type="danger"
                size="mini"
                v-show="!getOwn(scope.row.member_id)"
                @click="removeMember(scope.row.member_id,scope.row.level)"
              >移除</el-button>
              <el-button
                type="danger"
                size="mini"
                v-show="getOwn(scope.row.member_id)"
                @click="quitOrg(scope.row.team_id,scope.row.level)"
              >退出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getOrgMembers,
  modifyMemberLevle,
  removeMember,
  LeaveOrg,
  dissolutionOrg,
} from "@/api/team";

export default {
  mounted() {
    this.initMembers();
  },
  data() {
    return {
      tableData: [],
      organize_id: 0,
    };
  },
  computed: {
    getOwn(id) {
      return function (id) {
        return id == this.$storage.get("uid");
      };
    },
  },
  methods: {
    quitOrg(team_id, level) {
      console.log(level);
      if (level > 16) {
        this.$confirm("此操作将解散圈子,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            dissolutionOrg({ organize_id: team_id }).then((res) => {
              console.log(res);
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消解散",
            });
          });
      } else {
        this.$confirm("此操作将退出圈子, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            LeaveOrg({ team_id: team_id }).then((res) => {
              if (res.code == 200) {
                this.$router.push("/organize");
                console.log(res);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消移除",
            });
          });
      }
    },
    removeMember(id, ulevel) {
      this.$confirm("此操作将该成员移除改圈子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeMember({
            organize_id: this.$route.params.id,
            member_id: id,
            ulevel: ulevel,
          }).then((res) => {
            console.log(res);
            this.initMembers();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消移除",
          });
        });
    },
    initMembers() {
      getOrgMembers({ organize_id: this.$route.params.id }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.rows;
      });
    },
    MangerLevel(level, uid, ulevel) {
      let data = {
        level: level,
        uid: uid,
        organize_id: this.$route.params.id,
        ulevel: ulevel,
      };
      modifyMemberLevle(data).then((res) => {
        this.initMembers();
      });
    },
    handleRole() {},
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
::v-deep .el-button {
  margin-left: 0;
}
::v-deep .el-dropdown-menu__item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 30px;
  .tip {
    color: #909090;
    line-height: 22px;
  }
}
.role {
  cursor: pointer;
}
</style>