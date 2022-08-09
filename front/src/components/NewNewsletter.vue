<template>
  <q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-regular">New topic</div>
      <q-input v-model="title" label="Title" class="q-mb-lg" />
      <template v-if="!newTopic">
        <q-select
          v-model="topic"
          @update:model-value="changeTopic"
          :options="options"
          label="Topic"
          class="q-mb-sm"
        >
          <template v-slot:after>
            <q-btn round dense flat icon="add" @click="toggleNewTopic" />
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
        accept=".png, .pdf, image/*"
        class="q-my-lg"
        @update:model-value="readFile"
      >
        <template v-slot:prepend>
          <q-icon name="folder_open" />
        </template>

        <template v-slot:hint> PNG/PDF only </template>

        <template v-slot:after>
          <q-btn round dense flat icon="add" @click.stop.prevent />
        </template>
      </q-file>
    </q-card-section>
    <q-card-section>
      <h6 class="text-weight-regular q-my-auto">Subscribers</h6>
      <q-table
        :rows="users"
        :columns="columns"
        class="table q-px-none"
        row-key="email"
      >
        <template v-slot:top-right>
          <q-btn
            color="gray"
            size="md"
            text-color="black"
            unelevated
            label="Add"
            class="align-self-center col-auto"
            @click="addEmailList"
          >
            <template v-slot:default>
              <q-icon class="q-mx-sm" name="add" />
            </template>
          </q-btn>
        </template>
        <template v-slot:top-left>
          <q-input
            dense
            v-model="emailList"
            label="Email list"
            hint="Separate emails with a comma"
            class="q-mb-sm col-auto email-list"
            size="sm"
          >
          </q-input>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteItem(props.row)"
            />
          </q-td>
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
import UsersService from "@/services/UsersService";

export default {
  name: "NewNewsletter",
  setup() {
    const { topics } = storeToRefs(useTopicsStore());
    const users = ref([]);
    const emailList = ref("");
    const user = ref({ name: "", email: "" });
    const title = ref("");
    const topic = ref("");
    const file = ref(null);
    const tempFile = ref({});
    const send = ref(true);
    const newTopic = ref(false);
    const toggleNewUser = ref(false);
    const { createNewsletter } = useNewslettersStore();
    const { createUsers, getUsersByTopic } = useUsersStore();
    const { createTopic } = useTopicsStore();

    const columns = [
      {
        name: "id",
        field: "id",
        label: "ID",
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
      { name: "action", label: "Action", field: "action" },
    ];

    return {
      topics,
      users,
      columns,
      title,
      topic,
      file,
      tempFile,
      send,
      user,
      newTopic,
      createNewsletter,
      createUsers,
      createTopic,
      toggleNewUser,
      getUsersByTopic,
      emailList,
    };
  },
  methods: {
    saveNewsletter() {
      const { title, topic, file, users, send, newTopic, tempFile } = this;
      const { createNewsletter, createTopic } = this;

      const filed = file.length > 0 ? file[0] : null;

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
    async readFile() {
      console.log("entra");
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        this.tempFileStream = e.target.result;
      };
      const result = reader.readAsDataURL(this.file);
      return result;
    },
    changeTopic() {
      const { topic } = this;
      const { getUsersByTopic } = this;
      console.log(topic);
      this.users = getUsersByTopic(topic.value);
    },
    async addEmailList() {
      let { emailList, users } = this;
      //   split list of emails, compare to email regex and add to users array
      const emails = emailList.replace(/ /g, "").split(",");
      console.log(emails);
      emails.forEach((email) => {
        if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
          let isInArray = false;
          if (users.find((user) => user.email === email)) {
            isInArray = true;
          }
          //  if email is not in array, find by email and add to users array
          if (!isInArray) {
            UsersService.findByEmail(email).then((user) => {
              if (user.data.email) {
                users.push(user.data);
              } else {
                users.push({ email });
              }
            });
          }
        }
      });
      // clean email list
      this.emailList = "";
    },
    deleteItem(index) {
      let { users } = this;
      users.splice(users.indexOf(index), 1);
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

.email-list {
  min-width: 280px;
}
</style>
