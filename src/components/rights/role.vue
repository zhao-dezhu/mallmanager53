<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="rolelist" style="width: 100%">
      <el-table-column type="expand" prop="date" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                @close="deleRight(scope.row, item1.id)"
                closable
                type="success"
                >{{ item1.authName }}</el-tag
              >
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="deleRight(scope.row, item2.id)"
                    closable
                    type="info"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleRight(scope.row, item3.id)"
                    closable
                    type="warning"
                    v-for="(item3, i) in item2.children"
                    :key="i"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">该角色未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" prop="date" label="#" width="150">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showSetRightDia(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleteUser(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形结构 -->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        :default-expanded-keys="arrexpand"
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      treelist: [],
      dialogFormVisibleRight: false,
      defaultProps: {
        label: "authName",
        children: "children"
      },
      arrexpand: [],
      arrcheck: [],
      currRoleId: -1
    };
  },
  created() {
    this.getrolelist();
  },
  methods: {
    async setRoleRight() {
      let arr1 = this.$refs.tree.getCheckedKeys();
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      let arr = [...arr1, ...arr2];
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(",")
      });
      console.log(res);
      this.getrolelist();
      this.dialogFormVisibleRight = false;
    },
    async showSetRightDia(role) {
      this.currRoleId = role.id;
      const res = await this.$http.get(`rights/tree`);
      this.treelist = res.data.data;
      // 获取所有权限的遍历
      let arrtemp1 = [];
      this.treelist.forEach(item1 => {
        arrtemp1.push(item1.id);
        item1.children.forEach(item2 => {
          arrtemp1.push(item2.id);
          item2.children.forEach(item3 => {
            arrtemp1.push(item3.id);
          });
        });
      });
      this.arrexpand = arrtemp1;
      // 获取当前角色拥有的权限遍历
      let arrtemp2 = [];
      role.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id);
          });
        });
      });
      this.arrcheck = arrtemp2;
      this.dialogFormVisibleRight = true;
    },
    async deleRight(role, rightID) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightID}`);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
      role.children = res.data.data;
    },
    async getrolelist() {
      const res = await this.$http.get(`roles`);
      this.rolelist = res.data.data;
    }
  }
};
</script>

<style>
.addrolebtn {
  margin-top: 20px;
}
</style>
