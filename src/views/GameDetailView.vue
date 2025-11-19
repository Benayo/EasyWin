<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AddToHomeBanner from '@/components/banners/AddToHomeBanner.vue';


import background from '@/assets/game-bg.jpg';
import gamePoster from '@/assets/luckyworldcupMain.png';
import prizeTable from '@/assets/prize_img.png';
import confetti from '@/assets/confetti.png';
import trophyWin from '@/assets/trophy-win.jpg';


import trophy from '@/assets/trophy.png';
import flag from '@/assets/flag_img.png';
import hands from '@/assets/hands.png';
import gloves from '@/assets/gloves.png';
import ball from '@/assets/ball.png';
import whistle from '@/assets/whistle.png';

const symbolImages = { trophy, flag, hands, gloves, ball, whistle };

const router = useRouter();


const balance = ref(1500);
const stake = 500;
const gameStarted = ref(false);
const symbols = ref([]);
const showResult = ref(false);
const isWin = ref(false);
const displayedWin = ref(0);
const finalWinAmount = ref(0);

const prizes = {
  trophy: 2000,
  flag: 50,
  hands: 10,
  gloves: 5,
  ball: 2,
  whistle: 1,
};
const allSymbols = Object.keys(prizes);


const playTicket = () => {
  if (balance.value < stake) {
    alert('Insufficient balance!');
    return;
  }

  balance.value -= stake;
  gameStarted.value = true;
  showResult.value = false;
  displayedWin.value = 0;

  const willTryWin = Math.random() < 0.15; 

  let winningSymbol = null;
  if (willTryWin) {
   
    const roll = Math.random();
    if (roll < 0.02) winningSymbol = 'trophy';
    else if (roll < 0.08) winningSymbol = 'flag'; 
    else if (roll < 0.2) winningSymbol = 'hands'; 
    else if (roll < 0.4) winningSymbol = 'gloves'; 
    else if (roll < 0.6) winningSymbol = 'ball'; 
    else winningSymbol = 'whistle';
  }

  const temp = [];
  for (let i = 0; i < 9; i++) {
    if (willTryWin && winningSymbol && i < 3) {
      temp.push(winningSymbol);
    } else {
        
      const randomIndex = Math.floor(Math.random() * allSymbols.length);
      temp.push(allSymbols[randomIndex]);
    }
  }

  symbols.value = temp;

  const counts = {};
  temp.forEach((s) => (counts[s] = (counts[s] || 0) + 1));
  const match = Object.entries(counts).find(([_, c]) => c >= 3);

  if (match) {
    isWin.value = true;
    finalWinAmount.value = prizes[match[0]] * stake;
  } else {
    isWin.value = false;
    finalWinAmount.value = 0;
  }

  setTimeout(() => {
    showResult.value = true;

    if (isWin.value) {
      let current = 0;
      const step = finalWinAmount.value / 80;
      const timer = setInterval(() => {
        current += step;
        if (current >= finalWinAmount.value) {
          displayedWin.value = finalWinAmount.value;
          balance.value += finalWinAmount.value;
          clearInterval(timer);
        } else {
          displayedWin.value = Math.floor(current);
        }
      }, 35);
    }
  }, 1600);
};


const closeModal = () => {
  showResult.value = false;
};
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden text-white">
    

    <MaxWidthWrapper>
      <div class="fixed inset-0 -z-10">
        <img
          :src="background"
          class="h-full w-full object-cover blur-md scale-110"
          alt="background"
        />
        <div class="absolute inset-0 bg-black/70" />
      </div>

      <AddToHomeBanner />
      <AppHeader :balance="balance.toLocaleString()" />

      <!-- Top Bar -->
      <div class="bg-[#11AC48] py-3">
        <div class="flex items-center justify-between">
          <button @click="router.push('/')" class="flex items-center gap-2">
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span class="text-lg font-bold">EasyWin</span>
          </button>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xl"
          >
            ?
          </button>
        </div>
      </div>

      <div class="pb-32 mt-4 border-8 border-white mx-4 md:mx-12">
        <img
          :src="gamePoster"
          alt="Lucky World Cup"
          class="w-full"
        />

        <div class="mt-6 flex items-start gap-6 px-4">
          <img
            :src="prizeTable"
            alt="Prizes"
            class=" w-48 hidden md:flex flex-shrink-0 "
          />

          <!-- Game Board -->
          <div
            class="flex-1 rounded-3xl border-4 border-amber-500 bg-black/70 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div class="mb-6 text-center">
              <span
                class="rounded-full bg-yellow-400 px-2 py-1 text-sm  font-semibold text-black shadow-xl"
              >
                ₦500
              </span>
            </div>

            <div class="mx-auto grid max-w-sm grid-cols-3 gap-6 ">
              <div
                v-for="(symbol, i) in symbols"
                :key="i"
                class="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-2xl animate-pop"
                :style="{ animationDelay: `${i * 110}ms` }"
              >
                <img
                  :src="symbolImages[symbol]"
                  class="h-20 w-20 object-contain"
                  :alt="symbol"
                />
              </div>
            </div>

          
          </div>
        </div>

        <!-- RESULT MODAL -->
        <transition name="modal">
          <div
            v-if="showResult"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 "
          >
            <div class="relative w-full max-w-md my-6">
              <img
                :src="confetti"
                class="absolute inset-0 h-full w-full object-cover opacity-40"
                alt="confetti"
              />

              <!-- Close Button -->
              <button
                @click="closeModal"
                class="absolute top-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-2xl transition hover:scale-110"
              >
                <svg
                  class="h-8 w-8"
                  fill="none"
                  stroke="white"
                  stroke-width="4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div class="relative px-8 py-20 text-center">
                <!-- WIN -->
                <div v-if="isWin">
                  <img
                    :src="trophyWin"
                    class="mx-auto mb-8 w-64 animate-bounce"
                    alt="trophy"
                  />
                  <div
                    class="rounded-3xl border-8 border-yellow-400 bg-red-600 px-10 py-12 shadow-2xl"
                  >
                    <h2 class="mb-6 text-7xl font-black text-yellow-400">
                      YOU WIN!
                    </h2>
                    <p
                      class="text-7xl font-black text-yellow-300 animate-pulse"
                    >
                      ₦{{ displayedWin.toLocaleString() }}
                    </p>
                  </div>
                </div>

                <!-- LOSE -->
                <div v-else>
                  <h2 class="text-6xl font-black leading-tight text-yellow-400">
                    BETTER LUCK<br />NEXT TIME
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Bottom Button -->
        <div
          class="fixed bottom-0 left-0 right-0 border-t-4 border-gray-800 bg-gray-900"
        >
          <MaxWidthWrapper class="py-5">
            <button
              @click="playTicket"
              class="w-full rounded-2xl bg-orange-600 py-7 text-2xl font-black text-white shadow-2xl transition hover:bg-orange-700 active:scale-95"
            >
              {{ gameStarted ? 'NEW TICKET' : 'PLAY TICKET' }}
            </button>
          </MaxWidthWrapper>
        </div>
      </div>
    </MaxWidthWrapper>
  </div>
</template>

<style scoped>
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-200deg);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-pop {
  animation: popIn 0.75s ease-out forwards;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.475);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
