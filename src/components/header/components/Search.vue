<template>
  <div class="navbar">
    <div class="navbar-label" v-show="isShow">
      <div class="navbar-label-item" v-for="(labelitem,index) in labelList" :key="index">
        <a
          href="#"
          @click="focusLbael(index);goPage(index)"
          :style="{color:index==headerIndex?'rgb(64,158,255)':''}"
        >{{labelitem}}</a>
      </div>
    </div>
    <div class="navbar-labelFold" v-show="!isShow">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="font-size:16px">
          全民食堂
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(labelitem,index) in labelList" :key="index">
            <a href="#" @click="focusLbael(index);goPage(index)" style="display:inline-block;height:100%; padding:0 20px">{{labelitem}}</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="navbar-search">
      <el-input v-model="input" placeholder="请输入内容" size="small">
        <el-button slot="append" icon="el-icon-search" class="btn"></el-button>
      </el-input>
    </div>
    <div class="edit" @click="addedit">
      <el-button type="primary" size="small">写文章</el-button>
    </div>
  </div>
</template>

<script>
import { mixin } from "../../../mixin/mixin";
import { mapGetters, mapMutations } from "vuex";
export default {
  mixins: [mixin],
  computed: {
    ...mapGetters(["isShow", "headerIndex"]),
  },
  mounted() {
    if(this.$route.path === '/'){
      this.$storage.set("headerIndex", 0);
    }
    if(this.$route.path === '/pins'){
      this.$storage.set("headerIndex", 1);
    }
    if(this.$route.path === '/yunstorage'){
      this.$storage.set("headerIndex", 2);
    }
    if(this.$route.path === '/organize'){
      this.$storage.set("headerIndex", 4);
    }
    let index = this.$storage.get("headerIndex");
    this.focusLbael(index);
  },
  methods: {
    ...mapMutations(["setHeaderIndex"]),
    focusLbael(index) {
      this.setHeaderIndex(index);
      this.$storage.set("headerIndex", index);
    },
    goPage(index) {
      if (index === 0) {
        this.$router.push("/");
      } else if (index === 1) {
        this.$router.push("/pins");
      } else if (index === 4) {
        this.$router.push("/organize");
      }else if (index===2){
        this.$router.push("/yunstorage");
      }
      
    },
    addedit(){
      this.$router.push("/edit")
    }
  },
  data() {
    return {
      input: "",
      labelList: ["全民食堂", "茶余饭后", "私房菜", "黑暗料理", "饭友圈"],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu__item{
  padding: 0;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .navbar-label {
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-right: 40px;
    margin-left: 10px;
  }
  .navbar-labelFold {
    flex: 1;
    margin-left: 10px;
  }
  .navbar-search {
    flex: 0 0 40%;
    .btn:hover {
      font-weight: 700;
      color: #000;
    }
  }
  .edit{
    margin-left: 10px;
  }
}
</style>