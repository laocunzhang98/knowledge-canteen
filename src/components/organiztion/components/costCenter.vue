<template>
  <div>
    <el-card>
      <div class="cost-info">
        <div class="header">
          <div class="title">默认团队</div>
          <el-button type="success" size="small">立即升级</el-button>
        </div>
        <span>升级至高级版享受更多权益!<a href="#">了解更多</a></span>
      </div>
      <div class="member-usage">
        <div class="scale">人数规模</div>
        <div class="member">50人</div>
        <el-progress :percentage="30" :stroke-width="20" :show-text="false"></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
.cost-info{
  padding: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  .header{
    display: flex;
    justify-content: space-between;
    .title{
      font-weight: 600;
    }
  }
}
.member-usage{
  padding: 10px;
  margin-top: 20px;
  width: 200px;
  .member{
    margin: 10px 0;
    font-size: 22px;
    font-weight: 600;
  }
  .scale{
    font-size: 14px;
  }
}
</style>