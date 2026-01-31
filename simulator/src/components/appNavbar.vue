<template>
  <!-- Navigation -->
  <nav
    class="border-b border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
      <div class="logo flex items-center gap-3" @click="this.$router.push('/')">
        <div
          class="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl"
        >
          Q
        </div>
        <span class="font-bold text-xl tracking-tight uppercase"
          >QueueFlow</span
        >
      </div>
      <div
        class="hidden md:flex items-center gap-8 text-sm font-medium opacity-60 uppercase tracking-widest"
      >
        <a href="/#/simulation" class="hover:opacity-100 transition-opacity"
          >Model Calculator</a
        >
        <a href="/#/queue" class="hover:opacity-100 transition-opacity"
          >Queue Simulator</a
        >
        <a href="#" class="hover:opacity-100 transition-opacity">About</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.logo {
  cursor: pointer;
}
</style>
