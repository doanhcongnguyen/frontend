<template>
  <el-table
    v-loading="loading"
    :data="list"
    element-loading-text="Loading"
    border
    stripe
    fit
    highlight-current-row
    style="width: 100%"
    header-row-class-name="table-header"
    row-key="id"
    size="mini"
    @selection-change="handleSelect"
  >
    <el-table-column :reserve-selection="true" :min-width="60" type="selection" align="center" />
    <el-table-column label="#" :min-width="20" type="index" align="center" />
    <el-table-column :label="$t('settings.role.code')" :min-width="160" prop="code" align="left" header-align="center" />
    <el-table-column :label="$t('global.label.action')" :min-width="90" align="center">
      <template slot-scope="scope">
        <el-tooltip :content="$t('global.button.update')" placement="top" effect="light">
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" />
        </el-tooltip>
        <el-tooltip :content="$t('global.button.delete')" placement="top" effect="light">
          <el-button type="text" icon="el-icon-delete" @click="handleDeleteItem(scope.row)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { doDelete } from '@/api/role-management'
import { showSuccessMessage, createConfirmBox } from '@/utils/commons'

export default {
  props: {
    list: {
      default: () => { return [] },
      type: Array,
      required: true
    },
    loading: {
      default: () => { return false },
      type: Boolean
    }
  },
  methods: {
    handleSelect(model) {
      this.$emit('on-handle-select', model)
    },
    handleUpdate(model) {
      this.$emit('on-handle-update', model)
    },
    async handleDeleteItem(model) {
      await createConfirmBox(this, this.$i18n.t('settings.role.deleteWarning') + ` ${model.code}?`)
      this.continueDeleteItem(model)
    },
    async continueDeleteItem(model) {
      await doDelete(model.id)
      this.showResultMessage()
    },
    showResultMessage() {
      showSuccessMessage()
      this.refresh()
    },
    refresh() {
      this.$emit('on-refresh')
    }
  }
}
</script>
