<template>
  <div class="home-container">
    <span class="home-title">欢迎来到仲恺农业工程学院管理系统</span>
    <img src="~@/assets/home_images/home.gif" class="emptyGif">
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    width: 100%;
    position: relative;
    height: calc(100vh - 84px);
    background-color: #e3e3e3;
    padding: 50px 0 0 0;
    text-align: center;
    .home-title {
      color: #fefefe;
      font-size: 2rem;
      text-shadow: 1px 1px 10px #c1c1c1, -1px -1px 10px #ffffff;
    }
    .emptyGif {
      display: block;
      width: 45%;
      margin: 0 auto;
    }
  }
}
</style>
