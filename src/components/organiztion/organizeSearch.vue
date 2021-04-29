<template>
  <div>
    <el-dialog
      title="团队查找"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <div class="team-search">
        <el-input v-model="team_id" placeholder="请输入团队号查询"></el-input>
        <el-button type="primary" @click="SearchTeam">查询</el-button>
      </div>
      <div class="team-list">
        <div class="team-box" v-for="(team,index) in teamlist" :key="index">
          <div class="avatar">
            <img :src="team.avatar" alt />
          </div>
          <div class="team-info">
            <div class="team-name" @click="getTeamInfo(team.team_id)">
              <span>团队名称:</span>
              <span>{{team.team_name}}</span>
            </div>
            <div class="number">
              当前人数:{{team.total}}
              <span>/</span>
              {{team.limit_total}}
            </div>
            <div class="describe">团队描述:{{team.describe}}</div>
          </div>
          <div class="btn">
            <el-button type="primary" size="small">申请加入</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <div>
        <organize-introduce @dialogShow="dialogShow" :teamInfoDialog="teamInfoDialog" :orgId="team_id"></organize-introduce>
    </div>
  </div>
</template>

<script>
import { getTeamList } from "@/api/team";
import organizeIntroduce from '@/components/organiztion/organizeIntroduce'
export default {
  data() {
    return {
      dialogVisible: false,
      teamInfoDialog:false,
      team_id: "",
      teamlist: [],
    };
  },
  props: {
    teamSearchDialog: {
      type: Boolean,
    },
  },
  components:{
    organizeIntroduce
  },
  watch: {
    teamSearchDialog() {
      this.dialogVisible = this.teamSearchDialog;
    },
    dialogVisible() {
      this.$emit("searchDialog", this.dialogVisible);
    },
  },
  methods: {
    dialogShow(val){
      this.teamInfoDialog = val
    },  
    getTeamInfo(id) {
      this.teamInfoDialog=true
      this.team_id = id
    },
    SearchTeam() {
      getTeamList({ team_id: this.team_id }).then((res) => {
        this.teamlist = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.team-search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
.team-list {
  margin-top: 20px;
  height: 400px;
  .team-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .avatar {
      img {
        height: 70px;
        width: 70px;
        border-radius: 10px;
      }
    }
    .team-info {
      padding-left: 10px;
      flex-basis: 400px;
      .team-name {
        span:nth-child(2) {
          cursor: pointer;
          &:hover {
            color: blue;
          }
        }
      }
    }
  }
}
</style>