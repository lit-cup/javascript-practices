export const state = {
  // store coords
  workouts: [],
  tempRoute: {
    startMark: null,
    endMark: null,
  },
};

export const addWorkout = function (input) {
  state.workouts.push(input);
};

export const setRoutePoint = function (coords) {
  if (!state.tempRoute.startMark) state.tempRoute.startMark = coords;
  else if (!state.tempRoute.endMark) state.tempRoute.endMark = coords;
};

export const resetRoute = function () {
  state.tempRoute = {
    startMark: null,
    endMark: null,
  };
};
