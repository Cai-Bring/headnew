<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="lists">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="head">
          <img :src="item.user.head_img" />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replay(item)">回复</span>
        </div>
        <mycommentitem v-if="item.parent" :comment="item.parent" @gogogo="replay"></mycommentitem>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    <comments :articles="articles" @refresh="refresh" :obj="obj" @closecomment="closecomment"></comments>
  </div>
</template>

<script>
import comments from "@/components/comment.vue";
import myheader from "@/components/myhead.vue";
import { getCommentList } from "@/apis/article.js";
import { getarticleid } from "@/apis/user.js";
import mycommentitem from "@/components/commentitem.vue";
export default {
  components: {
    myheader,
    mycommentitem,
    comments
  },
  data() {
    return {
      commentList: [],
      articles: "",
      obj: null
    };
  },
  async mounted() {
    this.init();
    let res2 = await getarticleid(this.$route.params.id);
    if (res2.status === 200) {
      // console.log(res2);
      this.articles = res2.data.data;
    }
  },
  methods: {
    async init() {
      let res = await getCommentList(this.$route.params.id, {
        pageSize: 20,
        pageIndex: 1
      });
      // console.log(res);
      this.commentList = res.data.data;
      this.commentList.map(value => {
        value.user.head_img = "http://127.0.0.1:3000" + value.user.head_img;
        return value;
      });
    },
    refresh() {
      this.init();
      window.scrollTo(0, 0);
    },
    replay(item) {
      // console.log(item);
      this.obj = item;
    },
    closecomment() {
      this.obj = null;
    }
  }
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  padding-bottom: 50px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>