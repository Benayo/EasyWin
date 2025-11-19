<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const rawWinners = ref([
  { text: '811****685 won ', amount: '₦20,000.00', game: ' in Magic Million!' },
  { text: '813****828 won ', amount: '₦5,000.00', game: ' in Treasure Santa!' },
  {
    text: '706****241 won ',
    amount: '₦15,000.00',
    game: ' in Lucky World Cup!',
  },
  {
    text: '903****117 won ',
    amount: '₦8,500.00',
    game: ' in Merry Christmas!',
  },
]);

let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    rawWinners.value.push(rawWinners.value.shift());
  }, 3500);
});


onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="bg-gray-800 py-3 overflow-hidden">
    <div class="flex animate-marquee whitespace-nowrap">
      <div class="flex items-center gap-8 px-4">
        <template
          v-for="(winner, i) in [...rawWinners, ...rawWinners]"
          :key="i"
        >
          <div class="flex items-center gap-3 text-sm">
            <span class="text-gray-200 font-bold">Congrats!</span>
            <span class="text-gray-200 font-medium">
              {{ winner.text }}
              <span class="text-yellow-400 font-bold">{{ winner.amount }}</span>
              {{ winner.game }}
            </span>
          </div>
          <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 25s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
