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
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            color="grey"
            :icon-right="props.row.status === 'sent' ? 'replay' : 'send'"
            no-caps
            flat
            dense
            @click="sendEmail(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span
            :class="props.row.status === 'sent' ? 'text-green' : 'text-orange'"
          >
            {{ props.row.status }}
          </span>
        </q-td>
      </template>
    </q-table>
  </q-card-section>
</template>

<script>
import { useNewslettersStore } from "@/stores/NewslettersStore";
import { date } from "quasar";
import { storeToRefs } from "pinia/dist/pinia";
import NewslettersService from "@/services/NewslettersService";
import { useQuasar } from "quasar";

export default {
  name: "DashboardTable",
  setup() {
    const $q = useQuasar();
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
        name: "status",
        field: "status",
        label: "Status",
        align: "left",
        width: "200px",
        format: (value) => {
          return value === "sent" ? "Sent" : "Draft";
        },
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
      { name: "action", label: "Action", field: "action" },
    ];
    const { newsletters } = storeToRefs(useNewslettersStore());

    return {
      totalUsers: 15,
      newsletters,
      columns,
      $q,
    };
  },
  methods: {
    addRecord() {
      this.$emit("changeView");
    },
    sendEmail(row) {
      const { getAll } = useNewslettersStore();
      NewslettersService.sendNewsletter(row.id)
        .then(() => {
          this.$q.notify({
            type: "positive",
            message: "Newsletter sent successfully",
          });
        })
        .then(() => {
          getAll();
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: err.message,
          });
        });
    },
  },
};
</script>

<style scoped>
.q-table__card {
  box-shadow: none;
}
</style>
