<template>
  <div class="dynamic-info">
    <el-card class="box-card">
      <div class="person-info">
        <div class="person-detail-info">
          <div class="person-picture"><a href=""><img src="" alt=""></a></div>
          <div class="person-information">
            <div class="Nickname">华航一枝花</div>
            <div class="description"><span> 路漫漫其修远兮,我将上下而求索xxxxxxx</span></div>
          </div>
        </div>
        
      </div>
      <div class="person-label">
        <div class="label">
          <span><a href="">动态</a></span>
          <span class="count">10</span>
        </div>
        <div class="label">
          <span><a href="">动态</a></span>
          <span class="count">10</span>
        </div>
        <div class="label">
          <span><a href="">动态</a></span>
          <span class="count">10</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.el-card__body{
  height: 100% ;
}
  .dynamic-info{
    margin-top: 15px;
      width: 230px;
      height: 163px;
    .box-card{
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .person-info{
        flex: 1;
        .person-detail-info{
          display: flex;
          .person-picture{
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background-color: red;
            flex: 0 0 50px;
            
          }
          .person-information{
            margin-left: 20px;
            .Nickname{
              font-weight: 600;
              font-size: 16px;
              line-height: 1.2;
            }
            .description{
              width: 100px;
              height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 10px;
              font-size: 12px;
              color: rgb(158,164,170);
            }
          }
        }
      }
      .person-label{
        flex:1;
        display: flex;
        height: 60%;
        justify-content: space-around;
        align-items: center;
        .label{
          display: flex;
          flex-direction: column;
          align-items: center;
          
        }
      }
    }
  }
</style>