<template>
  <div class="register">
    <div id="app">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <myput
            placeholder="手机号码"
            :routs="/^1[0-9]{4,10}$/"
            :msg="'手机号码格式不正确'"
            v-model="user.username"
          ></myput>
          <myput
            placeholder="昵称"
            :routs="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
            :msg="'昵称格式不正确'"
            v-model="user.nickname"
          ></myput>
          <myput
            placeholder="密码"
            type="password"
            :routs="/^[0-9a-zA-Z]{3,12}$/"
            :msg="'密码格式不正确'"
            v-model="user.password"
          ></myput>
        </div>
        <p class="tips">
          有账号？
          <a href="#/login" class>去登录</a>
        </p>
        <btn @click="isclick">注册</btn>
      </div>
    </div>
  </div>
</template>

<script>
import btn from "@/components/mybtn.vue";
import myput from "@/components/myinput.vue";
import { register } from "@/apis/user.js";
export default {
  components: {
    btn,
    myput
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    async isclick() {
      if (
        /^1[0-9]{4,10}$/.test(this.user.username) &&
        /^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/.test(this.user.nickname) &&
        /^[0-9a-zA-Z]{3,12}$/.test(this.user.password)
      ) {
        let res = await register(this.user);
        console.log(res);
        if (res.data.message === "用户名已经存在") {
          this.$toast.fail(res.data.message);
        } else {
          this.$router.push({ name: "Login" });
        }
      } else {
        this.$toast.fail("请输入正确格式的数据");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: pink;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>