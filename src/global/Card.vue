<template>
    <div v-if="this.big" class="card m-2 hover-pointer hover-shadow" style="min-width:250px; max-width: 300px;">
        <img :src="GetImageUrl(this.img)" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{this.title}}</h5>
        </div> 
    </div>
    <div v-else class="card m-2 hover-pointer hover-shadow" style="min-width: 150px; max-width: 200px;">
        <img :src="GetImageUrl(this.img)" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{this.title}}</h5>
        </div> 
    </div>
</template>

<script>
const Card = {
  name: "Card",
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
  created() {
  },
  methods: {
      GetImageUrl(url, folder = null) {
      if (folder) {
        return require(`@/assets/images/${folder}/${url}`);
      } else {
        return require(`@/assets/images/${url}`);
      }
    }
  }
};

export default Card;
</script>

<style scoped>
</style>
