<template>
  <div class="author">
    <el-card class="box-card">
      <div class="header"><slot name="title"></slot></div>
      <div><slot name="identity"></slot></div>
      <div class="achieve">
        <div class="support">
          <img src="../../assets/home/zan.png" alt />
          <span>获得点赞</span>
          <span>555555</span>
        </div>
        <div class="read">
          <img src="../../assets/home/read.png" alt />
          <span>文章被阅读</span>
          <span>999999</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.author {
  .box-card {
    .header{
      padding: 0 0 10px 5px;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      font-size: 16px;
      font-weight: 500;
    }
    .achieve {
      margin-top: 10px;
    .support {
      display: flex;
      align-items: center;
      padding-left: 5px;
      span{
        font-size: 14px;
        font-weight: 600;
        padding-left: 5px;
      }
      img {
        height: 20px;
        width: 25px;
      }
    }
    .read {
      display: flex;
      align-items: center;
      margin-top: 15px;
      padding-left: 5px;
      span{
        font-size: 14px;
        font-weight: 600;
        padding-left: 5px;
      }
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
}
  }
  
</style>