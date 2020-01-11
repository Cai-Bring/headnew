<template>
  <div class="commentItem">
    <mycommentitem v-if="comment.parent" :comment="comment.parent" @gogogo="replycomment"></mycommentitem>
    <div class="top">
      <div class="left">
        <span>{{comment.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <!-- 父传子做法 -->
      <span class="callback" @click="replycomment(comment)">回复</span>
      <!-- 事件总线做法 -->
      <!-- <span class="callback" @click="toBUS">回复</span> -->
    </div>
    <div class="bottom">{{comment.content}}</div>
  </div>
</template>

<script>
// import bus from "@/utiles/eventBUS.js";
export default {
  props: ["comment"],
  name: "mycommentitem",
  methods: {
    replycomment(comment) {
      // console.log(comment);
      this.$emit("gogogo", comment);
    }
    // 事件总线发送gogogo方法
    // toBUS() {
    //   bus.$emit("gogogo", this.comment);
    // }
  }
};
</script>

<style lang='less' scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 5px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
    padding-top: 3px;
    .callback {
      padding-right: 5px;
    }
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>