<template>
  <!-- 加载左右1图结构的新闻 -->
  <div
    class="single"
    v-if="post.type===1&&post.cover.length<3"
    @click="$router.push({path: `/articleDetail/${post.id}`})"
  >
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length||(post.comments&&post.comments.length)}}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <div
    class="singleT"
    v-else-if="post.type===2"
    @click="$router.push({path: `/articleDetail/${post.id}`})"
  >
    <p class="content">{{post.title}}</p>
    <div class="playarea">
      <img :src="post.cover[0].url" alt />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
  <div
    class="singleY"
    v-else-if="post.type===1&&post.cover.length>=3"
    @click="$router.push({path: `/articleDetail/${post.id}`})"
  >
    <p class="content">{{post.title}}</p>
    <div class="imgs">
      <img :src="post.cover[0].url" alt />
      <img :src="post.cover[1].url" alt />
      <img :src="post.cover[2].url" alt />
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.content {
  font-weight: 600;
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  margin-top: 5px;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
.singleT {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  > .playarea {
    width: 100%;
    position: relative;
    > img {
      width: 100%;
    }
    > .playicon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.3);
      width: 60/360 * 100vw;
      height: 60/360 * 100vw;
      border-radius: 50%;
      font-size: 45px;
      text-align: center;
      line-height: 70/360 * 100vw;
    }
  }
}
.singleY {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    margin-bottom: 5px;
    > img {
      width: 120/360 * 100vw;
      height: 70/360 * 100vw;
      box-sizing: border-box;
      display: block;
    }
  }
}
</style>