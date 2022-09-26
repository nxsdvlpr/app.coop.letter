import { useContext } from '@nuxtjs/composition-api'

export const useNotification = () => {
  const { $toast } = useContext()

  const notifications = {
    invalidInput: {
      message: 'Please double check your data and try again.',
      type: 'warning',
    },
    createSuccess: {
      message: 'Your new data have been saved.',
      type: 'success',
    },
    updateSuccess: {
      message: 'Data have been successfuly updated.',
      type: 'success',
    },
    howdy: {
      message: 'Howdy my broh and sistah.',
      type: 'info',
    },
  }

  const notify = (key) => {
    if (notifications[key]) {
      $toast.clear()
      switch (notifications[key].type) {
        case 'warning':
          $toast.warning(notifications[key].message)
          break
        case 'success':
          $toast.success(notifications[key].message)
          break
        default:
          break
      }
    } else {
      $toast.info(notifications.howdy.message)
    }
  }

  return { notify }
}
