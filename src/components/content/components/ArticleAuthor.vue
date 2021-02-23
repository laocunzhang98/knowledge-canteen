<template>
  <div class="author-box">
    <div class="author-base">
      <div class="author-img">
        <img :src="avatar" alt />
      </div>
      <div class="author-info">
        <div class="author-name">{{nickname}}</div>
        <div class="pub-info">
          <span class="pub-time">{{pub_time}}</span>
          <span class="read-nums">阅读 {{read_nums}}</span>
          <span class="edit" @click="JumpEdit" v-show="editactive">编辑</span>
        </div>
      </div>
    </div>
    <div class="follow" @click="follow" v-if="!followactive && !editactive">
      <span>关注</span>
    </div>
    <div class="follow-active" @click="cancelfollow" v-if="followactive && !editactive">
      <span>已关注</span>
    </div>
  </div>
</template>

<script>
import { getAuthorInfo } from "@/api/classic";
import { postFollow, getIsFollow } from "@/api/user";
import { getFormatDate } from "@/utils/util";
import { getUserInfo } from "@/api/user";
import {getTeamLevel} from "@/api/team"
export default {
  data() {
    return {
      nickname: "",
      avatar: "",
      read_nums: 0,
      team_id:0,
      pub_time: "",
      level:0,
      fid: 0,
      uid: 0,
      editactive: false,
      followactive: false,
    };
  },
  mounted() {
    getUserInfo().then((res) => {
      if (res.code == 200) {
        this.uid = res.data.id;
      }
    });
    
  },
  props: ["articleInfo"],
  methods: {
    JumpEdit() {
      this.$router.push({
        path: "/edit",
        query: { article_id: this.articleInfo.id,team_id:this.team_id},
      });
    },
    follow() {
      let data = {
        fid: this.fid,
      };
      postFollow(data).then((res) => {
        this.followactive = true
        console.log(res)
      });
    },
    cancelfollow(){
      let data = {
        fid: this.fid,
      };
      postFollow(data).then((res) => {
        this.followactive = false
      });
    }
  },
  watch: {
    articleInfo() {
      this.read_nums = this.articleInfo.read_nums;
      this.team_id = this.articleInfo.organize_id;
      this.pub_time = getFormatDate(this.articleInfo.createdAt);
      getAuthorInfo(this.articleInfo.id).then( async (res) => {
        if (res.code === 200) {
          this.nickname = res.data.nickname;
          this.avatar = res.data.avatar;
          this.fid = res.data.id;
          let params = {
            fid: this.fid,
          };
          await getTeamLevel({team_id:this.team_id}).then(res=>{
            this.level = res.data.level
          })
          await getIsFollow(params).then((res) => {
            if (res.code === 200) {
              if (res.data == 0) {
                this.followactive = false
              }
              else{
                this.followactive = true
              }
            }
          });
          if (this.fid == this.uid || this.level>=16) {
            this.editactive = true;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.author-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .author-base {
    display: flex;
    align-items: center;
    height: 50px;
    .author-img {
      // width: 40px;
      // height: 40px;
      margin-right: 12px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
    }
    .author-info {
      .author-name {
        font-weight: 600;
      }
      .pub-info {
        font-size: 14px;
        color: gray;
        .pub-time {
          margin-right: 10px;
        }
        .edit {
          margin-left: 10px;
          cursor: pointer;
          &:hover {
            color: blue;
          }
        }
      }
    }
  }
  .follow {
    
    color: skyblue;
    border: 1px solid skyblue;
    padding: 1px 10px;
    cursor: pointer;
  }
  .follow-active {

    padding: 2px 10px;
    cursor: pointer;
    color: #fff;
    background-color: #6cbd45;
  }
}
</style>