<template>
  <input class="myinput" :class="status?'success':'error'" @input="haveput" @blur="haveblur" />
</template>

<script>
export default {
  props: ["routs", "msg"],
  data() {
    return {
      status: true
    };
  },
  methods: {
    haveput(event) {
      let value = event.target.value;
      if (this.routs && this.routs.test(value)) {
        this.status = true;
      } else {
        this.status = false;
      }
      this.$emit("input", value);
    },
    haveblur() {
      if (this.status == false) {
        this.$toast.fail({
          message: this.msg || "输入不正确",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.myinput {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
.success {
  border-bottom-color: pink;
}
.error {
  border-bottom-color: red;
}
</style>