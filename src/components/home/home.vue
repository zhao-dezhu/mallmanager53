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
            <a href="#" @click.prevent="handleSignout()" class="loginout"
              >退出</a
            >
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边导航栏 -->
        <el-menu :router="true" :unique-opened="true">
          <!-- 1 -->
          <el-submenu
            :index="'' + item1.order"
            v-for="(item1, index) in menus"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <el-menu-item
              :index="item2.path"
              v-for="(item2, index) in item1.children"
              :key="index"
            >
              <i class="el-icon-menu"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  // beforeCreate() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     this.$router.push({ name: "login" });
  //   }
  // },
  created() {
    this.getMenus();
  },
  methods: {
    async getMenus() {
      const res = await this.$http.get("menus");
      this.menus = res.data.data;
    },
    handleSignout() {
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    }
  }
};
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
