<template>
  <div>
    <AppHeader>
      <h1>General Setting</h1>
      <p>Setting &raquo; General</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingGeneralForm />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  meta: {
    accessName: 'setting_general',
  },
})
</script>
