<template>
  <q-card flat square bordered class="col-4 stats-card">
    <q-card-section>
      <div class="text-h6 text-weight-light">{{ title }}</div>
      <div class="text-h4 text-weight-light">{{ value }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      required: true,
    },
  },
  name: "DashboardStatCard",
};
</script>

<style scoped>
.stats-card {
  width: 200px !important;
}
</style>
