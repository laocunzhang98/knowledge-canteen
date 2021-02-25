<template>
  <div class="article-content" @click="ceshi">
    <el-row>
      <el-col :span="5" :xs="0">
        <div></div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="content-box">
          <article-author :articleInfo="articleInfo"></article-author>
          <div class="author-info">
            <div class="cover">
              <img :src="imageUrl" alt v-if="imageUrl" />
            </div>
            <div class="title">
              <div id="flag">{{title}}</div>
            </div>
          </div>
          <div class="content">
            <mavon-editor codeStyle="monokai" v-html="content" style="padding:25px" ref="helpDocs"></mavon-editor>
          </div>
          <div class="comment">
            <comment-view :articleInfo="articleInfo"></comment-view>
          </div>
        </div>
      </el-col>
      <el-col :span="7" :xs="0">
        <div class="aside">
          <div class="about-author">
            <about-author :articleUid="uid">
              <template v-slot:title>
                <div>关于作者</div>
              </template>
              <template v-slot:identity>
                <div class="auth-info">
                  <img src="../assets/header/avator.jpg" alt />
                  <div class="user-item">
                    <div class="nickname">{{articleInfo.nickname}}</div>
                    <div class="position" :title="articleInfo.describe">{{articleInfo.describe}}</div>
                  </div>
                </div>
              </template>
            </about-author>
          </div>
          <div class="about-article">
            <about-article :articleId="id">
              <template v-slot:title>
                <div>相关文章</div>
              </template>
            </about-article>
          </div>
          <div class="article-nav" :class="{fixed:isFixed}">
            <div class="catalog">目录</div>
            <ul class="nav-list">
              <li
                v-for="(item, idx) in navList"
                :key="idx"
                :class="{first:item.level==1,second:item.level==2}"
                @click="pageJump(item.id)"
              >
                <a href="javascript:;">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/classic";
import CommentView from "@/components/comment/CommentView";
import ArticleAuthor from "@/components/content/components/ArticleAuthor";
import aboutAuthor from "@/common/components/aboutAuthor";
import aboutArticle from "@/common/components/aboutArticle";
import { throttle } from "@/utils/util";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      scrollTop: 0,
      isFixed: false,
      id: "",
      content: "",
      title: "",
      imageUrl: "",
      articleInfo: {},
      rcontent: "",
      navList: [],
      titleClickScroll: false,
      docsFirstLevels: [],
      docsSecondLevels: [],
      uid: 0,
    };
  },
  components: {
    ArticleAuthor,
    CommentView,
    aboutAuthor,
    aboutArticle,
  },
  computed: {
    ...mapGetters(["commentShow"]),
  },
  created() {
    let that = this;
      getArticleDetail(this.$route.params.id).then((res) => {
        // console.log(res);
        this.content = res.data.content;
        this.title = res.data.title;
        this.imageUrl = res.data.image;
        this.articleInfo = res.data;
        this.rcontent = res.data.rcontent;
        this.navList = this.handleNavTree();
        this.uid = this.articleInfo.uid;
      });
    window.onscroll = throttle(function () {
      // console.log("距离顶部距离"+that.$el.querySelector(".article-nav").offsetTop)
      if (
        document.documentElement.scrollTop >=
          that.$el.querySelector(".article-nav").offsetTop &&
        !that.isFixed
      ) {
        that.scrollTop = that.$el.querySelector(".article-nav").offsetTop;
        that.isFixed = true;
      }
      if (document.documentElement.scrollTop < that.scrollTop - 10) {
        that.isFixed = false;
      }
      // console.log("卷去的距离是:"+document.documentElement.scrollTop)
    }, 50);
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    ...mapMutations(["setCommentShow"]),
    ceshi() {
      this.setCommentShow(false);
    },
    currentClick(index) {
      this.activeIndex = index;
      this.getDocsSecondLevels(index);
    },

    docsScroll() {
      if (this.titleClickScroll) {
        return;
      }
      let scrollTop = this.$refs.helpDocs.scrollTop;
      console.log(this.$refs.helpDocs.scrollTop);
      let firstLevelIndex = this.getLevelActiveIndex(
        scrollTop,
        this.docsFirstLevels
      );
      this.currentClick(firstLevelIndex);

      let secondLevelIndex = this.getLevelActiveIndex(
        scrollTop,
        this.docsSecondLevels
      );
      this.childrenCurrentClick(secondLevelIndex);
    },
    pageJump(id) {
      console.log(id);
      this.titleClickScroll = true;
      this.$refs.helpDocs.scrollTop =
        document.getElementById(id).offsetTop + 80;
      setTimeout(() => {
        this.titleClickScroll = false;
        document.documentElement.scrollTop =
          document.getElementById(id).offsetTop +
          this.$el.querySelector("#flag").offsetTop +
          50;
      }, 100);
    },

    handleNavTree() {
      const navs = this.getTitle(this.rcontent);
      navs.forEach((item) => {
        const parentIndex = this.getParentIndex(navs, item.index);
        item.parent = parentIndex;
      });
      return navs;
    },
    getParentIndex(nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].index;
        }
      }
    },
    find(arr, condition) {
      return arr.filter((item) => {
        for (let key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });
    },
    getTitle(content) {
      let nav = [];
      let tempArr = [];
      let index1 = -1;
      content = content.replace(/.*(?:\n)/g, function (match, m1, m2) {
        index1 = 1 + index1;
        let b = match.replace("\n", "");
        let a = match.replace("\n", "_" + index1 + "\n");
        a.replace(/(^#+)[^#][^\n]*?(?:\n)/, function (match, m1, m2) {
          let title = match.replace("\n", "");
          title = title.replace(/^#+ /, "").replace(/^\s*/, "");
          let level = m1.length;
          tempArr.push({
            title: title.replace(/\([^)]*?\)/, "").replace(/_(?<=_)\w+$/, ""),
            id: title
              .replace(/\s/g, "_")
              .replace(/[\u4e00-\u9fa5]/g, "")
              .replace(/\W/g, ""),
            level: level,
            children: [],
          });
        });
      });
      console.log(tempArr);
      // 只处理一级二级标题，以及添加与id对应的index值
      nav = tempArr.filter((item) => item.level <= 2);
      let index = 0;
      return (nav = nav.map((item) => {
        item.index = index++;
        return item;
      }));
    },
    appendToParentNav(nav, parentIndex, newNav) {
      let index = this.findIndex(nav, {
        index: parentIndex,
      });
      nav[index].children = nav[index].children.concat(newNav);
    },
    findIndex(arr, condition) {
      let ret = -1;
      arr.forEach((item, index) => {
        for (var key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        ret = index;
      });
      return ret;
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed {
  top: 50px;
  position: fixed;
}
li {
  padding: 3px 10px;
}
.catalog {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-left: 5px;
}
.first {
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: rgb(235, 237, 239);
  }
  &:before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #000;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -3px;
  }
  a {
    color: #000;
  }
}
.second {
  padding-left: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: rgb(235, 237, 239);
  }
  &:before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #000;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -3px;
  }
  a {
    color: #000;
  }
}
.article-content {
  margin-top: 20px;
  padding-bottom: 50px;
  .content-box {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    .author-info {
      width: 100%;
      background-color: #fff;
      .cover {
        padding-bottom: 20px;
        img {
          padding: 5px 25px;
          width: calc(100% - 50px);
          height: 100%;
        }
      }
      .title {
        white-space: wrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 20px 25px;
        font-weight: 600;
        font-size: 30px;
      }
    }
    .content {
      .shadow {
        box-shadow: none !important;
      }
    }
    .comment {
      padding: 10px 25px;
      background-color: #fff;
    }
  }
  .aside {
    width: 240px;
    margin-left: 20px;
    .about-article {
      margin-top: 20px;
    }
    .about-author {
      .auth-info {
        display: flex;
        align-items: center;
        .user-item {
          margin-left: 10px;
          .nickname {
            font-weight: 600;
            font-size: 20px;
          }
          .position {
            color: gray;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 120px;
            cursor: pointer;
          }
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
    }

    .article-nav {
      margin-top: 20px;
    }
  }
}
</style>