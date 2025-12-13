export const state = {
  // store coords
  workouts: [],
  route: {
    startMark: null,
    endMark: null,
  },
};

export const addWorkout = function (input) {
  state.workouts.push(input);
};

export const setRoutePoint = function (coords) {
  if (!state.route.startMark) state.route.startMark = coords;
  else if (!state.route.endMark) state.route.endMark = coords;
};

export const resetRoute = function () {
  state.route.startMark = null;
  state.route.endMark = null;
};
