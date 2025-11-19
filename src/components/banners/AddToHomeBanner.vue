<script setup>
import starUrl from '@/assets/green-star.svg?url';
</script>

<template>
  <div
    class="bg-white text-[#11AC48] px-4 py-3 flex items-center justify-between text-sm"
  >
    <div class="flex items-center">
      <div class="bg-white/20 rounded-full p-2">
        <img :src="starUrl" alt="Green Star" />
      </div>
      <div>
        <p class="font-semibold">Add EasyWin to Home Screen</p>
        <p class="text-xs opacity-90">Quick access anytime!</p>
      </div>
    </div>

    <div class="flex gap-2 items-center">
      <button
        class="bg-[#11AC48] text-white font-semibold px-3 py-2 rounded-full text-sm"
      >
        Add Now
      </button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  </div>
</template>
