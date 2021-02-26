<template>
  <div class="content" @click="Aticledetail">
    <div class="info-box">
      <div class="meta-row">
        <div class="nickname" @click.stop="jumpUserHome">
          {{result.name}}
          <span>·</span>
        </div>
        <div class="pubtime">
          <time-diff :date="result.createdAt"></time-diff>
        </div>
        <div class="label" v-show="result.label">
          <span>·</span>
          {{result.label}}
        </div>
      </div>
      <div class="title-row">{{result.title}}</div>
      <div class="action-row">
        <div class="favor" @click.stop="favor">
          <img :src="favorImg" alt v-show="!favorShow" />
          <img :src="favorImgActive" alt v-show="favorShow" />
          <span :class="{favnum:favorShow}">{{result.fav_nums}}</span>
        </div>
        <div class="comment">
          <img src="@/assets/home/common.png" alt />
          <span>{{result.com_nums}}</span>
        </div>
      </div>
    </div>
    <div class="img-box" v-if="result.image">
      <img :src="result.image" alt />
    </div>
    <div class="option" v-show="(isEdit||result.uid==uid)&&isUser">
      <el-dropdown>
      <div @click.stop>
        <img src="../../../assets/header/op.png" alt />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="edit">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="del">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    
  </div>
</template>

<script>
import TimeDiff from "@/utils/TimeDiff";
import { Favor, getFavorList,DeleteArticle } from "@/api/classic";
export default {
  data() {
    return {
      favorImg: require("@/assets/home/favor.png"),
      favorImgActive: require("@/assets/home/favorActive.png"),
      articleList: [],
      favorShow: false,
      isEdit:false,
      isUser:true
    };
  },

  mounted() {
    if(this.$route.params.id){
      this.isEdit = true
    }
    if(this.$route.params.userid){
      this.isUser = false
      if(this.$route.params.userid == this.$storage.get("uid")){
        this.$router.push("/user")
      }
    }
    getFavorList().then((res) => {
      if (res.code == 200) {
        this.articleList = res.data;
        if (this.articleList.indexOf(this.result.id) != -1) {
          this.favorShow = true;
        }
      }
    });
  },
  components: {
    TimeDiff,
  },
  props: {
    result: {
      type: Object,
    },
    uid:{
      type:Number
    }
  },

  methods: {
    jumpUserHome(){
      this.$router.push({
        path:`/users/${this.result.uid}/article`
      })
    },
    edit(){
      this.$router.push({
        path: "/edit",
        query: { article_id: this.result.id,team_id:this.$route.params.id},
      });
    },
  
    del(){
      DeleteArticle({article_id:this.result.id,organize_id:this.$route.params.id}).then(res=>{
        // this.$router.go(0)
      })
    },
    favor() {
      Favor({ article_id: this.result.id }).then((res) => {
        if (res.code === 200) {
          this.result.fav_nums += 1;
          this.favorShow = true;
        }
      });
    },
    Aticledetail() {
      let params = {}
      if (this.$route.params.id) {
        params.id= this.result.id
        params.organize_id = this.$route.params.id
      } 
      else {
        params.id = this.result.id
      }
      this.$router.push({
          name: "Article",
          params
      });
    }
  },
};
</script>

<style lang="scss" scoped>

::v-deep .el-dropdown-menu{
  margin-top: 0px !important;
  margin-left: 25px !important;
}
::v-deep .el-dropdown-menu__item{
  line-height: 16px;
  padding: 0 10px;
}

.log-hight-light {
  color: #ffe72d;
}
.option {
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
  img {
    height: 15px;
    width: 15px;
  }
}
.content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .info-box {
    margin-left: 30px;
    .meta-row {
      color: #b2bac2;
      font-size: 14px;
      display: flex;
      .nickname{
        &:hover{
          color: skyblue;
        }
      }
    }
    .title-row {
      margin-top: 10px;
      color: #2e3135;
      font-size: 18px;
      font-weight: 600;
    }
    .action-row {
      margin-top: 15px;
      display: flex;
      .comment,
      .favor {
        height: 25px;
        display: flex;
        align-items: center;
        border: 1px solid rgba(#000, 0.2);
        border-radius: 4px;
        padding: 0 10px;
        margin-right: 10px;
        cursor: pointer;
        span {
          color: rgba(#000, 0.4);
        }
        img {
          height: 15px;
          width: 15px;
          margin-right: 5px;
        }
      }
    }
  }
  .img-box {
    margin-right: 30px;
    position: relative;
    img {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
      border-radius: 4px;
      height: 80px;
      width: 80px;
    }
  }
}
.favnum {
  color: rbg(26, 250, 41) !important;
  font-weight: 600;
}
</style>