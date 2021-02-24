<template>
  <div class="content clearfix" v-if="true">
    <transition name="bounce">
      <div class="header-container">
        <div class="logo">
          <a href="#">
            <img src="../../assets/header/logo.png" alt />
          </a>
        </div>
        <div class="search">
          <search-box></search-box>
        </div>
        <div class="person">
          <person-box></person-box>
        </div>
      </div>
    </transition>

    <el-backtop :bottom="60"></el-backtop>
  </div>
</template>
<script>
// import { mapGetters, mapMutations } from "vuex";
import SearchBox from "./components/Search";
import PersonBox from "./components/Person";
export default {
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(["headerShow"])
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
   
  },
  components: {
    SearchBox,
    PersonBox,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(0, 10, 0);
  }
  50% {
    transform: translate3d(0, 30, 0);
  }
  100% {
    transform: translate3d(0, 50, 0);
  }
}

.content {
  height: 50px;
}
.header-container {
  position: fixed;
  z-index: 1600;
  height: 50px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;

  .logo {
    flex: 0 0 20%;

    img {
      padding-top: 6px;
      margin-left: 10px;
      height: 50px;
      color: red;
    }
  }
  .search {
    flex: 0 0 60%;
  }
  .person {
    flex: 0 0 20%;
  }
}
</style>