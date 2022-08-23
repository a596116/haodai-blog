<template>
  <div :title="themeLocale.toggleColorMode" @click="toggleColorMode">
    <VIcon v-show="currentMode === 'light'" name="fa-sun" />
    <VIcon v-show="currentMode === 'dark'" name="fa-moon" />
  </div>
</template>

<script setup lang="ts">
import { useDarkMode, useThemeLocaleData } from "../composables";

const modeOptions = ["light", "dark"];

const themeLocale = useThemeLocaleData();
const { currentMode } = useDarkMode();

const toggleColorMode = (): void => {
  const currentIndex = modeOptions.indexOf(currentMode.value);
  const nextIndex = (currentIndex + 1) % modeOptions.length;
  currentMode.value = modeOptions[nextIndex];
};
</script>
