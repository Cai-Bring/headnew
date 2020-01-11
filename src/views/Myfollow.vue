<template>
  <div class="focus">
    <myheader title="我的关注">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <div class="box" v-for="(value,index) in followList" :key="value.id">
        <img :src="value.head_img" />
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>{{value.create_date|dateFormat}}</span>
        </div>
        <span @click="unFollow(value.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyFollows, unFollowUser } from "@/apis/user.js";
import myheader from "@/components/myhead.vue";
import { dateFormat } from "@/filt/timefilt.js";
export default {
  filters: {
    dateFormat
  },
  data() {
    return {
      followList: ""
    };
  },
  components: {
    myheader
  },
  async mounted() {
    let res = await getMyFollows();
    console.log(res);
    if (res.status === 200) {
      this.followList = res.data.data;
      this.followList.map(value => {
        value.head_img = "http://127.0.0.1:3000" + value.head_img;
      });
    }
    // console.log(this.followList);
  },
  methods: {
    async unFollow(id, index) {
      let res = await unFollowUser(id);
      if (res.status === 200) {
        this.$toast.success(res.data.message);
        this.followList.splice(index, 1);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>