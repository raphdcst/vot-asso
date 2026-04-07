<script setup lang="ts">
import { type Data } from '@generated/data';
import { computed, ref } from "vue";

const props = defineProps<{ initiatives: Data.Initiative[] }>();

type SortType = 'newest' | 'oldest' | 'alphabetical';

type SortOption = {
  label: string;
  id: SortType;
};

const sortOptions: SortOption[] = [
  { label: 'Les plus récents', id: 'newest' },
  { label: 'Les plus anciens', id: 'oldest' },
  { label: 'Par ordre alphabétique', id: 'alphabetical' },
]

const sortValue = ref<SortType>('newest');

const sortedInitiatives = computed(() => {
  return [...props.initiatives].sort((a, b) => {

    if (sortValue.value === 'newest') {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    }

    if (sortValue.value === 'oldest') {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    }

    if (sortValue.value === 'alphabetical') {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB, 'fr', { sensitivity: 'base' });
    }

    return 0;
  });
});

</script>

<template>
  <UPageHeader title="Initiatives en cours de vote" />

  <UPageHero v-if="initiatives.length === 0" title="Aucune initiatives en cours de vote." :links="[{
    label: 'Proposer une initiative',
    to: '/create',
    icon: 'i-lucide-circle-plus',
    size: 'xl',
    variant: 'soft'
  }]" />

  <UPage v-else>

    <template #left>
      <div class="max-h-min flex flex-col space-y-3 items-center justify-center mt-8">
        <UCard variant="subtle" class="w-full">
          <template #header>
            <h2>Trier</h2>
          </template>

          <USelect v-model="sortValue" value-key="id" :items="sortOptions" class="w-full"
            :content="{ align: 'start' }" />
        </UCard>

        <UCard variant="subtle" class="w-full">
          <template #header>
            <h2>Filtres</h2>
          </template>

          <div class="w-full flex flex-col space-y-3">
          </div>
        </UCard>
      </div>
    </template>

    <UPageBody>
      <UBlogPosts>
        <UBlogPost v-for="initiative in sortedInitiatives" :key="initiative.id" v-bind="initiative" variant="subtle"
          :title="initiative.name" :description="initiative.description" :date="initiative.createdAt ?? undefined"
          :authors="[{ name: initiative.user.fullName ?? undefined, description: initiative.user.email, avatar: { text: initiative.user.initials, ui: { root: 'ring ring-2 ring-primary/80' } } }]" />
      </UBlogPosts>
    </UPageBody>
  </UPage>
</template>
