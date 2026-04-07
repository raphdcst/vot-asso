<script setup lang="ts">
import { type Data } from '@generated/data';
import { router } from '@inertiajs/vue3';
import { computed, ref } from "vue";
import InitiativeCard from '~/components/InitiativeCard.vue';

const props = defineProps<{
  initiatives: {
    data: Data.Initiative[], metadata: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
      firstPage: number
    }
  }
}>();

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

type FilterType = 'all' | 'month' | 'week' | 'day';

type FilterOption = {
  label: string;
  value: FilterType;
};

const filterOptions: FilterOption[] = [
  { label: 'Depuis le début', value: 'all' },
  { label: 'Moins d\'un mois', value: 'month' },
  { label: 'Moins d\'une semaine', value: 'week' },
  { label: 'Moins d\'un jour', value: 'day' },
];

const filterValue = ref<FilterType>('all');

const onPageChange = (page: number) => {
  router.get('/initiatives', { page }, {
    preserveState: true,
    preserveScroll: true,
  });
};

const processedInitiatives = computed(() => {
  let filtered = [...props.initiatives.data];

  if (filterValue.value !== 'all') {
    const cutoff = new Date();
    if (filterValue.value === 'month') {
      cutoff.setMonth(cutoff.getMonth() - 1);
    } else if (filterValue.value === 'week') {
      cutoff.setDate(cutoff.getDate() - 7);
    } else if (filterValue.value === 'day') {
      cutoff.setDate(cutoff.getDate() - 1);
    }

    filtered = filtered.filter(initiative => {
      if (!initiative.createdAt) return false;
      return new Date(initiative.createdAt) >= cutoff;
    });
  }


  return filtered.sort((a, b) => {

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

  <UPageHero v-if="initiatives.data.length === 0" title="Aucune initiative en cours de vote." :links="[{
    label: 'Proposer une initiative',
    to: '/create',
    icon: 'i-lucide-circle-plus',
    size: 'xl',
    variant: 'soft'
  }]" />

  <UPage v-else>

    <template #left>
      <div class="max-h-min flex gap-2 lg:gap-0 lg:flex-col lg:space-y-3 items-center justify-center mt-8">
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
            <USelect v-model="filterValue" :items="filterOptions" />
          </div>
        </UCard>
      </div>
    </template>

    <UPageBody>
      <div v-if="processedInitiatives.length === 0" class="flex-1 flex items-center justify-center">
        <h3>Aucune initiative ne correspond à vos filtres.</h3>
      </div>
      <div v-else class="grid md:grid-cols-2 gap-5 place-items-center">
        <InitiativeCard v-for="initiative in processedInitiatives" :initiative="initiative" />
      </div>

      <div v-if="initiatives.metadata.total > initiatives.metadata.perPage" class="mt-8 flex justify-center">
        <UPagination :page="initiatives.metadata.currentPage" :items-per-page="initiatives.metadata.perPage"
          :total="initiatives.metadata.total" @update:page="onPageChange" />
      </div>
    </UPageBody>
  </UPage>
</template>
