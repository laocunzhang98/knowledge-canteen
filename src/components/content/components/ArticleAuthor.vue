<template>
  <div class="author-box">
    <div class="author-base">
      <div class="author-img">
        <img :src="avatar" alt />
      </div>
      <div class="author-info">
        <div class="author-name">{{nickname}}</div>
        <div class="pub-info">
          <span class="pub-time">{{pub_time}}</span><span class="read-nums">阅读 {{read_nums}}</span>
        </div>
      </div>
    </div>
    <div class="follow">
      <span>关注</span>
    </div>
  </div>
</template>

<script>
import { getAuthorInfo } from "@/api/classic";
import {getFormatDate} from "@/utils/util"
export default {
  data() {
    return {
      nickname:'',
      avatar:"",
      read_nums:0,
      pub_time:""
    };
  },
  props: ["articleInfo"],

  watch: {
    articleInfo() {
      this.read_nums = this.articleInfo.read_nums
      this.pub_time = getFormatDate(this.articleInfo.createdAt)
      getAuthorInfo(this.articleInfo.id).then((res) => {
        if(res.code===200){
          this.nickname = res.data.nickname
          this.avatar = res.data.avatar
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
  border-bottom:1px solid rgba(0,0,0,0.1);
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
        .pub-time {
          color: gray;
          font-size: 14px;
          margin-right: 10px;
        }
        .read-nums {
          color: gray;
          font-size: 14px;
        }
      }
    }
  }
  .follow {
    margin-right: 25px;
    color: skyblue;
    border: 1px solid skyblue;
    padding: 1px 10px;
  }
}
</style>