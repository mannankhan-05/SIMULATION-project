<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <main class="max-w-7xl mx-auto p-6">
      <!-- Calculator Tab -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Input Section -->
        <div class="lg:col-span-4 space-y-6">
          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
          >
            <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings2 :size="18" class="text-indigo-500" />
              Model Parameters
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5"
                  >Model Type</label
                >
                <select
                  v-model="form.modelType"
                  class="w-full rounded-lg border-slate-200 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="MM1">M / M / 1</option>
                  <option value="MMC">M / M / C</option>
                  <option value="MG1">M / G / 1</option>
                  <option value="MGC">M / G / C (Erlang-C)</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-slate-700 mb-1.5 flex justify-between"
                >
                  Interarrival Rate (λ)
                  <span class="text-slate-400 font-normal">arrivals/unit</span>
                </label>
                <input
                  type="number"
                  v-model.number="form.lambda"
                  step="0.1"
                  min="0.1"
                  class="w-full rounded-lg border-slate-200 text-sm"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-slate-700 mb-1.5 flex justify-between"
                >
                  Service Rate (μ)
                  <span class="text-slate-400 font-normal">services/unit</span>
                </label>
                <input
                  type="number"
                  v-model.number="form.mu"
                  step="0.1"
                  min="0.1"
                  class="w-full rounded-lg border-slate-200 text-sm"
                />
              </div>

              <div v-if="['MMC', 'MGC'].includes(form.modelType)">
                <label class="block text-sm font-medium text-slate-700 mb-1.5"
                  >Number of Servers (C)</label
                >
                <input
                  type="number"
                  v-model.number="form.servers"
                  min="1"
                  class="w-full rounded-lg border-slate-200 text-sm"
                />
              </div>

              <div v-if="form.modelType === 'MG1'">
                <label class="block text-sm font-medium text-slate-700 mb-1.5"
                  >Service Std. Deviation (σ)</label
                >
                <input
                  type="number"
                  v-model.number="form.sigma"
                  step="0.01"
                  min="0"
                  class="w-full rounded-lg border-slate-200 text-sm"
                />
              </div>

              <button
                @click="calculatePerformance"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 mt-4"
              >
                <Play :size="18" />
                Compute Results
              </button>
            </div>
          </div>

          <!-- Formula Info Card -->
          <div class="bg-slate-800 text-slate-300 p-5 rounded-2xl">
            <h3
              class="text-white text-sm font-semibold mb-2 flex items-center gap-2"
            >
              <Info :size="16" />
              Quick Reference
            </h3>
            <p class="text-xs leading-relaxed opacity-80">
              The <span class="text-indigo-400">ρ (Rho)</span> value indicates
              system utilization. For stable queues, ρ must be less than 1.
            </p>
          </div>
        </div>

        <!-- Output Section -->
        <div class="lg:col-span-8 space-y-6">
          <div v-if="results" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(val, key) in results"
              :key="key"
              class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:border-indigo-200 transition-colors"
            >
              <div>
                <p
                  class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1"
                >
                  {{ val.label }}
                </p>
                <p class="text-sm text-slate-500 mb-2">{{ val.description }}</p>
              </div>
              <p class="text-3xl font-bold text-slate-900 tabular-nums">
                {{
                  typeof val.value === "number"
                    ? val.value.toFixed(4)
                    : val.value
                }}
              </p>
            </div>
          </div>

          <div
            v-else
            class="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400"
          >
            <Calculator :size="48" class="mb-4 opacity-20" />
            <p>Enter parameters and click compute to see results</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from "vue";
import {
  // Activity,
  Settings2,
  Info,
  Calculator,
  Play,
} from "lucide-vue-next";

const results = ref(null);

// Calculator Form
const form = reactive({
  modelType: "MM1",
  lambda: 2,
  mu: 3,
  servers: 2,
  sigma: 0.1,
});

let simInterval = null;

const calculatePerformance = () => {
  const { lambda, mu, servers, modelType, sigma } = form;
  const rho = lambda / (servers * mu);

  let p0 = 0;
  let lq = 0;

  if (modelType === "MM1") {
    const r = lambda / mu;
    if (r >= 1) return alert("System is unstable (λ >= μ)");
    lq = (r * r) / (1 - r);
    const l = lambda / (mu - lambda);
    const w = 1 / (mu - lambda);
    const wq = lambda / (mu * (mu - lambda));
    results.value = {
      p: { label: "ρ (Rho)", value: r, description: "Server Utilization" },
      l: { label: "L", value: l, description: "Avg Number in System" },
      lq: { label: "Lq", value: lq, description: "Avg Number in Queue" },
      w: { label: "W", value: w, description: "Avg Time in System" },
      wq: { label: "Wq", value: wq, description: "Avg Time in Queue" },
    };
  } else if (modelType === "MMC") {
    if (rho >= 1) return alert("System is unstable (λ >= Cμ)");
    const r = lambda / mu;

    // Calculate P0
    let sum = 0;
    for (let n = 0; n < servers; n++) {
      sum += Math.pow(r, n) / factorial(n);
    }
    sum += Math.pow(r, servers) / (factorial(servers) * (1 - rho));
    p0 = 1 / sum;

    lq =
      (p0 * Math.pow(r, servers) * rho) /
      (factorial(servers) * Math.pow(1 - rho, 2));
    const wq = lq / lambda;
    const w = wq + 1 / mu;
    const l = lambda * w;

    results.value = {
      p: { label: "ρ (Rho)", value: rho, description: "System Utilization" },
      p0: { label: "P0", value: p0, description: "Prob. system is empty" },
      lq: { label: "Lq", value: lq, description: "Avg Number in Queue" },
      wq: { label: "Wq", value: wq, description: "Avg Time in Queue" },
      l: { label: "L", value: l, description: "Avg Number in System" },
      w: { label: "W", value: w, description: "Avg Time in System" },
    };
  } else if (modelType === "MG1") {
    const r = lambda / mu;
    if (r >= 1) return alert("System is unstable (λ >= μ)");
    lq =
      (Math.pow(lambda, 2) * Math.pow(sigma, 2) + Math.pow(r, 2)) /
      (2 * (1 - r));
    const wq = lq / lambda;
    const w = wq + 1 / mu;
    const l = lambda * w;
    results.value = {
      p: { label: "ρ (Rho)", value: r, description: "Server Utilization" },
      lq: { label: "Lq", value: lq, description: "Avg Number in Queue" },
      wq: { label: "Wq", value: wq, description: "Avg Time in Queue" },
      l: { label: "L", value: l, description: "Avg Number in System" },
      w: { label: "W", value: w, description: "Avg Time in System" },
    };
  } else if (modelType === "MGC") {
    // Erlang-C Approximation / Model
    const r = lambda / mu;
    let sum = 0;
    for (let k = 0; k < servers; k++) {
      sum += Math.pow(r, k) / factorial(k);
    }
    const pc =
      Math.pow(r, servers) /
      (factorial(servers) * (1 - rho)) /
      (sum + Math.pow(r, servers) / (factorial(servers) * (1 - rho)));
    const wq = pc * (1 / (servers * mu - lambda));
    lq = lambda * wq;
    results.value = {
      p: { label: "ρ (Rho)", value: rho, description: "System Utilization" },
      pc: {
        label: "P(Wait)",
        value: pc,
        description: "Prob. a customer has to wait",
      },
      lq: { label: "Lq", value: lq, description: "Avg Number in Queue" },
      wq: { label: "Wq", value: wq, description: "Avg Time in Queue" },
    };
  }
};

// Utility
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

onUnmounted(() => clearInterval(simInterval));
</script>

<style scoped>
.entity-list-enter-active,
.entity-list-leave-active {
  transition: all 0.5s ease;
}
.entity-list-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.entity-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
