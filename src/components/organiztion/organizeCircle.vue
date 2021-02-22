<template>
  <div>
    <el-row class="el-row">
      <el-col :span="6" :xs="0">
        <organize-create></organize-create>
        <organize-nav></organize-nav>
        </el-col>
      <el-col :span="16" :xs="24">
        <div class="hot-circle">
          <el-card>
            <div>xxxxxx</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import organizeCreate from '@/components/organiztion/organizeCreate'
import organizeNav from './organizeNav'
export default {
  components:{
    organizeNav,
    organizeCreate
  }
}
</script>

<style lang="scss" scoped>
  .hot-circle{
    margin-top: 20px;
    padding: 0 15px;
  }
</style>