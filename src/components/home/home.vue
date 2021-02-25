<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="width:120px">
            <img
              width="100%"
              src="../../assets/logo.jpg"
              alt="无法显示图片"
            /></div
        ></el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a href="#" class="loginout">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">aside</el-aside>
      <el-main class="main">main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background: #b3c0d1;
}
.aside {
  background: #d3dce6;
}
.main {
  background: #e9eef3;
}
/*头部样式 */
.middle {
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
