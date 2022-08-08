<template>
  <q-card-section>
    <q-table title="Newsletters" :rows="newsletters" :columns="columns">
      <template v-slot:top-right>
        <q-btn
          color="gray"
          size="md"
          square
          text-color="black"
          unelevated
          label="New Newsletter"
          class="align-self-center"
          @click="addRecord"
        >
          <template v-slot:default>
            <q-icon class="q-mx-sm" name="add" />
          </template>
        </q-btn>
      </template>
    </q-table>
  </q-card-section>
</template>

<script>
import { useNewslettersStore } from "@/stores/NewslettersStore";
import { date } from "quasar";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: "DashboardTable",
  setup() {
    const columns = [
      {
        name: "id",
        field: "id",
        label: "ID",
        align: "right",
        width: "100px",
      },
      {
        name: "title",
        field: "title",
        label: "Title",
        align: "left",
        width: "200px",
      },
      {
        name: "topic",
        field: (row) => row.topic.name,
        label: "Topic",
        align: "left",
        width: "200px",
      },
      {
        name: "created_at",
        field: "createdAt",
        label: "Created At",
        align: "left",
        width: "200px",
        format: (value) => {
          return date.formatDate(value, "DD-MM-YY HH:mm");
        },
      },
    ];
    const { newsletters } = storeToRefs(useNewslettersStore());

    return {
      totalUsers: 15,
      newsletters,
      columns,
    };
  },
  methods: {
    addRecord() {
      this.$emit("changeView");
    },
  },
};
</script>

<style scoped>
.q-table__card {
  box-shadow: none;
}
</style>
