<script setup>
import money from '@/assets/icon_money.png';
defineProps({
  name,

  stake: { default: '₦500' },
  isNew: { default: false },

  image: { required: true },
});
</script>

<template>
  <div class="group cursor-pointer transform transition hover:scale-105">
    <div class="flex flex-col gap-2 relative overflow-hidden shadow-2xl">
      <div v-if="isNew" class="absolute top-4 right-0 z-20">
        <span
          class="bg-[#11AC48] text-green-200 text-xs font-semibold px-2 py-0.5 rounded-sml shadow italic"
        >
          NEW
        </span>
      </div>

      <div class="w-full">
        <img :src="image" :alt="name" class="w-full h-full object-cover" />
      </div>

      <div class="mt-3 text-center">
        <p>{{ name }}</p>
      </div>

      <div
        class="bg-[#11AC48] p-1.5 rounded-md flex items-center justify-center gap-2"
      >
        <img :src="money" alt="money" />
        <span class="font-semibold text-sm">{{ stake }}</span>
      </div>
    </div>
  </div>
</template>
