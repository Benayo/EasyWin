<script setup>
const props = defineProps({
  tabs: Array,
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const selectTab = (tab) => emit('update:modelValue', tab);
</script>

<template>
  <nav class="bg-[#11AC48] py-3 overflow-x-auto scrollbar-hide">
    <div class="flex gap-8 px-6">
        
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selectTab(tab)"
        class="relative px-6 py-3  font-bold  transition whitespace-nowrap"
        :class="
          modelValue === tab
            ? 'text-yellow-400'
            : 'text-white/80 hover:text-white'
        "
      >
        {{ tab }}

        
        <span
          v-if="modelValue === tab"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-yellow-400"
        />
      </button>
    </div>
  </nav>
</template>
