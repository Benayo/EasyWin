<script setup>
defineProps({
  class: String,
});
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-2 md:px-4">
    <div :class="class">
      <slot />
    </div>
  </div>
</template>
