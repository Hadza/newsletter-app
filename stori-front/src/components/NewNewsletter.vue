<template>
  <q-card-section>
    <q-card-section>
      <q-card-section>
        <div class="text-h6">New</div>
      </q-card-section>
      <q-input v-model="title" label="Title" class="q-mb-lg" />
      <template v-if="!newTopic">
        <q-select
          v-model="topic"
          :options="options"
          label="Topic"
          class="q-mb-sm"
        >
          <template v-slot:after>
            <q-btn
              color="white"
              size="md"
              square
              text-color="black"
              unelevated
              class="align-self-center"
              @click="toggleNewTopic"
            >
              <template v-slot:default>
                <q-icon name="add" />
              </template>
            </q-btn>
          </template>
        </q-select>
      </template>
      <template v-else>
        <q-input v-model="topic" label="Topic" class="q-my-lg">
          <template v-slot:after>
            <q-btn
              color="white"
              size="md"
              square
              text-color="black"
              unelevated
              class="align-self-center"
              @click="newTopic = !newTopic"
            >
              <template v-slot:default>
                <q-icon name="clear" />
              </template>
            </q-btn>
          </template>
        </q-input>
      </template>
      <q-file
        bottom-slots
        v-model="file"
        label="File"
        counter
        max-files="1"
        accept=".png, image/*, .pdf"
        class="q-my-lg"
      >
        <template v-slot:prepend>
          <q-icon name="folder_open" />
        </template>

        <template v-slot:hint> PNG/PDF only </template>

        <template v-slot:append>
          <q-btn round dense flat icon="add" @click.stop.prevent />
        </template>
      </q-file>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-table
        title="Subscribers"
        :rows="users"
        :columns="columns"
        class="table"
      >
        <template v-slot:top-right>
          <q-btn
            color="gray"
            size="md"
            square
            text-color="black"
            unelevated
            label="Add"
            class="align-self-center"
            @click="users.push({ name: 'User', email: 'example@gos.com' })"
          >
            <template v-slot:default>
              <q-icon class="q-mx-sm" name="add" />
            </template>
          </q-btn>
        </template>
      </q-table>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-toggle v-model="send" label="Send after saving" />
    </q-card-section>
    <q-card-actions align="right">
      <!--      cancel button-->
      <q-btn
        color="white"
        size="md"
        square
        text-color="grey-8"
        unelevated
        label="Cancel"
        class="align-self-center"
        @click="true"
      >
      </q-btn>
      <q-btn
        color="primary"
        size="md"
        text-color="black"
        unelevated
        outline
        label="Save newsletter"
        class="align-self-center"
        @click="saveNewsletter"
      >
      </q-btn>
    </q-card-actions>
  </q-card-section>
</template>

<script>
import { storeToRefs } from "pinia/dist/pinia";
import { useUsersStore } from "@/stores/UsersStore";
import { useTopicsStore } from "@/stores/TopicsStore";
import { useNewslettersStore } from "@/stores/NewslettersStore";
import { ref } from "vue";

export default {
  name: "NewNewsletter",
  setup() {
    const { topics } = storeToRefs(useTopicsStore());
    const users = ref([]);
    const title = ref("");
    const topic = ref("");
    const file = ref(null);
    const send = ref(true);
    const newTopic = ref(false);
    const { createNewsletter } = useNewslettersStore();
    const { createUsers } = useUsersStore();
    const { createTopic } = useTopicsStore();

    const columns = [
      {
        name: "name",
        field: "name",
        label: "Name",
        align: "left",
        width: "200px",
      },
      {
        name: "email",
        field: "email",
        label: "Email",
        align: "left",
        width: "200px",
      },
    ];

    return {
      topics,
      users,
      columns,
      title,
      topic,
      file,
      send,
      newTopic,
      createNewsletter,
      createUsers,
      createTopic,
    };
  },
  methods: {
    saveNewsletter() {
      const { title, topic, file, users, send, newTopic } = this;
      const { createNewsletter, createTopic } = this;

      createNewsletter({
        title,
        topic,
        file,
        users,
        send,
        newTopic,
      });
    },
    toggleNewTopic() {
      this.topic = "";
      this.newTopic = !this.newTopic;
    },
  },
  computed: {
    options() {
      return this.topics.map((topic) => {
        return {
          label: topic.name,
          value: topic.id,
        };
      });
    },
  },
};
</script>

<style scoped>
.q-table__card {
  box-shadow: none;
}

.table {
  min-width: 400px;
}

/*table min width 320 on mobile*/
@media (max-width: 375px) {
  .table {
    min-width: 320px;
  }
}
</style>
