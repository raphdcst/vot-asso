<script lang="ts" setup>

import { Data } from '@generated/data';
import { computed } from 'vue';

const props = defineProps<{
  initiative: Data.Initiative
}>()

const initiative = computed(() => props.initiative);
const user = computed(() => props.initiative.user);

const date = computed(() => {
  if (!initiative.value.createdAt) return '';
  return new Date(initiative.value.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

</script>

<template>
  <div class="w-full h-min p-5 flex flex-col space-y-3 rounded-md ring-2 ring-muted">

    <p class="text-muted text-sm">{{ date }}</p>

    <h1 class="text-xl">{{ initiative.name }}</h1>
    <p>{{ initiative.description }}</p>

    <p class="pt-3 text-muted place-self-end">Par <span class="underline decoration-primary/80 underline-offset-2">{{
      user.fullName }}</span>
    </p>

  </div>
</template>
