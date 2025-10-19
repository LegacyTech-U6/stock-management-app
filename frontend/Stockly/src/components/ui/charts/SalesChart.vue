<template>
  <div class="w-full h-full bg-white p-6 rounded-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">Sales & Purchase</h2>
      </div>

      <!-- Time Period Tabs -->
      <div class="flex gap-2 bg-gray-100 rounded-lg p-1">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-1.5 rounded-md text-sm font-medium transition-colors',
            activeTab === tab
              ? 'bg-orange-500 text-white'
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex gap-6 mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <div class="w-3 h-3 rounded-full bg-orange-200"></div>
          <span class="text-sm text-gray-500">Total Purchase</span>
        </div>
        <div class="text-2xl font-bold text-gray-800">3K</div>
      </div>
      <div>
        <div class="flex items-center gap-2 mb-1">
          <div class="w-3 h-3 rounded-full bg-orange-500"></div>
          <span class="text-sm text-gray-500">Total Sales</span>
        </div>
        <div class="text-2xl font-bold text-gray-800">1K</div>
      </div>
    </div>

    <!-- Chart -->
    <div class="relative" style="height: 320px;">
      <svg :width="chartWidth" :height="chartHeight" class="w-full">
        <!-- Grid lines -->
        <g v-for="(tick, index) in yAxisTicks" :key="`grid-${index}`">
          <line
            :x1="chartPadding.left"
            :y1="getYPosition(tick)"
            :x2="chartWidth - chartPadding.right"
            :y2="getYPosition(tick)"
            stroke="#f0f0f0"
            stroke-width="1"
            stroke-dasharray="3,3"
          />
        </g>

        <!-- Y-axis labels -->
        <g v-for="(tick, index) in yAxisTicks" :key="`y-label-${index}`">
          <text
            :x="chartPadding.left - 10"
            :y="getYPosition(tick) + 4"
            text-anchor="end"
            class="text-xs fill-gray-400"
          >
            {{ formatYAxis(tick) }}
          </text>
        </g>

        <!-- Bars -->
        <g v-for="(item, index) in chartData" :key="`bar-${index}`">
          <!-- Purchase bar (light orange) -->
          <rect
            :x="getXPosition(index)"
            :y="getYPosition(item.purchase)"
            :width="barWidth"
            :height="getBarHeight(item.purchase)"
            fill="#fed7aa"
            rx="4"
            ry="4"
            class="hover:opacity-80 transition-opacity cursor-pointer"
            @mouseenter="showTooltip(item, index, $event)"
            @mouseleave="hideTooltip"
          />

          <!-- Sales bar (orange) -->
          <rect
            :x="getXPosition(index)"
            :y="getYPosition(item.sales)"
            :width="barWidth"
            :height="getBarHeight(item.sales)"
            fill="#fb923c"
            rx="4"
            ry="4"
            class="hover:opacity-80 transition-opacity cursor-pointer"
            @mouseenter="showTooltip(item, index, $event)"
            @mouseleave="hideTooltip"
          />
        </g>

        <!-- X-axis labels -->
        <g v-for="(item, index) in chartData" :key="`x-label-${index}`">
          <text
            :x="getXPosition(index) + barWidth / 2"
            :y="chartHeight - chartPadding.bottom + 20"
            text-anchor="middle"
            class="text-xs fill-gray-400"
          >
            {{ item.time }}
          </text>
        </g>
      </svg>

      <!-- Tooltip -->
      <div
        v-if="tooltip.visible"
        :style="{
          position: 'absolute',
          left: tooltip.x + 'px',
          top: tooltip.y + 'px',
          transform: 'translate(-50%, -100%)',
          marginTop: '-10px'
        }"
        class="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs pointer-events-none"
      >
        <div class="font-semibold mb-1">{{ tooltip.data.time }}</div>
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 rounded-full bg-orange-500"></div>
          <span>Total Sales: {{ tooltip.data.sales?.toLocaleString() }}</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-orange-200"></div>
          <span>Total Purchase: {{ tooltip.data.purchase?.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('1Y');

const tabs = ['1D', '1W', '1M', '3M', '6M', '1Y'];

const chartData = [
  { time: '2 am', sales: 18000, purchase: 38000 },
  { time: '4 am', sales: 19000, purchase: 30000 },
  { time: '6 am', sales: 10000, purchase: 28000 },
  { time: '8 am', sales: 18000, purchase: 49000 },
  { time: '10 am', sales: 24000, purchase: 39000 },
  { time: '12 am', sales: 18000, purchase: 48000 },
  { time: '14 pm', sales: 10000, purchase: 28000 },
  { time: '16 pm', sales: 18000, purchase: 30000 },
  { time: '18 pm', sales: 40000, purchase: 48000 },
  { time: '20 pm', sales: 8000, purchase: 30000 },
  { time: '22 pm', sales: 30000, purchase: 38000 },
  { time: '24 pm', sales: 19000, purchase: 30000 },
];

const chartWidth = 1000;
const chartHeight = 320;
const chartPadding = { top: 20, right: 30, bottom: 40, left: 50 };

const yAxisTicks = [0, 20000, 40000, 60000, 80000, 100000];
const maxValue = 100000;

const barWidth = computed(() => {
  const availableWidth = chartWidth - chartPadding.left - chartPadding.right;
  const totalBars = chartData.length;
  const barGap = 20;
  return (availableWidth - barGap * (totalBars - 1)) / totalBars;
});

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  data: {}
});

const formatYAxis = (value) => {
  if (value >= 1000) {
    return `${value / 1000}K`;
  }
  return value;
};

const getYPosition = (value) => {
  const availableHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  const ratio = value / maxValue;
  return chartHeight - chartPadding.bottom - (ratio * availableHeight);
};

const getBarHeight = (value) => {
  const availableHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  return (value / maxValue) * availableHeight;
};

const getXPosition = (index) => {
  const availableWidth = chartWidth - chartPadding.left - chartPadding.right;
  const barGap = 20;
  const totalWidth = barWidth.value * chartData.length + barGap * (chartData.length - 1);
  const startX = chartPadding.left + (availableWidth - totalWidth) / 2;
  return startX + index * (barWidth.value + barGap);
};

const showTooltip = (item, index, event) => {
  const rect = event.target.getBoundingClientRect();
  const container = event.target.closest('.relative');
  const containerRect = container.getBoundingClientRect();

  tooltip.value = {
    visible: true,
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top,
    data: item
  };
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};
</script>

<style scoped>
/* Tailwind classes are used inline */
</style>
