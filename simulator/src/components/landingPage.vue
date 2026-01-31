<script setup>
import {
  Calculator,
  PlayCircle,
  Database,
  History,
  Layout,
} from "lucide-vue-next";

const features = [
  {
    title: "Analytical Models",
    description:
      "Mathematically exact performance measures for M/M/1, M/M/C, M/G/1, and M/G/C models.",
    icon: Calculator,
  },
  {
    title: "Discrete Simulation",
    description:
      "Empirical stochastic simulation with detailed job logs and turnaround analysis.",
    icon: Database,
  },
  {
    title: "Visual Gantt Charts",
    description:
      "Dynamic timeline visualization of server activity and queue bottlenecks.",
    icon: History,
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white"
  >
    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
      <h1
        class="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-balance"
      >
        SIMULATE<br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-black"
          >SYSTEMS.</span
        >
      </h1>

      <p
        class="max-w-2xl mx-auto text-xl md:text-2xl text-[var(--muted-foreground)] mb-16 leading-relaxed text-pretty"
      >
        A comprehensive suite for stochastic modeling, analytical performance
        measures, and discrete event simulation.
      </p>

      <!-- CTA Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
        <!-- Calculator CTA -->
        <button
          @click="this.$router.push('/simulation')"
          class="group relative overflow-hidden bg-white border border-black/10 rounded-3xl p-10 text-left transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
        >
          <div
            class="mb-8 w-14 h-14 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-black group-hover:text-white transition-colors"
          >
            <Calculator class="w-7 h-7" />
          </div>
          <h2 class="text-3xl font-bold mb-4">Model Calculator</h2>
          <p
            class="text-[var(--muted-foreground)] text-lg mb-8 leading-relaxed"
          >
            Compute exact steady-state measures (L, Lq, W, Wq) for standardized
            M/M/C and M/G/C models.
          </p>
          <div
            class="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[var(--primary)]"
          >
            Launch Tools <PlayCircle class="w-4 h-4" />
          </div>
        </button>

        <!-- Simulator CTA -->
        <button
          @click="this.$router.push('/queue')"
          class="group relative overflow-hidden bg-black text-white rounded-3xl p-10 text-left transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
        >
          <div
            class="mb-8 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors"
          >
            <Layout class="w-7 h-7" />
          </div>
          <h2 class="text-3xl font-bold mb-4">Queue Simulator</h2>
          <p class="text-white/60 text-lg mb-8 leading-relaxed">
            Observe stochastic entity flow with real-time logs and visual Gantt
            charts of server utilization.
          </p>
          <div
            class="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-white"
          >
            Enter Simulation <PlayCircle class="w-4 h-4" />
          </div>
        </button>
      </div>

      <!-- Features Grid -->
      <div
        class="grid sm:grid-cols-3 gap-12 text-left border-t border-black/5 pt-20"
      >
        <div v-for="feature in features" :key="feature.title" class="space-y-4">
          <div
            class="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center"
          >
            <component :is="feature.icon" class="w-5 h-5 opacity-40" />
          </div>
          <h3 class="font-bold text-lg uppercase tracking-tight">
            {{ feature.title }}
          </h3>
          <p class="text-[var(--muted-foreground)] leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="border-t border-black/5 py-12 text-center text-[10px] uppercase tracking-[0.2em] font-bold opacity-30"
    >
      Queueing Model Simulation Tool &copy; 2025
    </footer>
  </div>
</template>
