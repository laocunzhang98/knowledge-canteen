<template>
  <div id="topic-emoji" @click="fontCount">
    <div class="emoji-btn" @click.stop="emojiActive=!emojiActive">
      <i class="iconfont icon-A"></i>
      <span style="font-size:14px;color:blue">表情</span>
    </div>
    <div class="emoji-list" v-show="emojiActive"  @click.stop="emojiActive=true">
      <div class="triangle"></div>
      <ul>
        <li
          class="emoji-item"
          v-for="(item,index) in emojiLists.srcs"
          :key="index"
          @click.stop="emojiSelect(index)"
        >
          <img :src="item" class="emoji" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emoji from "@/components/dynamic/emoji";
export default {
  data() {
    return {
      emojiActive: false,
      emojiLists: emoji,
    };
  },
  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        this.emojiActive = false;
      },
      false
    );
  },
  methods: {
    fontCount() {
      let innertext = document.getElementsByClassName(
        "textarea"
      )[document.getElementsByClassName("textarea").length-1].innerHTML;
      let strCount = this.removeHTMLTag(innertext).length;
      this.inputCount = strCount;
      if (strCount > this.fontCounts) {
        this.inputCount = this.fontCounts;
        
        document.getElementsByClassName(
        "textarea"
      )[document.getElementsByClassName("textarea").length-1].innerHTML = innertext.substr(
          0,
          this.fontCounts
        );
      }
    },
    emojiSelect(index) {
      
      document.getElementsByClassName(
        "textarea"
      )[document.getElementsByClassName("textarea").length-1].innerHTML += `<img style="width: 22px;height: 22px;margin: 0 2px;vertical-align: sub;" draggable="false" alt="" src="${this.emojiLists.srcs[index]}">`;
    },
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, ""); //去除行尾空白
      str = str.replace(/&nbsp;/gi, ""); //去掉尾部空格
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  color: skyblue;
}
/deep/.emoji {
  width: 22px !important;
  height: 22px;
  margin: 0 2px;
  vertical-align: sub;
}
.emoji-item:hover {
  transform: scale(1.3);
  transition: 0.4s;
}
.emoji-list {
  width: 300px;
  height: 190px;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  z-index: 2999;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    li {
      margin: 2px;
    }
  }
}

#topic-emoji {
  box-sizing: border-box;
  .emoji-btn {
    display: flex;
    align-items: center;
    width: 50px;
    cursor: pointer;
  }
}
</style>