<template>
    <div>
        <img :src="GetImageUrl(this.workout.image)" style="width: 100%; z-index:0; margin-bottom: -15px;">
        <div class="workout-details-container">
            <div class="d-flex justify-content-between">
                <h2> {{this.workout.title}} </h2>
                <div class="d-flex flex-column" v-if="this.$store.state.admin">
                    <b-button v-if="this.$store.state.admin && !this.workout.approved" variant="primary" size="md" @click="approveWorkout()"> Approve </b-button>
                    <b-button variant="secondary" size="md" v-b-modal.editWorkout> <i class="fas fa-edit"></i> </b-button>
                    <b-button variant="secondary" size="md" v-b-modal.deleteWorkout> <i class="fas fa-trash"></i> </b-button>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <h5> {{this.workout.location}} </h5>
                <h5> {{this.workout.duration}} </h5>
            </div>
            <div class="rectangle" />
            <div class="d-flex justify-content-between">
                <div>
                    <h5> Best Times </h5>
                    {{this.workout.times}}
                </div>
                <div>
                    <h5> Materials </h5>
                    {{this.workout.materials}}
                </div>
            </div>
            <div class="rectangle" />
            <div class="d-flex justify-content-between mb-3">
                <h5> Reviews </h5>
                <b-button variant="light" size="sm" @click="openModal()"> Add </b-button>
            </div>
            <div v-for="review in this.workout.reviews" :key="review.id" style="margin-bottom: 10px">
                <b><div style="margin-left: 15px" class="d-flex justify-content-between">  
                    <div> {{review.username}} </div> <div> {{review.rating}}/5 </div> 
                </div></b>
                <div style="margin-left: 25px" class="d-flex justify-content-between">
                    {{review.body}}
                    <b-button v-if="$store.state.admin" variant="secondary" size="sm" @click="deleteReview(review.id)"> <i class="fas fa-trash"></i> </b-button>
                </div>
            </div>
        </div>

        <b-modal ref="addReview" hide-footer title="Add Review">
            <b-form-group
            label="Review Body"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="reviewBody"
                name="reviewBody"
                :state="errors.has('reviewBody') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
            label="Review Rating (out of 5)"
            >
                <b-form-input
                required
                v-validate="'required'"
                v-model="reviewRating"
                name="reviewRating"
                :state="errors.has('reviewRating') ? false : null"
                ></b-form-input>
            </b-form-group>
            
            <div style="float: right">
                <b-button variant="secondary" size="large" type="submit" @click="addReview()">Submit</b-button>
            </div>
        </b-modal>

        <b-modal id="deleteWorkout" ref="deleteWorkout" hide-footer title="Delete this Workout?">
            <div class="d-flex justify-content-around">
                <b-button variant="primary" size="large" @click="$refs.deleteWorkout.hide()">No</b-button>
                <b-button variant="secondary" size="large" type="submit" @click="deleteWorkout()">Yes</b-button>
            </div>
        </b-modal>

        <b-modal id="deleteReview" ref="deleteReview" hide-footer title="Delete this Review?">
            <div class="d-flex justify-content-around">
                <b-button variant="primary" size="large" @click="$refs.deleteReview.hide()">No</b-button>
                <b-button variant="secondary" size="large" type="submit" @click="deleteReview()">Yes</b-button>
            </div>
        </b-modal>

        <b-modal id="editWorkout" ref="editWorkout" hide-footer title="Edit Workout">
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
            
            <div style="float: right">
                <b-button variant="secondary" size="large" type="submit" @click="editWorkout()">Submit</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
const Workout = {
  name: "Workout",
  props: {
    img: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    big: {
        type: Boolean,
        default: false
    }
  },
  data () {
      return {
          id: null,
          workouts: null,
          workout: null,
          reviewBody: null,
          reviewRating: null,
          currentReview: null,
          workoutTitle: null,
          workoutLocation: null,
          workoutTimes: null,
          workoutMaterials: null,
          workoutDuration: null,
      }
  },
  created() {
      this.id = this.$route.params.id;
      this.workouts = this.$store.state.workouts;
      for (var i = 0; i < this.$store.state.workouts.length; i++) {
          if (this.$store.state.workouts[i].id == this.id) {
              this.workout = this.$store.state.workouts[i]
                this.workoutTitle = this.$store.state.workouts[i].title;
                this.workoutLocation = this.$store.state.workouts[i].location;
                this.workoutTimes = this.$store.state.workouts[i].times;
                this.workoutMaterials = this.$store.state.workouts[i].materials;
                this.workoutDuration = this.$store.state.workouts[i].duration;
              break
          }
      }
  },
  methods: {
      GetImageUrl(url, folder = null) {
      if (folder) {
        return require(`@/assets/images/${folder}/${url}`);
      } else {
        return require(`@/assets/images/${url}`);
      }
    },
    addReview(){
        this.$validator.validateAll().then(result => {
            if (result) {
                var lastId
                if (this.workout.reviews.length == 0){
                    lastId = 0
                } else {
                    lastId = this.workout.reviews[this.workout.reviews.length-1].id;
                }
                var review = {
                    id: lastId+1,
                    username: this.$store.state.admin ? 'testAdmin' : 'testUser',
                    body: this.reviewBody,
                    rating: this.reviewRating,
                }
                var payload = {
                    review: review,
                    workoutId: this.id
                }
                this.$store.dispatch("createReview", payload);
                this.reviewBody = null,
                this.reviewRating = null,
                this.$refs.addReview.hide()
                this.workouts = this.$store.state.workouts;
                for (var i = 0; i < this.$store.state.workouts.length; i++) {
                    if (this.$store.state.workouts[i].id == this.id) {
                        this.workout = this.$store.state.workouts[i]
                        break
                    }
                }
            } else {
                }
        }
    )
    },
    openModal() {
        this.$refs.addReview.show()
    },
    deleteReview(id) {
        if (id) {
            this.currentReview = id
            this.$refs.deleteReview.show()
        } else {
            var payload = {
                reviewId: this.currentReview,
                workoutId: this.id
            }
            this.$store.dispatch("deleteReview",payload)
            this.workouts = this.$store.state.workouts;
            for (var i = 0; i < this.$store.state.workouts.length; i++) {
                if (this.$store.state.workouts[i].id == this.id) {
                    this.workout = this.$store.state.workouts[i]
                    break
                }
            }
            this.$refs.deleteReview.hide()
        }
    },
    deleteWorkout() {
        this.$store.dispatch("delete", this.id);
        this.$router.push("/")
    },
    editWorkout() {
        this.$validator.validateAll().then(result => {
            if (result) {
                var workout = {
                    id: this.workout.id,
                    title: this.workoutTitle,
                    location: this.workoutLocation,
                    duration: this.workoutDuration,
                    times: this.workoutTimes,
                    materials: this.workoutMaterials,
                    image: this.workout.image,
                    reviews: this.workout.reviews,
                    approved: this.workout.approved,
                }
                this.$store.dispatch("update", workout);
                this.workout = workout;
                this.$refs.editWorkout.hide()
            } else {
                }
        })
    },
    approveWorkout() {
        this.workout.approved = true;
        this.$store.dispatch("update",workout);
    }
  }
};

export default Workout;
</script>

<style scoped>
</style>