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
                <div class="num">{{artTotal}}</div>
              </div>
            </el-col>
            <el-col :span="18">
              <div id="abar" style="height:130px;"></div>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="10" :xs="12">
          <el-card class="member">
            <el-col :span="6">
              <div class="m-total">
                <span>文件总数</span>
                <div class="num">{{fileTotal}}</div>
              </div>
            </el-col>
            <el-col :span="18">
              <div id="files" style="height:130px;"></div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="second">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card class="contribution">
            <div id="contribution" style="height:200px;"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="contribution">
            <div id="contributions" style="height:200px;"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getManagerMember,
  getOrgMembers,
  getOrgArtClassify,
  getOrgFileType,
  getFileCount,
} from "@/api/team";
import   {getArticleCount}
 from '@/api/classic';
export default {
  data() {
    return {
      memberCount: 0,
      managerCount: 0,
      artClassify: [], // 文章分类
      artData: [],
      filetype: [], // 文件类型
      fileData: [],
      fileTotal:0,
      artTotal:0
    };
  },
  created() {
    let params = { organize_id: this.$route.params.id };
    getManagerMember(params).then((res) => {
      this.managerCount = res.data.count;
    });
    getOrgMembers(params).then((res) => {
      this.memberCount = res.data.count;
    });
    getOrgArtClassify(params).then((res) => {
      this.artData = res.data;
      this.artClassify = [];
      for (let classify of res.data) {
        this.artClassify.push(classify.name);
      }
    });
    getArticleCount(params).then(res=>{
      this.artTotal = res.data
    })
    getOrgFileType(params).then((res) => {
      this.fileData = res.data;
      this.filetype = [];
      for (let mimetype of res.data) {
        this.filetype.push(mimetype.name);
      }
    });
    getFileCount(params).then(res=>{
      this.fileTotal = res.data
    })
  },
  watch: {
    artData() {
      this.myEcharts();
    },
    fileData() {
      this.myEcharts2();
    },
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("abar"));

      // 指定图表的配置项和数据
      var option = {
        legend: {
          orient: "vertical",
          width: "auto",
          right: "0%",
          data: this.artClassify,
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            name: "文章类型",
            avoidLabelOverlap: false,
            data: this.artData,
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
      var option = {
        legend: {
          orient: "vertical",
          width: "auto",
          right: "-8%",
          data: this.filetype,
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            name: "文章类型",
            avoidLabelOverlap: false,
            data: this.fileData,
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
      var myChart = this.$echarts.init(
        document.getElementById("contributions")
      );
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
    this.myEcharts2();
    this.myEcharts3();
  },
};
</script>

<style lang="scss" scoped>
.first {
  margin-top: 20px;
  .member {
    height: 160px;
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