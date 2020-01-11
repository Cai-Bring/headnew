<template>
  <div class="index">
    <div class="top">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
        <van-icon name="search" />
        <span>搜索</span>
      </div>
      <div class="user" @click="$router.push({path:`/personal/${id}`})">
        <van-icon name="manager-o" />
      </div>
    </div>
    <div class="nav">
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="value in cateList" :title="value.name" :key="value.id">
          <van-list
            v-model="value.loading"
            :finished="value.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <!-- 下拉刷新 -->
            <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
              <!-- 生成当前栏目的文章列表数据 -->
              <articles v-for="item in value.postList" :key="item.id" :post="item"></articles>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="newslist"></div>
  </div>
</template>

<script>
import articles from "@/components/myartic.vue";
import { getCateList } from "@/apis/getCateList.js";
import { postList } from "@/apis/article.js";
export default {
  data() {
    return {
      cateList: "",
      active: localStorage.getItem("key") ? 1 : 0
    };
  },
  async mounted() {
    let click = document.querySelector(".van-sticky");
    click.onclick = e => {
      // console.log(e);
      if (e.target.className == "van-sticky") {
        this.$router.push({ name: "Addclass" });
      }
    };
    this.id = localStorage.getItem("userInfo");
    let res = await getCateList();
    // console.log(res);
    if (res.status === 200) {
      this.cateList = res.data.data;
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          pageIndex: 1,
          pageSize: 5,
          postList: [],
          loading: false, // 这个栏目的加载状态
          finished: false, // 这个栏目的数据是否完全加载完毕
          isLoading: false // 标记是否处于下拉刷新的状态，默认为false
        };
      });
      this.init();
      // console.log(this.cateList);

      // 将下面的方法封装成函数调用
      // 根据改造过的数据发送axios得到栏目的新闻数据
      // let res2 = await postList({
      //   pageSize: this.cateList[this.active].pageSize,
      //   pageIndex: this.cateList[this.active].pageIndex,
      //   category: this.active
      // });
      // // console.log(res2);
      // this.cateList[this.active].postList = res2.data.data;
      // console.log(this.cateList);
    }
  },
  components: {
    articles
  },
  watch: {
    active() {
      // this.init();
      // 优化，如果有加载过，则不需要重新加载
      if (this.cateList[this.active].postList.length == 0) {
        this.init();
      }
    }
  },
  methods: {
    async init() {
      let res2 = await postList({
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: this.active
      });
      // console.log(res2);
      // 将当前栏目的loading重置为false
      this.cateList[this.active].loading = false;
      // 加载完成之后再次将下拉状态设置回来
      this.cateList[this.active].isLoading = false;
      // 判断当前栏目中的postList的数据长度是否小于当前页面需要加载的长度，如果小于，则将页面finished改为true，则会显示‘没有更多了’
      if (res2.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
      // this.cateList[this.active].postList = res2.data.data;
      // 将数据存储到当前栏目的postList中
      this.cateList[this.active].postList.push(...res2.data.data);
    },
    onLoad() {
      this.cateList[this.active].pageIndex++;
      setTimeout(() => {
        this.init();
      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      this.cateList[this.active].pageIndex = 1;
      this.cateList[this.active].finished = false;
      setTimeout(() => {
        this.cateList[this.active].postList.length = 0;
        this.init();
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
  color: #fff;
  .iconnew {
    font-size: 60px;
    margin: 0 5px;
  }
  .user {
    font-size: 30px;
    margin: 0 10px;
  }
  .search {
    flex: 1;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
  }
}
/deep/.van-sticky {
  padding-right: 50px;
  &::before {
    content: "+";
    width: 50px;
    height: 44px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 30px;
    text-align: center;
    line-height: 44px;
    background-color: #fff;
  }
}
</style>