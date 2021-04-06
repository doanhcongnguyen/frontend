<template>
  <div>
    <el-dialog :title="isUpdateMode ? $t('settings.role.updateTitle') : $t('settings.role.createTitle')" :before-close="closeDialog" :visible.sync="dialogFormVisible">
      <el-form ref="form" :rules="rules" :model="form" label-position="right" label-width="14rem" size="mini">
        <el-form-item :label="$t('settings.role.code')" prop="code">
          <el-input v-model="form.code" class="form-item" @keyup.enter.native="save" />
        </el-form-item>
        <el-form-item>
          <el-button @click="closeDialog">{{ $t('global.button.cancel') }}</el-button>
          <el-button type="primary" @click="save">{{ isUpdateMode ? $t('global.button.update') :$t('global.button.save') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { create, update } from '@/api/role-management'
import { showSuccessMessage } from '@/utils/commons'

export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    },
    isUpdateMode: {
      type: Boolean,
      required: true
    },
    form: {
      default: function() { return {} },
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rules: {
        'code': [{ required: true, message: this.$i18n.t('validate.required', { name: this.$i18n.t('settings.role.code') }), trigger: 'blur' }]
      }
    }
  },
  methods: {
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.onSubmit()
        }
      })
    },
    async onSubmit() {
      const formData = this.createFormData()
      this.isUpdateMode ? await update(formData) : await create(formData)
      this.showResultMessage()
    },
    createFormData() {
      return Object.assign({}, this.form)
    },
    showResultMessage() {
      showSuccessMessage()
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
