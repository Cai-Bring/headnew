<template>
  <div class="like">
    <myheader title="我的收藏">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myheader>
    <div class="mylike">
      <van-swipe-cell
        :before-close="beforeClose"
        v-for="(item) in like"
        :key="item.id"
        :name="item.id"
      >
        <myartic :post="item"></myartic>
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myhead.vue";
import myartic from "@/components/myartic.vue";
import { getstar, collectArticleById } from "@/apis/user.js";
export default {
  data() {
    return {
      like: ""
    };
  },
  components: {
    myheader,
    myartic
  },
  async mounted() {
    let res = await getstar();
    // console.log(res);
    if (res.status === 200) {
      this.like = res.data.data;
    }
  },
  methods: {
    beforeClose({ name, position, instance }) {
      // 是否要自动关闭
      instance.close();
      switch (position) {
        case "right":
          this.$dialog
            .confirm({
              message: "你确定要取消收藏吗?"
            })
            .then(async () => {
              // console.log(name);
              let res = await collectArticleById(name);
              // console.log(res);
              if (res.status === 200) {
                this.like.forEach((value, index) => {
                  if (value.id === name) {
                    this.like.splice(index, 1);
                  }
                });
              }
            });
          break;
      }
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.van-button {
  height: 100%;
}
</style>