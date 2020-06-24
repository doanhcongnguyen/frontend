import { Notification } from 'element-ui'
import i18n from '@/lang'

const _3s = 3 * 1000

export function showSuccessMessage() {
  Notification({
    title: i18n.t('global.success'),
    type: 'success',
    duration: _3s
  })
}

export function showSuccessWithMessage(message) {
  Notification({
    title: i18n.t('global.success'),
    message: message,
    type: 'success',
    duration: _3s
  })
}

export function showErrorMessage() {
  Notification({
    title: i18n.t('global.error'),
    message: i18n.t('global.errMsg.cannotGetInfo'),
    type: 'error',
    duration: _3s
  })
}

export function showErrorWithMessage(message) {
  Notification({
    title: i18n.t('global.error'),
    message: message,
    type: 'error',
    duration: _3s
  })
}

export function createConfirmBox(vm, warningText) {
  return this.$confirm(
    warningText,
    i18n.t('global.warning'),
    {
      confirmButtonText: i18n.t('global.button.ok'),
      cancelButtonText: i18n.t('global.button.cancel'),
      type: 'warning'
    }
  )
}
