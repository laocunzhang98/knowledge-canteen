<template>
  <div class="content-box">
    <el-card class="card-box">
      <div class="content-header">
        <el-menu default-active="1"
          class="el-menu-demo"
          mode="horizontal" 
          @select="menuSelect">
          <el-menu-item index="1">我的云盘</el-menu-item>
        </el-menu>
      </div>
      <div class="up-btn">
        <div class="commit"><el-button type="primary" size="small"><i class="el-icon-upload" style="margin-right:5px"></i>上传</el-button></div>
        <div><el-button size="small"><i class="el-icon-folder-add" style="margin-right:5px"></i> 新建文件夹</el-button></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.content-box{
  margin-top: 15px;
  .up-btn{
    margin-left: 15px;
    margin-top: 5px;
    display: flex;
    .commit{
      margin-right: 20px;
    }
  }
}
/deep/.el-menu-item{
  font-weight: 600;
  font-size: 20px;
}
  .el-menu{
    background-color: #fff!important;
  }
  /deep/.el-card{
    height: 500px;
  }
</style>