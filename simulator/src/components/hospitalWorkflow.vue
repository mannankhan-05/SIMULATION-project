<template>
  <div
    class="min-h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30"
  >
    <!-- Header -->
    <header
      class="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50"
    >
      <div
        class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center"
          >
            <Stethoscope class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-lg font-bold">Emergency Ward Workflow</h1>
            <p class="text-xs text-slate-500">Hospital Queueing System</p>
          </div>
        </div>
        <button
          @click="$router.push('/')"
          class="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-6 space-y-8">
      <!-- Description -->
      <div class="text-center max-w-3xl mx-auto">
        <h2
          class="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
        >
          Patient Flow Simulation
        </h2>
        <p class="text-slate-400">
          Visualize the queueing dynamics of a hospital emergency department.
          Each stage represents a service point with its own arrival and service
          characteristics.
        </p>
      </div>

      <!-- Workflow Chart -->
      <div class="relative">
        <!-- Flow Container -->
        <div
          class="flex flex-wrap justify-center items-center gap-4 lg:gap-0 py-8"
        >
          <!-- Stage 1: Arrival -->
          <div class="workflow-stage group" @mouseenter="activeStage = 0">
            <div
              class="stage-card"
              :class="{ 'stage-active': activeStage === 0 }"
            >
              <div class="stage-icon bg-gradient-to-br from-blue-500 to-blue-700">
                <Ambulance class="w-6 h-6" />
              </div>
              <h3 class="stage-title">Patient Arrival</h3>
              <p class="stage-desc">Emergency entrance</p>
              <div class="stage-metrics">
                <div class="metric">
                  <span class="metric-value">λ = 8</span>
                  <span class="metric-label">patients/hr</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="hidden lg:block">
            <ArrowRight class="w-8 h-8 text-slate-600 animate-pulse" />
          </div>

          <!-- Stage 2: Triage -->
          <div class="workflow-stage group" @mouseenter="activeStage = 1">
            <div
              class="stage-card"
              :class="{ 'stage-active': activeStage === 1 }"
            >
              <div
                class="stage-icon bg-gradient-to-br from-yellow-500 to-orange-500"
              >
                <ClipboardList class="w-6 h-6" />
              </div>
              <h3 class="stage-title">Triage</h3>
              <p class="stage-desc">Priority assessment</p>
              <div class="stage-metrics">
                <div class="metric">
                  <span class="metric-value">μ = 12</span>
                  <span class="metric-label">patients/hr</span>
                </div>
                <div class="metric">
                  <span class="metric-value">~5 min</span>
                  <span class="metric-label">avg wait</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="hidden lg:block">
            <ArrowRight class="w-8 h-8 text-slate-600 animate-pulse" />
          </div>

          <!-- Stage 3: Assessment -->
          <div class="workflow-stage group" @mouseenter="activeStage = 2">
            <div
              class="stage-card"
              :class="{ 'stage-active': activeStage === 2 }"
            >
              <div
                class="stage-icon bg-gradient-to-br from-purple-500 to-purple-700"
              >
                <Stethoscope class="w-6 h-6" />
              </div>
              <h3 class="stage-title">Assessment</h3>
              <p class="stage-desc">Doctor examination</p>
              <div class="stage-metrics">
                <div class="metric">
                  <span class="metric-value">μ = 4</span>
                  <span class="metric-label">patients/hr</span>
                </div>
                <div class="metric">
                  <span class="metric-value">C = 3</span>
                  <span class="metric-label">doctors</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="hidden lg:block">
            <ArrowRight class="w-8 h-8 text-slate-600 animate-pulse" />
          </div>

          <!-- Stage 4: Treatment -->
          <div class="workflow-stage group" @mouseenter="activeStage = 3">
            <div
              class="stage-card"
              :class="{ 'stage-active': activeStage === 3 }"
            >
              <div
                class="stage-icon bg-gradient-to-br from-green-500 to-emerald-600"
              >
                <Pill class="w-6 h-6" />
              </div>
              <h3 class="stage-title">Treatment</h3>
              <p class="stage-desc">Medical procedures</p>
              <div class="stage-metrics">
                <div class="metric">
                  <span class="metric-value">μ = 2</span>
                  <span class="metric-label">patients/hr</span>
                </div>
                <div class="metric">
                  <span class="metric-value">C = 5</span>
                  <span class="metric-label">beds</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="hidden lg:block">
            <ArrowRight class="w-8 h-8 text-slate-600 animate-pulse" />
          </div>

          <!-- Stage 5: Discharge -->
          <div class="workflow-stage group" @mouseenter="activeStage = 4">
            <div
              class="stage-card"
              :class="{ 'stage-active': activeStage === 4 }"
            >
              <div class="stage-icon bg-gradient-to-br from-teal-500 to-cyan-600">
                <DoorOpen class="w-6 h-6" />
              </div>
              <h3 class="stage-title">Discharge</h3>
              <p class="stage-desc">Patient release</p>
              <div class="stage-metrics">
                <div class="metric">
                  <span class="metric-value">μ = 10</span>
                  <span class="metric-label">patients/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage Details Panel -->
      <div
        class="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 max-w-2xl mx-auto"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-white"
            :class="stages[activeStage].iconBg"
          >
            <component :is="stages[activeStage].icon" class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-2">
              {{ stages[activeStage].title }}
            </h3>
            <p class="text-slate-400 text-sm mb-4">
              {{ stages[activeStage].description }}
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(metric, idx) in stages[activeStage].metrics"
                :key="idx"
                class="bg-white/5 rounded-lg p-3"
              >
                <p class="text-xs text-slate-500 uppercase tracking-wider">
                  {{ metric.label }}
                </p>
                <p class="text-lg font-bold text-blue-400">{{ metric.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Queue Model Info -->
      <div class="grid md:grid-cols-3 gap-6 mt-8">
        <div class="bg-[#0A0A0A] border border-white/5 rounded-xl p-5">
          <h4
            class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"
          >
            Queue Model
          </h4>
          <p class="text-2xl font-mono font-bold text-blue-400">M/M/C</p>
          <p class="text-sm text-slate-500 mt-2">
            Multi-server Markovian queue with Poisson arrivals and exponential
            service times.
          </p>
        </div>
        <div class="bg-[#0A0A0A] border border-white/5 rounded-xl p-5">
          <h4
            class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"
          >
            System Utilization
          </h4>
          <p class="text-2xl font-mono font-bold text-green-400">67%</p>
          <p class="text-sm text-slate-500 mt-2">
            Average server utilization across all stages of the emergency ward.
          </p>
        </div>
        <div class="bg-[#0A0A0A] border border-white/5 rounded-xl p-5">
          <h4
            class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"
          >
            Avg Total Time
          </h4>
          <p class="text-2xl font-mono font-bold text-orange-400">2.5 hrs</p>
          <p class="text-sm text-slate-500 mt-2">
            Expected time from arrival to discharge for a typical patient.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Stethoscope,
  ArrowLeft,
  ArrowRight,
  Ambulance,
  ClipboardList,
  Pill,
  DoorOpen,
} from "lucide-vue-next";

const activeStage = ref(0);

const stages = [
  {
    title: "Patient Arrival",
    icon: Ambulance,
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    description:
      "Patients arrive at the emergency department via ambulance, walk-in, or referral. Arrivals follow a Poisson process with varying intensity based on time of day.",
    metrics: [
      { label: "Arrival Rate", value: "8 patients/hr" },
      { label: "Peak Hours", value: "6PM - 12AM" },
      { label: "Distribution", value: "Poisson" },
      { label: "Avg Daily", value: "192 patients" },
    ],
  },
  {
    title: "Triage Station",
    icon: ClipboardList,
    iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
    description:
      "Nurses assess patient condition and assign priority levels (1-5). Critical cases bypass queue for immediate attention.",
    metrics: [
      { label: "Service Rate", value: "12 patients/hr" },
      { label: "Avg Service Time", value: "5 minutes" },
      { label: "Servers", value: "2 nurses" },
      { label: "Utilization", value: "33%" },
    ],
  },
  {
    title: "Medical Assessment",
    icon: Stethoscope,
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-700",
    description:
      "Physicians conduct detailed examination, order tests, and determine treatment plan. This is typically the bottleneck stage.",
    metrics: [
      { label: "Service Rate", value: "4 patients/hr" },
      { label: "Avg Service Time", value: "15 minutes" },
      { label: "Servers", value: "3 doctors" },
      { label: "Utilization", value: "67%" },
    ],
  },
  {
    title: "Treatment Bay",
    icon: Pill,
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    description:
      "Patients receive necessary medical interventions including medications, procedures, and monitoring in treatment bays.",
    metrics: [
      { label: "Service Rate", value: "2 patients/hr" },
      { label: "Avg Service Time", value: "30 minutes" },
      { label: "Treatment Beds", value: "5 beds" },
      { label: "Utilization", value: "80%" },
    ],
  },
  {
    title: "Discharge",
    icon: DoorOpen,
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-600",
    description:
      "Final paperwork, prescriptions, and follow-up instructions are provided before patient is released or transferred.",
    metrics: [
      { label: "Service Rate", value: "10 patients/hr" },
      { label: "Avg Service Time", value: "6 minutes" },
      { label: "Servers", value: "1 clerk" },
      { label: "Utilization", value: "80%" },
    ],
  },
];
</script>

<style scoped>
.workflow-stage {
  @apply flex-shrink-0;
}

.stage-card {
  @apply bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 w-44 transition-all duration-300 cursor-pointer;
}

.stage-card:hover,
.stage-active {
  @apply border-blue-500/30 shadow-lg shadow-blue-500/10 transform -translate-y-1;
}

.stage-icon {
  @apply w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4;
}

.stage-title {
  @apply font-bold text-sm mb-1;
}

.stage-desc {
  @apply text-xs text-slate-500 mb-3;
}

.stage-metrics {
  @apply space-y-2;
}

.metric {
  @apply flex justify-between items-baseline text-xs;
}

.metric-value {
  @apply font-mono font-bold text-blue-400;
}

.metric-label {
  @apply text-slate-600;
}
</style>
