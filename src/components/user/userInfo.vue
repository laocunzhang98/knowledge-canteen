<template>
  <div class="person-info">
    <el-card>
      <el-row class="info-swiper">
        <el-col class="img-box" :span="6"><img src="" alt=""></el-col>
        <el-col class="info-box" :span="12">
          <div class="info-detail">
            <span class="nickname"> 华航一枝花</span>
            <span class="job"><i class="el-icon-ice-cream-round"></i> 前端爱好者</span>
            <span class="description"><i class="el-icon-s-opportunity"></i> 路漫漫求修远兮,吾将上下而求索.</span>
          </div>
        </el-col>
        <el-col class="active-box" :span="6">
            <el-button>编辑个人资料</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .person-info{
    .info-swiper{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
      box-sizing: border-box;
      .img-box{
        height: 80px;
        width: 80px;
        border-radius: 40px;
        background-color: red;
      }
      .info-box{
        .info-detail{
          display: flex;
          flex-direction: column;
          .nickname{
            font-weight: 600;
            font-size: 24px;
          }
          .job{
            font-size: 14px;
            color: rgb(136,119,145);
          }
          .description{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 14px;
            color: rgb(136,119,145);
          }
        }
      }
    }
    
  }
</style>