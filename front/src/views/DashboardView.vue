<template>
  <div class="home">
    <div class="column">
      <q-card flat bordered class="q-mx-auto q-my-md">
        <template v-if="showSummary">
          <dashboard-summary></dashboard-summary>
          <q-separator inset />
          <dashboard-table
            @change-view="showSummary = !showSummary"
          ></dashboard-table>
        </template>
        <template v-else>
          <new-newsletter
            @change-view="showSummary = !showSummary"
          ></new-newsletter>
        </template>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import DashboardTable from "@/components/DashboardTable";
import DashboardSummary from "@/components/DashboardSummary";
import { useNewslettersStore } from "@/stores/NewslettersStore";
import { useTopicsStore } from "@/stores/TopicsStore";
import { useUsersStore } from "@/stores/UsersStore";
import NewNewsletter from "@/components/NewNewsletter";

export default defineComponent({
  name: "DashboardView",
  components: { NewNewsletter, DashboardSummary, DashboardTable },
  setup() {
    const showSummary = ref(true);
    return {
      showSummary,
    };
  },
  methods: {
    loadNewsletters() {
      const { getAll } = useNewslettersStore();
      getAll();
    },
    loadTopics() {
      const { getAll } = useTopicsStore();
      getAll();
    },
    loadUsers() {
      const { getAll } = useUsersStore();
      getAll();
    },
    changeView() {
      this.showSummary = !this.showSummary;
    },
  },
  mounted() {
    // load all data to store
    this.loadNewsletters();
    this.loadTopics();
    this.loadUsers();
  },
});
</script>

<style scoped></style>
