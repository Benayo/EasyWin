<script setup>
import { ref } from 'vue';
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper.vue';
import AddToHomeBanner from '@/components/banners/AddToHomeBanner.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import TabsNav from '@/components/ui/TabsNav.vue';
import WinnerTicker from '@/components/ui/WinnerTicker.vue';
import FilterPills from '@/components/ui/FilterPills.vue';
import GameCard from '@/components/ui/GameCard.vue';
import lucky from '@/assets/luckyworldcup.png';
import christmas from '@/assets/merrychristmas.png';
import lion from '@/assets/lionking.png'
import footballnight from '@/assets/footballnight.png'

const activeTab = ref('Scratch & win');
const activeFilter = ref('200-500');

const tabs = [
  'Casino',
  'Virtuals',
  'Copy bets',
  'Scratch & win',
  'Lotto',
  'Live Score',
  'Trends',
];
const filters = ['All', '50-100', '200-500', '600+'];

const games = [
  {
    name: 'Lucky World Cup',
    image: lucky,
    isNew: true,
    gradient: 'from-purple-900 to-pink-700',
  },
  {
    name: 'Merry Christmas',
    image: christmas,
    gradient: 'from-red-700 to-rose-800',
  },
  {
    name: 'Lion King',
    image: lion,

    gradient: 'from-indigo-900 to-purple-800',
  },
  {
    name: 'Football Night',
    image: footballnight,
    gradient: 'from-orange-700 to-red-700',
  },
];
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <MaxWidthWrapper>
      <div>
        <AddToHomeBanner />

        <AppHeader balance="1,500.00" />

        <TabsNav :tabs="tabs" v-model="activeTab" />

        <WinnerTicker />

        <FilterPills :filters="filters" v-model="activeFilter" />

        <div class="grid grid-cols-2 gap-6">
          <GameCard
            v-for="game in games"
            :key="game.name"
            v-bind="game"
            @click="
              $router.push({
                name: 'game-detail',
                params: { id: game.name.toLowerCase().replace(/\s+/g, '-') },
              })
            "
          />
        </div>
      </div>
    </MaxWidthWrapper>
  </div>
</template>
