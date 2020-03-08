<template>
    <div class="home">
        <!-- hero -->
        <HomeHero></HomeHero>

        <div class="mt-5 ml-3 mr-3">
            <div class="d-flex justify-content-between">
                <h1> Workouts </h1>
                <b-button variant="secondary" size="md"  @click="openModal()">{{this.$store.state.admin ? 'Add Workout' : 'Suggest Workout'}}</b-button>
            </div>  

            <div class="d-flex mt-2 mb-2">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="max-width: 300px">
                <b-button variant="primary" size="sm"  @click="$router.push('/')">Search</b-button>
            </div>

            <div class="container-fluid">
                <div class="row flex-row flex-nowrap overflow-auto">
                    <div v-for="workout in this.workouts" :key="workout.id">
                        <Card v-if="workout.approved" :big="true" :img="workout.image" :title="workout.title" @click.native="gotoWorkout('workout',workout.id)" >
                        </Card>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="this.$store.state.admin" class="mt-5 ml-3 mr-3">
            <div class="d-flex justify-content-between">
                <h1> Suggested Workouts </h1>
            </div>    
            <div class="container-fluid">
                <div class="row flex-row flex-nowrap overflow-auto">
                    <div v-for="workout in this.workouts" :key="workout.id">
                        <Card v-if="!workout.approved" :big="false" :img="workout.image" :title="workout.title" @click.native="gotoWorkout('workout',workout.id)" >
                        </Card>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-none d-md-block">
            <h1 class="pl-5"> Test </h1>
            <div class="pl-3 d-flex flex-column align-items-center">
                <div class="pr-4">
                    website
                </div>
                <div class="mr-4">
                    webiste
                </div>
            </div>
        </div>

        <div class="d-block d-md-none">
            <h1 class="pl-5"> Test </h1>
            <div class="pl-3 d-flex flex-column align-items-center">
                <div class="pr-4">
                    mobile
                </div>
                <div class="mr-4">
                    mobile
                </div>
            </div>
        </div>

        <b-modal ref="addWorkout" hide-footer title="New Workout">
            <b-form-group
            label="Workout Title"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="workoutTitle"
                name="workoutTitle"
                :state="errors.has('workoutTitle') ? false : null"
            ></b-form-input>
            </b-form-group>
            <b-form-group
            label="Workout Location"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="workoutLocation"
                name="workoutLocation"
                :state="errors.has('workoutLocation') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
            label="Workout Duration"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="workoutDuration"
                name="workoutDuration"
                :state="errors.has('workoutDuration') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
            label="Workout Best Times"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="workoutTimes"
                name="workoutTimes"
                :state="errors.has('workoutTimes') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
            label="Workout Materials"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="workoutMaterials"
                name="workoutMaterials"
                :state="errors.has('workoutMaterials') ? false : null"
                ></b-form-input>
            </b-form-group>
            
            <div v-if="this.$store.state.admin" style="float: right">
                <b-button variant="primary" size="large" type="submit" @click="addWorkoutSuggestion()">Submit as suggestoin</b-button>
                <b-button variant="secondary" size="large" type="submit" @click="addWorkout()">Submit</b-button>
            </div>
            <div v-else style="float: right">
                <b-button variant="secondary" size="large" type="submit" @click="addWorkout()">Submit</b-button>
            </div>
        </b-modal>

        <!-- value proposition  -->
        <!-- <HomeValueProp></HomeValueProp> -->

        <!-- multitab  -->
        <!-- <HomeMultiTab></HomeMultiTab> -->

        <!-- <div class="p-5"></div>

        <div class="jumbotron mb-0">
        <div class="container text-center">
            <div class="display-4">Your employees deserve the best</div>
            <div class="lead">Get your laptops today.</div>
            <b-button variant="info" size="lg" to="/Form/LeaseForm" style="margin-top: 10px">Apply now</b-button>
        </div>
        </div> -->

        <!-- modal products -->
        <!-- <div>
        <br>
        <div class="flex-wrap">
            <div v-for="post in posts" :key="post.id" class="flex-item one-third">
            <card
                :post="posts[(-1)*(post.id-posts.length)]"
                @click.native="OpenProduct(post.id)"
                @ReadMore="OpenPostModal">
            </card>
            </div>
        </div>
        </div>

        <b-modal :active.sync="isPostModalActive" class="hide-scroll">
        <Post :post="post"/>
        </b-modal>-->
    </div>
</template>

<script>
// @ is an alias to /src
import HomeHero from "@/pages/HomeComponents/HomeHero.vue";
import Card from "@/global/Card.vue";

export default {
  name: "home",
  components: { HomeHero, Card },
  data() {
    return {
        workouts: null,
        workoutTitle: null,
        workoutLocation: null,
        workoutTimes: null,
        workoutMaterials: null,
        workoutDuration: null,
    };
  },
  methods: {
      gotoWorkout(path,id){
          this.$router.push('/' + path + '/' + id)
      },
      openModal() {
        this.$refs.addWorkout.show()
      },
      addWorkout(){
        this.$validator.validateAll().then(result => {
            if (result) {
                var lastId = this.workouts[this.workouts.length-1].id;
                var workout = {
                    id: lastId+1,
                    title: this.workoutTitle,
                    location: this.workoutLocation,
                    duration: this.workoutDuration,
                    times: this.workoutTimes,
                    materials: this.workoutMaterials,
                    image: 'workout2.jpg',
                    reviews: [],
                    approved: this.$store.state.admin
                }
                this.$store.dispatch("create", workout);
                this.workoutTitle = null;
                this.workoutLocation = null;
                this.workoutTimes = null;
                this.workoutMaterials = null;
                this.workoutDuration = null;
                this.$refs.addWorkout.hide()
            } else {
            }
        }
    )
    },
    addWorkoutSuggestion(){
        this.$validator.validateAll().then(result => {
            if (result) {
                var lastId = this.workouts[this.workouts.length-1].id;
                var workout = {
                    id: lastId+1,
                    title: this.workoutTitle,
                    location: this.workoutLocation,
                    duration: this.workoutDuration,
                    times: this.workoutTimes,
                    materials: this.workoutMaterials,
                    image: 'workout2.jpg',
                    reviews: [],
                    approved: false
                }
                this.$store.dispatch("create", workout);
                this.workoutTitle = null;
                this.workoutLocation = null;
                this.workoutTimes = null;
                this.workoutMaterials = null;
                this.workoutDuration = null;
                this.$refs.addWorkout.hide()
            } else {
                }
        }
    )
    },
  },
  created() {
      this.workouts = this.$store.state.workouts;
  }
};
</script>
<style>
</style>
