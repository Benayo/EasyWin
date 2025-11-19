// src/stores/balance.js
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useBalanceStore = defineStore('balance', () => {
  const balance = ref(Number(localStorage.getItem('userBalance')) || 1500);

  watch(
    balance,
    (newBalance) => {
      localStorage.setItem('userBalance', newBalance.toString());
    },
    { immediate: true }
  );

  const deduct = (amount) => {
    if (balance.value >= amount) {
      balance.value -= amount;
      return true;
    }
    return false;
  };

  const add = (amount) => {
    balance.value += amount;
  };

  const set = (amount) => {
    balance.value = amount;
  };

  const reset = () => {
    balance.value = 1500;
    localStorage.removeItem('userBalance');
  };

  return { balance, deduct, add, set, reset };
});
