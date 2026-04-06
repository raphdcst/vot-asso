<script setup lang="ts">
import type { Data } from '@generated/data';
import { Link, usePage } from '@inertiajs/vue3';
import { NavigationMenuItem } from '@nuxt/ui/runtime/components/NavigationMenu.d.vue.js';

import { ref, watch } from 'vue';

const page = usePage<Data.SharedProps>()

const toast = useToast()

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Comment faire ?',
    icon: 'i-lucide-circle-help',
    to: '/how-to'
  }
])

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
    <UHeader mode="drawer">
      <template #left>
        <Link to="/">
          <h1 class="text-3xl font-extrabold uppercase">
            Vot'Asso
          </h1>
        </Link>
        <UBadge color="primary" variant="outline">
          by <span class="font-bold">ACLE</span>
        </UBadge>
      </template>

      <template #right>
        <UNavigationMenu class="hidden lg:inline" :items="items" />
      </template>

      <template #body>
        <UNavigationMenu orientation="vertical" :items="items" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator class="mt-8" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built by HIRO DEV • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton to="https://www.instagram.com/leo_acle/" target="_blank" icon="i-simple-icons:instagram"
          aria-label="Instagram" color="neutral" variant="ghost" />
        <UButton to="https://www.facebook.com/acle.sgs.lyonest" target="_blank" icon="i-simple-icons:facebook"
          aria-label="Facebook" color="neutral" variant="ghost" />
      </template>
    </UFooter>
  </UApp>
</template>

<style scoped>
.spinner {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
