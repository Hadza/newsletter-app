<template>
  <q-card-section>
    <q-card-section>
      <div class="text-h6">New record</div>
    </q-card-section>

    <q-card-section class="flex justify-around gap">
      <dashboard-stat-card
        title="Total Subscribers"
        :value="getUsersCount"
      ></dashboard-stat-card>
      <dashboard-stat-card
        title="Total Topics"
        :value="getTopicsCount"
      ></dashboard-stat-card>
      <dashboard-stat-card
        title="Total Newsletters"
        :value="getNewslettersCount"
      ></dashboard-stat-card>
    </q-card-section>
  </q-card-section>
</template>

<script>
export default {
  name: "NewNewsletter",
};
</script>

<style scoped></style>
