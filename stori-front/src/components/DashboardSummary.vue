<template>
  <q-card-section>
    <q-card-section>
      <div class="text-h6">Summary</div>
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
import { useNewslettersStore } from "@/stores/NewslettersStore";
import { useTopicsStore } from "@/stores/TopicsStore";
import { useUsersStore } from "@/stores/UsersStore";
import { storeToRefs } from "pinia";
import DashboardStatCard from "@/components/DashboardStatCard";

export default {
  name: "DashboardSummary",
  components: { DashboardStatCard },
  setup() {
    const newslettersStore = useNewslettersStore();
    const topicsStore = useTopicsStore();
    const usersStore = useUsersStore();

    console.log("newslettersStore", newslettersStore);
    console.log("topicsStore", topicsStore);
    console.log("usersStore", usersStore);

    const { getNewslettersCount } = storeToRefs(newslettersStore);
    const { getTopicsCount } = storeToRefs(topicsStore);
    const { getUsersCount } = storeToRefs(usersStore);

    return {
      getUsersCount,
      getTopicsCount,
      getNewslettersCount,
    };
  },
};
</script>

<style scoped>
.gap {
  gap: 15px;
}
</style>
