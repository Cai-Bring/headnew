<template>
  <div class="editPersonal">
    <myheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myheader>
    <div class="userimg">
      <img :src="user.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <van-cell title="昵称" is-link :value="user.nickname" size="large" @click="nameshow=!nameshow" />

    <van-dialog v-model="nameshow" title="修改昵称" show-cancel-button @confirm="editnickname">
      <van-field ref="nick" :value="user.nickname" label="昵称" placeholder="请输入昵称" required />
    </van-dialog>

    <van-cell title="密码" is-link value="******" size="large" @click="passshow=!passshow" />

    <van-dialog v-model="passshow" title="修改密码" show-cancel-button :beforeClose="beforeClose">
      <van-field ref="oldpassword" type="password" label="旧密码" placeholder="请输入旧密码" required />
      <van-field ref="newpassword" type="password" label="新密码" placeholder="请输入新密码" required />
    </van-dialog>

    <van-cell
      title="性别"
      is-link
      :value="user.gender===0?'女':'男'"
      size="large"
      @click="adressshow=!adressshow"
    />
    <van-dialog
      v-model="adressshow"
      title="修改性别"
      show-cancel-button
      @confirm="editadress"
      @cancel="closevan"
    >
      <van-picker
        :columns="columns"
        @change="onChange"
        :default-index="adressnow"
        :swipe-duration="500"
      />
    </van-dialog>
  </div>
</template>

<script>
import myheader from "@/components/myhead.vue";
import { getuseid, uploadbyid } from "@/apis/user.js";
import { uploadfiles } from "@/apis/upload.js";
export default {
  components: {
    myheader
  },
  data() {
    return {
      user: {},
      nameshow: false,
      passshow: false,
      adressshow: false,
      columns: ["女", "男"],
      adressnow: ""
    };
  },
  async mounted() {
    // console.log(this.$route.params.id);
    let res = await getuseid(this.$route.params.id);
    // console.log(res);
    if (res.data.message === "获取成功") {
      this.user = res.data.data;
      this.user.head_img = "http://127.0.0.1:3000" + res.data.data.head_img;
      this.adressnow = res.data.data.gender;
    } else {
      this.user.head_img =
        "http://127.0.0.1:3000/uploads/image/IMG1569393358174.jpeg";
    }
  },
  methods: {
    //   完成图片的编辑
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formdata = new FormData();
      formdata.append("file", file.file);
      let res = await uploadfiles(formdata);
      //   console.log(res);
      if (res.data.message === "文件上传成功") {
        // console.log("123");
        // s实现浏览
        this.user.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        // 再次发送请求修改数据库中的内容
        let res2 = await uploadbyid(this.user.id, {
          head_img: res.data.data.url
        });
        // console.log(res2);
        this.$toast(res2.data.message);
      } else {
        this.$toast.fail("文件上传失败");
      }
      //   console.log(file);
    },
    // 完成修改昵称的编辑
    async editnickname() {
      let name = this.$refs.nick.$refs.input.value;
      //   let name = this.nick2name;
      //   console.log(name);
      let res = await uploadbyid(this.user.id, { nickname: name });
      // console.log(res);
      if (res.data.message === "修改成功") {
        // 为了实现页面的刷新效果，需要将页面中昵称的绑定数据进行更新
        this.user.nickname = name;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    // // 完成修改密码的编辑
    // async editpassword() {
    //   if (this.$refs.oldpassword.$refs.input.value != this.user.password) {
    //     this.$toast.fail("密码错误`");
    //   } else if (
    //     !/^[0-9a-zA-Z]{3,12}$/.test(this.$refs.newpassword.$refs.input.value)
    //   ) {
    //     this.$toast.fail("请输入3-12位的密码");
    //   } else {
    //     let newpass = this.$refs.newpassword.$refs.input.value;
    //     //   console.log(name);
    //     let res = await uploadbyid(this.user.id, { password: newpass });
    //     // console.log(res);
    //     if (res.data.message === "修改成功") {
    //       this.$toast.success("修改成功");
    //     } else {
    //       this.$toast.fail("修改失败");
    //     }
    //   }
    // },
    
    // 在弹出框点确认之后触发的事件
    async beforeClose(action, done) {
      if (action === "confirm") {
        let oldpass = this.$refs.oldpassword.$refs.input.value;
        let newpass = this.$refs.newpassword.$refs.input.value;
        if (oldpass != this.user.password) {
          this.$toast.fail("原密码错误");
          done(false);
        } else if (!/^[0-9a-zA-Z]{3,12}$/.test(newpass)) {
          this.$toast.fail("请输入3-12位的密码");
          done(false);
        } else if (
          oldpass === this.user.password &&
          /^[0-9a-zA-Z]{3,12}$/.test(newpass)
        ) {
          let res = await uploadbyid(this.user.id, { password: newpass });
          // console.log(res);
          if (res.data.message === "修改成功") {
            this.user.password = newpass;
            this.$toast.success("修改成功");
            done();
          } else {
            this.$toast.fail("修改失败");
            done(false);
          }
        } else {
          done();
        }
      } else {
        done();
      }
    },
    // 获取选择的值
    onChange(picker, value, index) {
      //   console.log(`当前值：${value}, 当前索引：${index}`);
      this.adressnow = index;
    },
    // 点击确认之后修改性别
    async editadress() {
      //   console.log(this.adressnow);
      let res = await uploadbyid(this.user.id, { gender: this.adressnow });
      //   console.log(res);
      if (res.data.message === "修改成功") {
        // 为了实现页面的刷新效果，需要将页面中昵称的绑定数据进行更新
        this.user.gender = this.adressnow;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    closevan() {
      this.adressnow = this.user.gender;
    }
  }
};
</script>

<style lang="less" scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
