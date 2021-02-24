<template>
  <div class="comment-card">
    <div class="avatar">
      <img :src="comment.avatar" alt />
    </div>
    <div class="content-box">
      <div class="nickname">{{comment.nickname}}<span class="nametip" v-show="comment.article_uid===comment.uid">(作者)</span><span class="job">{{comment.job}}</span></div>
      <div class="content">
        <div v-if="comment.replier" class="replier">
          回复
          <span>{{comment.replier}}:</span>
        </div>
        <div v-html="comment.content"></div>
      </div>
      <div class="content-footer">
        <div class="time">
          <time-diff :date="comment.createdAt"></time-diff>
        </div>
        <div class="reply" @click.stop="reply">
          <i class="el-icon-chat-dot-round"></i> 回复
        </div>
      </div>
      <div v-if="showInput" @click.stop>
        <comment-input :secondComment="secondComment" @success="success"></comment-input>
      </div>
    </div>
  </div>
</template>

<script>

import TimeDiff from "@/utils/TimeDiff";
import CommentInput from "@/components/comment/components/CommentInput";
import { comment } from "@/api/comment";
export default {
  data() {
    return {
      showInput: false,
      secondComment: {
        article_id: this.comment.article_id,
        article_uid: this.comment.article_uid,
        comment_id:
          this.comment.comment_id == 0
            ? this.comment.id
            : this.comment.comment_id,
        oid: this.comment.uid,
      },
    };
  },

  components: {
    TimeDiff,
    CommentInput,
  },
  props: {
    comment: {
      type: Object,
    },
  },
  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        this.showInput = false;
      },
      false
    );
  },
 
  methods: {
    reply() {
      this.showInput = !this.showInput;
    },
    success() {
      this.showInput = false;
      this.$emit("secondesuccess", "success");
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  .avatar {
    width: 8%;
    min-width: 50px;
    margin-top: 15px;
    img {
      margin-left: 10px;
      width: 40px;
      height: 40px;
    }
  }
  .content-box {
    width: 90%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 10px;
    .nickname{
      .nametip{
        font-size: 14px;
      }
      .job{
        font-size: 14px;
        color: #909090;
      }
    }
    .content {
      margin-top: 10px;
      margin-left: 2px;
      color: #505050;
      font-size: 14px;
      display: flex;
      align-items: center;
      .replier {
        color: #17181a;
        span {
          color: #406599;
        }
      }
    }
    .content-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .time {
        font-size: 12px;
        color: #8a9aa9;
      }
      .reply {
        color: #8a93a0;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: skyblue;
        }
      }
    }
  }
}
</style>