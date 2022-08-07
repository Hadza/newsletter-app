<template>
  <div class="home">
    <div class="column">
      <q-card flat bordered class="q-mx-auto q-my-md">
        <q-card-section>
          <div class="text-h6">Summary</div>
        </q-card-section>

        <q-card-section class="flex justify-around gap">
          <q-card flat square bordered class="col-4 stats-card">
            <q-card-section>
              <div class="text-h6 text-weight-light">Total Emails</div>
              <div class="text-h4 text-weight-light">{{ totalUsers }}</div>
            </q-card-section>
          </q-card>
          <q-card flat square bordered class="col-4 stats-card">
            <q-card-section>
              <div class="text-h6 text-weight-light">Total Recipients</div>
              <div class="text-h4 text-weight-light">{{ totalUsers }}</div>
            </q-card-section>
          </q-card>
          <q-card flat square bordered class="col-4 stats-card">
            <q-card-section>
              <div class="text-h6 text-weight-light">Total Topics</div>
              <div class="text-h4 text-weight-light">{{ totalTopics }}</div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-separator inset />
        <!--        button for new record aligned to the right-->
        <q-card-section>
          <q-table title="Topics" :rows="rows" :columns="columns">
            <template v-slot:top-right>
              <q-btn
                color="gray"
                size="md"
                square
                text-color="black"
                unelevated
                label="New Record"
                class="align-self-center"
                ripple="false"
                @click="addRecord"
              >
                <template v-slot:default>
                  <q-icon class="q-mx-sm" name="add" />
                </template>
              </q-btn>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TopicsService from "@/services/TopicsService";

const rows = [];
const columns = [
  {
    name: "id",
    label: "ID",
    align: "right",
    width: "100px",
  },
  {
    name: "name",
    label: "Name",
    align: "left",
    width: "200px",
  },
];

export default defineComponent({
  name: "DashboardView",
  components: {},
  setup() {
    return {
      totalUsers: 15,
      rows,
      columns,
    };
  },
  methods: {
    async fetchTopics() {
      const response = await TopicsService.getAll().catch((error) => {
        console.log(error);
      });
      console.log(response);
      this.rows = response.data;
    },
    addRecord() {
      TopicsService.create({
        name: "New Topic",
      }).then(() => {
        this.fetchTopics();
      });
    },
  },
  computed: {
    totalTopics() {
      return this.rows.length;
    },
  },
  mounted() {
    this.fetchTopics();
  },
});
</script>

<style scoped>
.gap {
  gap: 15px;
}
.stats-card {
  width: 200px !important;
}

.q-table__card {
  box-shadow: none;
}
</style>
