import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		workouts: [
			{
				id: 1,
				title: 'Oval Jog',
				location: 'UP Oval',
				duration: '45 mins',
				times: '7:00 AM or 4:30 PM',
				materials: 'none',
				reviews: [
					{
						id: 1,
						username: 'gab51299',
						body: 'I really enjoyed doing this workout last week!',
						rating: 4
					},

					{
						id: 2,
						username: 'gab51299',
						body: 'I really enjoyed doing this workout last week!',
						rating: 4
					}
				],
				image: 'workout2.jpg',
				approved: true
			},
			{
				id: 2,
				title: 'CHK Training Course',
				location: 'UP CHK',
				duration: '1 hr 20 mins',
				times: '11:00 AM',
				materials: 'none',
				reviews: [
					{
						id: 1,
						username: 'helloworld',
						body: 'Wow, I forgot this existed. Really challenging but fun!',
						rating: 5
					}
				],
				image: 'workout2.jpg',
				approved: true
            },
			{
				id: 3,
				title: 'CHK Weightlifting',
				location: 'UP CHK Weighlifting Room',
				duration: '30 mins',
				times: '7:00 AM - 5:00 PM',
				materials: 'none',
				reviews: [
				],
				image: 'workout2.jpg',
				approved: false
			}
		],
		admin: false
	},
	mutations: {
		add_workout(state, data) {
			state.workouts.push(data);
		},
		remove_workout(state, data) {
			var newWorkouts = [];
			for (var i = 0; i < state.workouts.length; i++) {
				if (state.workouts[i].id != data) {
					newWorkouts.push(state.workouts[i]);
				}
			}
			state.workouts = newWorkouts;
		},
		edit_workout(state, data) {
			for (var i = 0; i < state.workouts.length; i++) {
				if (state.workouts[i].id != data.id) {
					continue;
				}
				state.workouts[i] = data;
			}
		},
		add_review(state, data) {
			var review = data.review;
			var workoutId = data.workoutId;
			for (var i = 0; i < state.workouts.length; i++) {
				if (state.workouts[i].id != workoutId) {
					continue;
				}
				state.workouts[i].reviews.push(review);
				break;
			}
		},
		remove_review(state, data) {
			var reviewId = data.reviewId;
			var workoutId = data.workoutId;
			var newReviews = [];
			for (var i = 0; i < state.workouts.length; i++) {
				if (state.workouts[i].id != workoutId) {
					continue;
				}
				for (var j = 0; j < state.workouts[i].reviews.length; j++) {
					if (state.workouts[i].reviews[j].id != reviewId) {
						newReviews.push(state.workouts[i].reviews[j]);
					}
				}
				state.workouts[i].reviews = newReviews;
				break;
			}
		},
		toggle_admin(state) {
			state.admin = !state.admin;
		}
	},
	actions: {
		create: ({ commit }, workoutData) => {
			commit('add_workout', workoutData);
		},
		delete: ({ commit }, workoutId) => {
			commit('remove_workout', workoutId);
		},
		update: ({ commit }, workoutData) => {
			commit('edit_workout', workoutData);
		},
		createReview: ({ commit }, payload) => {
			commit('add_review', payload);
		},
		deleteReview: ({ commit }, payload) => {
			commit('remove_review', payload);
		},
		toggleAdmin: ({ commit }) => {
			commit('toggle_admin');
		}
	}
});
