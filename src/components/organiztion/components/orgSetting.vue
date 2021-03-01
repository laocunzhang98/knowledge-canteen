<template>
  <div>
    <el-card>
      <div slot="header">团队设置</div>
      <div>
        <div class="basic">
          <div class="team-name">团队名称</div>
          <el-input v-model="team_name" placeholder></el-input>
          <div class="team-des">团队描述</div>
          <el-input v-model="team_des" type="textarea"></el-input>
          <div class="team-avatar">
            <div>头像</div>
            <div class="avatar">
              <img :src="avatar" />
              <div class="upload">
                <el-upload
                  action="/api/uploads/addpic"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="update">
            <el-button size="small" @click="updateteaminfo">更新</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTeamInfo,updateTeamInfo} from "@/api/team";
import {Base64} from "js-base64"
export default {
  data() {
    return {
      avatar: "",
      team_name: "",
      team_des: "",
      headers: {
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
    };
  },
  created() {
    console.log(this.$route.params);
    getTeamInfo({ team_id: this.$route.params.id }).then((res) => {
      this.avatar = res.data.avatar
      this.team_name = res.data.team_name
      this.team_des = res.data.describe
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.avatar = res.data
    },
    updateteaminfo(){
      let data = {
        avatar:this.avatar,
        team_name:this.team_name,
        describe:this.team_des,
        team_id:this.$route.params.id
      }
      updateTeamInfo(data).then(res=>{
        console.log(res)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 200px;
  height: 32px;
  line-height: 32px;
}
.basic {
  font-size: 14px;
  .team-name {
  }
  .team-des {
    margin-top: 15px;
  }
  .team-avatar {
    margin-top: 15px;
    .avatar {
      display: flex;
      align-items: center;
      img {
        margin-top: 10px;
        height: 70px;
        width: 70px;
      }
      .upload {
        margin-left: 20px;
      }
    }
  }
  .update {
    margin-top: 25px;
  }
}
</style>