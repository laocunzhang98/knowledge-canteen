<template>
  <div>
    <el-card>
      <div slot="header">团队设置</div>
      <div>
        <div class="basic">
          <div class="team-name">团队名称</div>
          <el-input v-model="name" placeholder></el-input>
          <div class="team-des">团队描述</div>
          <el-input v-model="des" placeholder type="textarea"></el-input>
          <div class="team-avatar">
            <div>头像</div>
            <div class="avatar">
              <img src alt />
              <div class="upload">
                <el-upload action :show-file-list="false">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="update">
            <el-button size="small">更新</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      des: "",
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 200px;
  height: 32px;
  line-height: 32px;
}
.basic {
  font-size: 14px;
  .team-name {
  }
  .team-des {
    margin-top: 15px;
  }
  .team-avatar {
    margin-top: 15px;
    .avatar {
      display: flex;
      align-items: center;
      img {
        margin-top: 10px;
        height: 70px;
        width: 70px;
      }
      .upload{
        margin-left: 20px;
      }
    }
  }
  .update {
    margin-top: 25px;
  }
}
</style>