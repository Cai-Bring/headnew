<template>
  <div class="personal">
    <router-link :to="{path:`/editPersonal/${user.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="user.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span :class="`iconfont iconxingbie${user.gender?'nan':'nv'}`"></span>
            {{user.nickname}}
          </div>
          <div class="time">{{user.create_date|dateFormat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <van-cell
      title="我的关注"
      is-link
      value="关注的用户"
      class="about"
      size="large"
      @click="$router.push({path:`/myfollow/${user.id}`})"
    />
    <van-cell title="我的跟帖" is-link value="跟帖/回复" class="about" size="large" />
    <van-cell
      title="我的收藏"
      is-link
      value="文章/视频"
      class="about"
      size="large"
      @click="$router.push({path:`/mylike/${user.id}`})"
    />
    <van-cell title="设置" class="about" size="large" />
    <btn class="goback" @click="goback">返回主页</btn>
    <btn class="btn" @click="isclick">退出登录</btn>
  </div>
</template>

<script>
import btn from "@/components/mybtn.vue";
import { getuseid } from "@/apis/user.js";
import { dateFormat } from "@/filt/timefilt.js";
export default {
  components: {
    btn
  },
  data() {
    return {
      user: {}
    };
  },
  filters: {
    dateFormat
  },
  async mounted() {
    // console.log(this.$route.params.id);
    let res = await getuseid(this.$route.params.id);
    // console.log(res);
    if (res.data.message === "获取成功") {
      this.user = res.data.data;
      this.user.head_img = "http://127.0.0.1:3000" + res.data.data.head_img;
    }
    // 通过响应拦截器来做跳转
    // else {
    //   this.$router.push({ name: "Login" });
    // }
  },
  methods: {
    goback() {
      this.$router.push({ name: "Index" });
    },
    isclick() {
      localStorage.removeItem("key");
      localStorage.removeItem("userInfo");
      this.$router.push({ name: "Index" });
    }
  }
};
</script>

<style lang='less' scoped>
.goback {
  margin: 20px auto;
}
.btn {
  background-color: skyblue;
  margin: 20px auto;
}
.about {
  background-color: #fff;
  border-bottom: #ccc 1px solid;
}
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
