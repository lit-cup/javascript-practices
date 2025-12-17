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
  // return lastest workoout
  return state.workouts[state.workouts.length - 1];
};

export const setTempRoutingMarker = function (coords) {
  if (!state.tempRoute.startMark) state.tempRoute.startMark = coords;
  else if (!state.tempRoute.endMark) state.tempRoute.endMark = coords;
};

export const resetTempRouting = function () {
  state.tempRoute = {
    startMark: null,
    endMark: null,
  };
};
