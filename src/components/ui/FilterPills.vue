<script setup>
import MaxWidthWrapper from '../layout/MaxWidthWrapper.vue';

const props = defineProps({
  filters: Array,
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="py-3 overflow-x-auto scrollbar-hide">
    <MaxWidthWrapper class="px-0">
      <div class="flex gap-3 px-4">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="$emit('update:modelValue', filter)"
          class="px-6 py-2 w-full rounded-full text-sm font-medium transition whitespace-nowrap"
          :class="
            modelValue === filter
              ? 'border border-[#11AC48] text-white shadow-lg'
              : 'bg-gray-800 text-gray-400'
          "
        >
          {{ filter }}
        </button>
      </div>
    </MaxWidthWrapper>
  </div>
</template>
