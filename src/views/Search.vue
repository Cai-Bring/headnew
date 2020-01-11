<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="useKey" placeholder="请输入搜索关键词" shape="round" autofocus="true"></van-search>
      <div @click="isclick(useKey)">搜索</div>
    </div>
    <div class="historyList" v-if="historyList.length!==0">
      <h2>历史记录</h2>
      <p v-for="item in historyList" :key="item" @click="tosearch(item)">{{item}}</p>
      <button class="btn" @click="btn">清除历史记录</button>
    </div>
    <!-- <keep-alive> -->
    <div class="history">
      <articles v-for="value in searchList" :key="value.id" :post="value"></articles>
    </div>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import { searchArticle } from "@/apis/article.js";
import articles from "@/components/myartic.vue";
export default {
  components: {
    articles
  },
  data() {
    return {
      useKey: "",
      searchList: [],
      historyList: []
    };
  },
  mounted() {
    this.historyList = this.getdata();
  },
  methods: {
    async isclick(key) {
      // this.searchList = "";
      if (key === "") {
        this.$toast.fail("请输入关键字");
        return;
      }
      let arr = this.getdata();
      let index = arr.indexOf(key);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      arr.unshift(key);
      localStorage.setItem(
        "toutiao_search_history",
        JSON.stringify(arr.slice(0, 5))
      );
      let res = await searchArticle({ keyword: key });
      // console.log(res);
      if (res.data.data.length === 0) {
        this.$toast.fail("查询结果不存在");
      }
      this.searchList = res.data.data;
      this.historyList = this.getdata();
    },
    getdata() {
      return JSON.parse(localStorage.getItem("toutiao_search_history") || "[]");
    },
    tosearch(item) {
      this.isclick(item);
    },
    btn() {
      localStorage.removeItem("toutiao_search_history");
      this.historyList = "";
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  p {
    padding: 5px 0;
  }
  .btn {
    display: block;
    margin: 0 auto;
  }
}
</style>