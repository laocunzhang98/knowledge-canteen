<template>
  <div>
    <div
      class="follow-box"
      v-for="(item,index) in result"
      :key="index"
      @click="jumpUserInfo(item.id)"
    >
      <div class="avatar">
        <img :src="item.avatar" alt />
      </div>
      <div class="follow-info">
        <div class="nickname">{{item.nickname}}</div>
        <div class="describe">{{item.describe}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFollowUser } from "@/api/user";
export default {
  data() {
    return {
      result: [],
    };
  },
  created() {
    let params = {}
    if(this.$route.params.userid){
      params.id = this.$route.params.userid
    }
    this.initFollow(params)
  },
  methods: {
    initFollow(params) {
      getFollowUser(params).then((res) => {
        console.log(res);
        this.result = res.data;
      });
    },
    jumpUserInfo(id) {
      this.$router.push({
        path: `/users/${id}/article`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.follow-box {
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .avatar {
    flex: 0 0 12%;
    img {
      height: 60px;
      width: 60px;
      border-radius: 10px;
    }
  }
  .follow-info {
    flex: 0 0 78%;
    .nickname {
      font-weight: 600;
    }
    .describe {
      font-size: 12px;
      color: #b9c0c8;
    }
  }
  .follow {
    flex: 0 0 10%;
  }
}
</style>