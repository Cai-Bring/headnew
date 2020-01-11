<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span
        class="comment"
        @click="$router.push({path:`/comment/${articles.id}`})"
        v-if="$route.name==='ArticleDetail'"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{articles.comment_length}}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{active:articles.has_star}"
        @click="collectThisArticle"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span @click="send">发送</span>
        <span @click="closecomment">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入事件总线
// import bus from "@/utiles/eventBUS.js";
import { collectArticleById, commentarticle } from "@/apis/user.js";
export default {
  props: ["articles", "obj"],
  data() {
    return {
      isFocus: false,
      theBUS: ""
    };
  },

  // 监听事件总线
  // mounted() {
  //   bus.$on("gogogo", data => {
  //     console.log(data);
  //     this.isFocus = true;
  //     this.theBUS = data;
  //   });
  // },

  methods: {
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      setTimeout(() => {
        this.$refs.commtext.focus();
      }, 1);
    },
    async collectThisArticle() {
      let res = await collectArticleById(this.articles.id);
      this.$toast.success(res.data.message);
      this.articles.has_star = !this.articles.has_star;
    },
    async send() {
      let data = {
        content: this.$refs.commtext.value
      };
      if (this.obj) {
        data.parent_id = this.obj.id;
      }
      // 事件总线的判断
      // else if (this.theBUS) {
      //   data.parent_id = this.theBUS.id;
      // }
      let res = await commentarticle(this.articles.id, data);
      if (res.status === 200) {
        this.$toast.success(res.data.message);
        this.isFocus = false;
        this.$refs.commtext.value = "";
        this.$emit("refresh");
      }
      // 事件总线传递完之后设置为null
      // this.theBUS = null;
    },
    closecomment() {
      this.isFocus = false;
      this.$emit("closecomment");
    }
  },
  watch: {
    obj() {
      if (this.obj) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.comment {
  position: fixed;
  bottom: 0;
  left: 0;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 10px;
  }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
  .active {
    color: #f00;
  }
}
</style>