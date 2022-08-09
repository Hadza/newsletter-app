<template>
  <div class="about">
    <h1>Sorry to see you go!</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UsersService from "@/services/UsersService";

export default defineComponent({
  name: "UnsubscribeView",
  components: {},
  mounted() {
    // unsubscribe user service from topic from router params
    if (this.$route.params.topic && this.$route.params.user) {
      UsersService.deleteSubscription(
        this.$route.params.topic,
        this.$route.params.user
      );
    }
  },
});
</script>
