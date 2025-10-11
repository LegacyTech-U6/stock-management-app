<template>
  <div class="w-full max-w-md mx-auto">
    <Doughnut :data="chartData" :chart-options="chartOptions" class="h-64"/>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { onMounted, computed } from "vue";
import { useStatisticsStore } from "@/stores/statisticStore";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const statsStore = useStatisticsStore();

onMounted(() => {
  statsStore.fetchRevenueByCategory();
});

const chartData = computed(() => ({
  labels: statsStore.revenueByCategory.map(c => c.category_name),
  datasets: [
    {
      data: statsStore.revenueByCategory.map(c => c.revenue),
      backgroundColor: [
        "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
      ],
      borderWidth: 1,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.label}: $${context.raw}`;
        },
      },
    },
  },
};
</script>
