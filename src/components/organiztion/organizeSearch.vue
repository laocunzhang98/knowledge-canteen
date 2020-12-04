<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              全部主题
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :icon=item.icon v-for="(item,index) in themeList" :key="index" >{{item.theme}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入搜索内容" v-model="input" size="small">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      themeList: [
        {icon: "el-icon-menu",theme:'全部主题'},
        {icon: "el-icon-s-custom",theme:'只看圈主'},
        {icon: "el-icon-folder",theme:'文件主题'},
        {icon: "el-icon-picture",theme:'图片主题'},
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  height: 100%;
  /deep/.el-card__body {
    padding: 0 !important;
    .el-col {
      display: flex;
      margin-left: 20px;
      align-items: center;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>