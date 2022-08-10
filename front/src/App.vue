<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-white text-black text-center">
      <q-toolbar>
        <q-toolbar-title class="text-h3 text-weight-medium title-font"
          >Newsletter
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LayoutDefault",

  components: {},

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Special+Elite&display=swap");
.q-toolbar {
  height: 90px;
}

.title-font {
  font-family: "Special Elite", cursive;
}
</style>
