export const state = {
  // store coords
  coords: {},
  workouts: [],
};

export const addWorkout = function (input) {
  state.workouts.push(input);
  console.log(state.workouts);
};
