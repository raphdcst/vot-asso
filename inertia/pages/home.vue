<script lang="ts" setup>
import { Head } from '@inertiajs/vue3';
import Logo from '~/components/Logo.vue';


const mainDescription = "VOT'ASSO a été conçu afin de permettre aux adhérents d'association de proposer et voter leurs projets solidaires."

const footerDescription = `
L'ACLE, ou Association des Carabins de Lyon Est, est une association étudiante soucieuse de respecter la volonté de ses adhérents.
C'est pourquoi nous mettons tout en place pour leur permettre d'être la voix principale de l'asso.
`

</script>

<template>

  <Head title="%s - Parce que c'est aussi votre asso." />

  <UPageHero title="Parce c'est aussi VOTRE asso." :description="mainDescription" :ui="{
    container: 'py-10 sm:py-20 lg:py-26'
  }" :links="[
    {
      label: 'Proposer un projet',
      to: '/create',
      icon: 'i-lucide-circle-plus',
      size: 'xl',
      variant: 'soft'
    },
    {
      label: 'Voir les projets',
      to: '/initiatives',
      icon: 'i-lucide-arrow-right',
      size: 'xl',
      color: 'neutral',
      variant: 'subtle'
    }
  ]" />

  <USeparator class="w-full" />

  <div class="grid grid-cols-1 lg:grid-cols-3 place-items-center pb-14 lg:pb-0">
    <Logo class="lg:order-last max-w-1/2 lg:max-w-full" />
    <UPageSection class="col-span-2" id="features" title="Une app conçue par des votants, pour des votants"
      :ui="{ container: 'py-0 sm:py-0', wrapper: 'py-0 sm:py-0' }" :features="[
        {
          icon: 'i-lucide-circle-check',
          title: 'Simple à utiliser',
          description:
            'Pas de configuration nécessaire. Connectez-vous et commencez à consulter les projets de la communauté.'
        },
        {
          icon: 'i-lucide-lectern',
          title: 'Un système de vote sur-mesure',
          description:
            'Chaque vote est unique et peut être anonymisé. Les résultats sont visibles en temps réel.'
        },
        {
          icon: 'i-lucide-shield-check',
          title: 'Sécurisé',
          description:
            'Les votes ne sont pas modifiables par les administrateurs et l\'app respecte les bonnes pratiques de sécurité.'
        }
      ]" />
  </div>

  <UPageCTA title="Cette app a été conçue par l'ACLE." :description="footerDescription" variant="subtle" :links="[
    {
      label: 'ACLE',
      to: 'https://www.facebook.com/acle.lyonest',
      target: '_blank',
      trailingIcon: 'i-simple-icons:facebook',
      color: 'neutral',
      variant: 'outline'
    },
    {
      label: 'ACLE ISS',
      to: 'https://www.facebook.com/acle.sgs.lyonest',
      target: '_blank',
      trailingIcon: 'i-simple-icons:facebook',
      color: 'neutral',
      variant: 'outline'
    },
    {
      label: '@leo_acle',
      to: 'https://www.instagram.com/leo_acle/',
      target: '_blank',
      icon: 'i-simple-icons:instagram',
      color: 'neutral',
      variant: 'outline'
    }
  ]" />
</template>
