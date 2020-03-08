<template>
  <div style="position: fixed; width: 100%; z-index: 10">
    <b-navbar toggleable="md" variant="info" type="light" style="height: 85px; border-radius: 0 0 15px 15px;">
      <b-navbar-brand style="width: 100%" class="d-flex justify-content-center">
        <b-link to="/" class="navbar-item">
          <b-img
            :src="require(`@/assets/images/getuplogo.png`)"
            fluid
            alt="GetUP Logo"
            style="max-height:50px; margin-left: 10px"
            class="filter-white"
          ></b-img>
        </b-link>
      </b-navbar-brand>

      <!-- <b-navbar-toggle style="margin-top: -50px;"
        target="nav-collapse"
      ></b-navbar-toggle> -->
      <div v-if="this.$route.name != 'Workout'"></div>
      <b-button v-if="this.$route.name == 'Workout'" style="margin-top: -50px; float: left" class="d-md-none" variant="secondary" size="md" @click="$router.push('/')"><i class="fas fa-arrow-left fa-3x"></i></b-button>
      <div style="margin-top: -50px; float: right" class="d-flex flex-column align-items-center d-md-none">
          <h6 class="text-white p-0 mb-2"> <i class="fas fa-user"></i> {{this.$store.state.admin ? 'testAdmin' : 'testUser'}} </h6>
          <b-button variant="primary" size="md" @click="toggleAdmin()">Switch to {{this.$store.state.admin ? 'user' : 'admin'}}</b-button>
      </div>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            to="/Form/LeaseForm"
          >
            <!-- <b-button variant="outline-info" size="lg">Apply Now</b-button> -->
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-button v-if="this.$route.name == 'Workout'" style="margin-top: -65px; float: left; z-index: 2; position: relative; margin-left: 10px;" class="d-none d-md-flex" variant="secondary" size="md" @click="$router.push('/')"><i class="fas fa-arrow-left fa-3x"></i></b-button>
    <div style="margin-top: -65px; margin-right: 10px; float: right; z-index: 2; position: relative;" class="flex-column align-items-center d-none d-md-flex">
        <h6 class="text-white p-0 mb-2"> <i class="fas fa-user"></i> {{this.$store.state.admin ? 'testAdmin' : 'testUser'}} </h6>
        <b-button variant="primary" size="md" @click="toggleAdmin()">Switch to {{this.$store.state.admin ? 'user' : 'admin'}}</b-button>
    </div>
  </div>
</template>

<script>
const Navbar = {
  name: "Navbar",
  created() {},
  methods: {
      toggleAdmin(){
          this.$store.dispatch("toggleAdmin")
      }
  }
};

export default Navbar;
</script>

<style scoped>
</style>
