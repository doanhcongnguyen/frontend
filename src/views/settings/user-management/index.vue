<template>
  <div class="app-container">
    <el-card class="card" shadow="hover">
      <b>User management</b>
      <div class="page-content">
        <Search
          :search-form="searchModel"
          @do-search="doSearch"
        />

        <el-button :disabled="selectedModels.length === 0" type="text" icon="el-icon-remove" class="btn-container danger" @click="handleDelete">{{ $t('global.button.delete') }}</el-button>
        <el-button type="text" icon="el-icon-circle-plus" class="btn-container" @click="handleAdd">{{ $t('global.button.add') }}</el-button>

        <Add
          :dialog-form-visible="dialogFormVisible"
          :is-update-mode="isUpdateMode"
          :form="formModel"
          @close-dialog="closeDialog"
        />

        <List
          :list="list"
          :loading="loading"
          @on-handle-update="handleUpdate"
          @on-handle-select="handleSelect"
          @on-refresh="refreshList"
        />

        <Pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="changePagination"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import Search from './components/Search'
import List from './components/List'
import Add from './components/Add'
import Pagination from '@/components/Pagination'

import { getList, doDelete, filter } from '@/api/user-management'
import { showSuccessMessage, createConfirmBox } from '@/utils/commons'

export default {
  components: {
    Search,
    Add,
    List,
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
      isUpdateMode: false,
      formModel: {},
      searchModel: {},
      selectedModels: [],
      list: undefined,
      loading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.onInit()
  },
  methods: {
    onInit() {
      this.search()
    },
    async search() {
      this.loading = true
      const searchModelData = this.buildSearchModel()
      const response = await filter(searchModelData)
      this.list = response.content
      this.total = response.totalElements
      this.listQuery.page = response.pageable.pageNumber + 1
      this.loading = false
    },
    async getList() {
      this.loading = true
      const response = await getList()
      this.list = response.content
      this.loading = false
    },
    handleAdd() {
      this.formModel = {}
      this.isUpdateMode = false
      this.dialogFormVisible = true
    },
    handleUpdate(model) {
      this.isUpdateMode = true
      this.dialogFormVisible = true
      this.formModel = model
    },
    handleSelect(model) {
      this.selectedModels = model
    },
    async handleDelete() {
      await createConfirmBox(this.$i18n.t('settings.user.multipleDeleteWarning'))
      this.continueDelete()
    },
    async continueDelete() {
      // TODO: need create api to delele all
      this.selectedModels.forEach(e => {
        doDelete(e.id)
      })
      this.refreshList()
      showSuccessMessage()
    },
    refreshList() {
      this.search()
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.refreshList()
    },
    changePagination(pageData) {
      this.listQuery.page = pageData.page
      this.listQuery.limit = pageData.limit
      this.search()
    },
    buildSearchModel() {
      const searchModel = JSON.parse(JSON.stringify(this.searchModel))
      searchModel.pageSize = this.listQuery.limit
      searchModel.pageNumber = this.listQuery.page
      return searchModel
    },
    doSearch() {
      this.listQuery.page = 1
      this.search()
    }
  }
}

</script>
