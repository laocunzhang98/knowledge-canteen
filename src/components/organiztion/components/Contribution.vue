<template>
  <div>
    <div class="first">
      <el-row :gutter="10">
        <el-col :span="4" :xs="0" class>
          <el-card class="member">
            <div class="m-total">
              <span>成员总数</span>
              <div class="num">{{memberCount}}</div>
            </div>
            <div class="manger">管理员 {{managerCount}}</div>
          </el-card>
        </el-col>
        <el-col :span="10" :xs="12">
          <el-card class="member">
            <el-col :span="6">
              <div class="m-total">
                <span>文章总数</span>
                <div class="num">1</div>
              </div>
            </el-col>
            <el-col :span="18">
              <div id="abar" style="width:250px;height:130px;"></div>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="10" :xs="12">
          <el-card class="member">
            <el-col :span="6">
              <div class="m-total">
                <span>文件总数</span>
                <div class="num">1</div>
              </div>
            </el-col>
            <el-col :span="18">
              <div id="files" style="width:250px;height:130px;"></div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="second">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card class="contribution">
            <div id="contribution" style="height:200px;width:450px"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="contribution">
            <div id="contributions" style="height:200px;width:450px"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {getManagerMember,getOrgMembers} from "@/api/team"
export default {
  data() {
    return {
      memberCount:0,
      managerCount:0

    }
  },
  created(){
    getManagerMember({organize_id:this.$route.params.id}).then(res=>{
      this.managerCount =  res.data.count
    })
    getOrgMembers({organize_id:this.$route.params.id}).then(res=>{
      this.memberCount =  res.data.count
    })
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("abar"));

      // 指定图表的配置项和数据
      var option = {
        legend: {
          orient: "vertical",
          right: "10%",
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            name: "文章类型",
            avoidLabelOverlap: false,
            data: [
              {
                value: 335,
                name: "衬衫",
              },
              {
                value: 310,
                name: "羊毛衫",
              },
              {
                value: 234,
                name: "雪纺衫",
              },
              {
                value: 135,
                name: "裤子",
              },
              {
                value: 1548,
                name: "袜子",
              },
            ],
            center: ["25%", "45%"],
            radius: ["40%", "70%"],
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("files"));

      // 指定图表的配置项和数据
      var option = {
        legend: {
          orient: "vertical",
          right: "10%",
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            name: "文章类型",
            avoidLabelOverlap: false,
            data: [
              {
                value: 335,
                name: "衬衫",
              },
              {
                value: 310,
                name: "羊毛衫",
              },
              {
                value: 234,
                name: "雪纺衫",
              },
              {
                value: 135,
                name: "裤子",
              },
              {
                value: 1548,
                name: "袜子",
              },
            ],
            center: ["30%", "45%"],
            radius: ["40%", "70%"],
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      setTimeout(function (){
        window.onresize = function () {
          myChart.resize();
        }
    },200)
    },
    myEcharts1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("contribution"));
      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: "10%",
          bottom: "10%",
          top: "10%",
          right: "10%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {},
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts3() {
      var myChart = this.$echarts.init(document.getElementById("contributions"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        grid: {
          left: "10%",
          bottom: "10%",
          top: "10%",
          right: "10%",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: "#a90000",
                },
              },
              150,
              80,
              70,
              110,
              130,
            ],
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
    this.myEcharts1();
    this.myEcharts2();
    this.myEcharts3();
  },
};
</script>

<style lang="scss" scoped>
.first {
  margin-top: 20px;
  .member {
    height: 140px;
    padding: 10px;
    .m-total {
      font-weight: 600;
      .num {
        font-size: 28px;
        margin: 10px 0;
      }
    }
    .manger {
      color: #8c8c8c;
    }
  }
}
.second {
  margin-top: 10px;
  .contribution {
    height: 280px;
  }
}
</style>