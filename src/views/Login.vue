<template>
  <div class="login">
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
            placeholder="请输入手机号或用户名"
            :msg="'请输入正确用户名'"
            :routs="/^(\d{5,6})$|^(1\d{10})$/"
            @input="getname"
          ></myput>
          <myput
            type="password"
            placeholder="密码"
            :routs="/^\S{3,16}$/"
            :msg="'密码错误'"
            v-model="user.password"
          ></myput>
        </div>
        <p class="tips">
          没有账号？
          <a href="#/register" class>去注册</a>
        </p>
        <btn @click="isclick">登录</btn>
      </div>
    </div>
  </div>
</template>

<script>
import btn from "@/components/mybtn.vue";
import myput from "@/components/myinput.vue";
export default {
  components: {
    btn,
    myput
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    isclick() {
      console.log(this.user);
    },
    getname(data) {
      this.user.username = data;
    }
  }
};
</script>

<style lang="less">
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
