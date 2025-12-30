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
        <div class="flex items-center gap-2">
          <button
            @click="activeTab = 'calculator'"
            :class="tabClass('calculator')"
          >
            Analytical
          </button>
          <button
            @click="activeTab = 'simulator'"
            :class="tabClass('simulator')"
          >
            Simulation
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-6 space-y-6">
      <!-- Input Section -->
      <section class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1 space-y-4">
          <div
            class="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 space-y-6"
          >
            <h2
              class="text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              Parameters
            </h2>

            <div class="space-y-4">
              <div class="space-y-1.5">
                <label class="text-xs font-medium text-slate-500"
                  >Model Type</label
                >
                <select
                  v-model="config.model"
                  class="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="MM1">M/M/1 (Poisson/Exp)</option>
                  <option value="MMC">M/M/C (Multi-server)</option>
                  <option value="MG1">M/G/1 (General Service)</option>
                  <option value="MGC">M/G/C (General Multi)</option>
                </select>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium text-slate-500"
                  >Arrival Rate (λ)</label
                >
                <input
                  v-model.number="config.arrivalRate"
                  type="number"
                  step="0.1"
                  class="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium text-slate-500"
                  >Service Rate (μ)</label
                >
                <input
                  v-model.number="config.serviceRate"
                  type="number"
                  step="0.1"
                  class="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div
                v-if="['MMC', 'MGC'].includes(config.model)"
                class="space-y-1.5"
              >
                <label class="text-xs font-medium text-slate-500"
                  >Servers (C)</label
                >
                <input
                  v-model.number="config.servers"
                  type="number"
                  min="1"
                  class="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div
                v-if="['MG1', 'MGC'].includes(config.model)"
                class="space-y-1.5"
              >
                <label class="text-xs font-medium text-slate-500"
                  >Service Std Dev (σ)</label
                >
                <input
                  v-model.number="config.serviceStdDev"
                  type="number"
                  step="0.1"
                  class="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              @click="runAll"
              class="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Play class="w-4 h-4" /> Run Analysis
            </button>
          </div>
        </div>

        <!-- Dynamic Results Content -->
        <div class="lg:col-span-3 space-y-6">
          <div
            v-if="activeTab === 'calculator'"
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div
              v-for="(val, key) in results"
              :key="key"
              class="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 flex flex-col justify-between group hover:border-blue-500/30 transition-all cursor-default"
            >
              <span
                class="text-[10px] font-bold uppercase tracking-tighter text-slate-500"
                >{{ key }}</span
              >
              <div class="flex items-baseline gap-2 mt-2">
                <span class="text-2xl font-mono font-bold text-blue-400">{{
                  formatValue(val)
                }}</span>
                <span class="text-xs text-slate-600">{{
                  key.includes("Time") ? "sec" : "units"
                }}</span>
              </div>
            </div>
          </div>

          <div v-else class="space-y-6">
            <!-- Gantt Chart -->
            <div
              class="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 overflow-hidden"
            >
              <h3
                class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6"
              >
                Service Timeline (Gantt)
              </h3>
              <div
                class="relative h-48 w-full bg-black/50 rounded-lg border border-white/5 overflow-x-auto p-4 custom-scrollbar"
              >
                <div class="flex items-center gap-1 min-w-max h-full">
                  <div
                    v-for="job in simulationTable"
                    :key="job.id"
                    class="relative h-24 flex flex-col justify-end group"
                    :style="{
                      width: job.serviceTime * 50 + 'px',
                      marginLeft:
                        (job.startTime - prevJobEnd(job.id)) * 20 + 'px',
                    }"
                  >
                    <div
                      class="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-[10px] p-2 rounded whitespace-nowrap z-10"
                    >
                      ID: {{ job.id }} | Wait: {{ job.waitingTime.toFixed(1) }}
                    </div>
                    <div
                      class="w-full bg-blue-500/20 border-t border-blue-500/50 rounded-t h-12 flex items-center justify-center overflow-hidden"
                    >
                      <span class="text-[9px] font-mono text-blue-300"
                        >#{{ job.id }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Simulation Table -->
            <div
              class="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden"
            >
              <div
                class="p-4 border-b border-white/5 flex items-center justify-between"
              >
                <h3
                  class="text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  Discrete Event Log
                </h3>
              </div>
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-white/5 text-slate-500">
                      <th class="p-3 font-semibold border-b border-white/5">
                        ID
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        Interarrival
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        Arrival
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        Service
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        Start
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        End
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        Wait
                      </th>
                      <th class="p-3 font-semibold border-b border-white/5">
                        Turnaround
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="row in simulationTable"
                      :key="row.id"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="p-3 font-mono text-slate-400">
                        #{{ row.id }}
                      </td>
                      <td class="p-3">{{ row.interarrivalTime.toFixed(2) }}</td>
                      <td class="p-3">{{ row.arrivalTime.toFixed(2) }}</td>
                      <td class="p-3 text-blue-400">
                        {{ row.serviceTime.toFixed(2) }}
                      </td>
                      <td class="p-3">{{ row.startTime.toFixed(2) }}</td>
                      <td class="p-3">{{ row.endTime.toFixed(2) }}</td>
                      <td
                        class="p-3"
                        :class="
                          row.waitingTime > 2
                            ? 'text-orange-400'
                            : 'text-slate-500'
                        "
                      >
                        {{ row.waitingTime.toFixed(2) }}
                      </td>
                      <td class="p-3 font-bold text-slate-300">
                        {{ row.turnaroundTime.toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Play } from "lucide-vue-next";

const activeTab = ref("calculator");
const config = reactive({
  model: "MM1",
  arrivalRate: 2.0,
  serviceRate: 3.0,
  servers: 1,
  serviceStdDev: 0.5,
});

const results = reactive({
  utilization: 0,
  systemSize: 0,
  queueSize: 0,
  systemTime: 0,
  queueTime: 0,
  idleProb: 0,
});

const simulationTable = ref([]);

const tabClass = (tab) => {
  return [
    "px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
    activeTab.value === tab
      ? "bg-blue-600/10 text-blue-400 border border-blue-600/30"
      : "text-slate-500 hover:text-slate-300 hover:bg-white/5",
  ];
};

const formatValue = (v) => Number(v).toFixed(3);

const runCalculations = () => {
  const L = config.arrivalRate;
  const M = config.serviceRate;
  const C = config.servers;
  const rho = L / (C * M);

  if (rho >= 1) {
    alert("System is unstable (Arrival rate exceeds capacity)");
    return;
  }

  if (config.model === "MM1") {
    results.utilization = rho;
    results.systemSize = L / (M - L);
    results.queueSize = (L * L) / (M * (M - L));
    results.systemTime = 1 / (M - L);
    results.queueTime = L / (M * (M - L));
    results.idleProb = 1 - rho;
  } else if (config.model === "MMC") {
    // Basic MMC approximations for demo purposes
    results.utilization = rho;
    results.systemSize = rho / (1 - rho) + C; // Simple approx
    results.queueTime = rho / (C * M * (1 - rho));
    results.systemTime = results.queueTime + 1 / M;
    results.queueSize = L * results.queueTime;
    results.idleProb = 1 - rho;
  }
};

const runSimulation = () => {
  const table = [];
  let currentTime = 0;
  let currentArrival = 0;

  for (let i = 1; i <= 15; i++) {
    const interarrival = -Math.log(Math.random()) / config.arrivalRate;
    currentArrival += interarrival;
    const service = -Math.log(Math.random()) / config.serviceRate;

    const start = Math.max(currentArrival, currentTime);
    const end = start + service;
    const wait = start - currentArrival;
    const turnaround = end - currentArrival;

    table.push({
      id: i,
      interarrivalTime: interarrival,
      arrivalTime: currentArrival,
      serviceTime: service,
      startTime: start,
      endTime: end,
      waitingTime: wait,
      turnaroundTime: turnaround,
    });

    currentTime = end;
  }
  simulationTable.value = table;
};

const prevJobEnd = (id) => {
  if (id === 1) return simulationTable.value[0].arrivalTime;
  return simulationTable.value[id - 2].endTime;
};

const runAll = () => {
  runCalculations();
  runSimulation();
};

onMounted(runAll);
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
