export const state = {
  // store coords
  workouts: [],
};

export const addWorkout = function (input) {
  state.workouts.push(input);
};
