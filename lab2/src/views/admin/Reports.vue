<template>
  <h1>Reports</h1>

  <ReportsTable :items="reports">
    <template #row="{ item }">
      <td>#{{ item.id }}</td>
      <td><b>{{ item.title }}</b></td>
      <td>{{ item.status.toUpperCase() }}</td>
    </template>
  </ReportsTable>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ReportsTable from "@/components/ReportsTable.vue"

const reports = ref([
  { id: 1, title: "Monthly report", status: "open" },
  { id: 2, title: "Security audit", status: "closed" },
])
</script>
