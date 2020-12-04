<template>
  <div class="dynamic-card">
    <el-card>
      <div class="dynamic-swiper">
        <div class="dynamic-input">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 7}"
            placeholder="告诉你个小秘密,发布消息时加上合适的话题更容易被饭友看到呦！"
            maxlength="300"
            show-word-limit
            v-model="textarea"
          ></el-input>
        </div>
        <div class="dynamic-topic"></div>
      </div>
      <div class="dynamic-menu">
        <div class="topic">
          <div><i class="iconfont icon-A"></i> 表情</div>
          <div>表情</div>
          <div>表情</div>
          <div>表情</div></div>
        <div class="btn"><el-button type="primary">发布</el-button></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
    };
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
/deep/.el-card__body{
  padding-bottom: 10px;
}
.iconfont{
  color: skyblue;
}
.dynamic-card {
  margin: 15px;
  
  .dynamic-swiper {
    // padding: 15px 15px;
    .dynamic-input {
      /deep/.el-textarea__inner {
        border-radius: 4px 4px 0 0;
        border-bottom: none;
        &:focus {
          outline: none;
          border-color: #dcdfe6;
        }
        &:hover {
          outline: none;
          border-color: #dcdfe6;
        }
      }
      /deep/.el-input__count {
        position: absolute;
        bottom: -20px;
        z-index: 99;
      }
    }
    .dynamic-topic {
      border-radius: 0 0 4px 4px;
      position: relative;
      height: 30px;
      width: 100%;
      border: 1px solid #dcdfe6;
      border-top: none;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
  .dynamic-menu{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topic{
      display: flex;
      justify-content: flex-start;
    }
  }
}
</style>
