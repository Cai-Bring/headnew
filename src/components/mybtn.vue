<template>
  <div class="mybtn" @click="hadbtn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    hadbtn(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="less" scoped>
.mybtn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: pink;
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
</style>