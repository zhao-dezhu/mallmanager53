<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert
      class="alert"
      title="只允许为第三级分类设置参数"
      type="error"
    ></el-alert>
    <el-form class="formcss" label-position="left" label-width="80px">
      <el-form-item label="商品分类">
        <!-- 级联选择器 -->
        <el-cascader
          :show-all-levels="false"
          clearable
          v-model="selectedOptions"
          :options="options"
          :props="({ expandTrigger: 'hover' }, defaultProp)"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <el-button type="danger">设置动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrDyparams" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <!-- 标签 -->
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="
                  handleClose(
                    scope.row.attr_vals,
                    scope.row.attr_id,
                    scope.row.attr_name,
                    tag
                  )
                "
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="
                  handleInputConfirm(
                    scope.row.attr_vals,
                    scope.row.attr_id,
                    scope.row.attr_name
                  )
                "
                @blur="
                  handleInputConfirm(
                    scope.row.attr_vals,
                    scope.row.attr_id,
                    scope.row.attr_name
                  )
                "
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="操作">
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
                type="danger"
                icon="el-icon-delete"
                circle
                @click="showDeleteUser(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-button type="danger">设置静态参数</el-button>
        <!-- 静态表格 -->
        <el-table :data="arrStaticparams" style="width: 100%">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="属性值" prop="attr_vals"> </el-table-column>
          <el-table-column label="操作">
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
                type="danger"
                icon="el-icon-delete"
                circle
                @click="showDeleteUser(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      arrDyparams: [],
      arrStaticparams: [],
      active: "1",
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    // 点击x按钮
    async handleClose(attr_vals, attr_id, attr_name, tag) {
      attr_vals.splice(attr_vals.indexOf(tag), 1);
      let putData = {
        attr_name: attr_name,
        attr_sel: "many",
        attr_vals: attr_vals.join(",")
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${attr_id}`,
        putData
      );
      console.log(res);
    },
    //点击new tag
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //回车键或者失去焦点
    async handleInputConfirm(attr_vals, attr_id, attr_name) {
      let inputValue = this.inputValue;
      if (inputValue) {
        attr_vals.push(inputValue);
        let putData = {
          attr_name: attr_name,
          attr_sel: "many",
          attr_vals: attr_vals.join(",")
        };
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${attr_id}`,
          putData
        );
        console.log(res);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    async handleClick() {
      if (this.active === "2") {
        if (this.selectedOptions.length === 3) {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          this.arrStaticparams = res.data.data;
        }
      }
    },
    async handleChange() {
      if (this.selectedOptions.length === 3) {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        this.arrDyparams.forEach(item => {
          item.attr_vals.length === 0
            ? []
            : (item.attr_vals = item.attr_vals.trim().split(","));
        });
        console.log(this.arrDyparams);
      }
    },
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    }
  }
};
</script>
<style>
.alert {
  margin-top: 20px;
}
.formcss {
  margin-top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
