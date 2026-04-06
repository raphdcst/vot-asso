<script setup lang="ts">
import type { Data } from '@generated/data';
import { usePage } from '@inertiajs/vue3';

import { watch } from 'vue';

const page = usePage<Data.SharedProps>()

const toast = useToast()

watch(
  () => page.url,
  () => toast.clear()
)

watch(
  () => page.props.flash,
  (flashMessages) => {
    if (flashMessages.error) {
      toast.add({
        color: 'error',
        title: flashMessages.error
      })
    }
    if (flashMessages.success) {
      toast.add({
        color: 'success',
        title: flashMessages.success
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <UApp>
    <UMain>
      <slot />
    </UMain>
  </UApp>
</template>
