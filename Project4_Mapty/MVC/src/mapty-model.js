export const state = {
  // store coords
  workouts: [],
  tempRoute: {
    startMark: null,
    endMark: null,
  },
  preView: {
    startMark: null,
    endMark: null,
  },
};
export const addStartPreViewMarker = function (marker) {
  state.preView.startMark = marker;
};
export const addEndPreViewMarker = function (marker) {
  state.preView.endMark = marker;
};
export const addWorkout = function (input) {
  state.workouts.push(input);
  // return lastest workoout
  return state.workouts[state.workouts.length - 1];
};

export const setRouteMarkPoint = function (coords) {
  if (!state.tempRoute.startMark) state.tempRoute.startMark = coords;
  else if (!state.tempRoute.endMark) state.tempRoute.endMark = coords;
};

export const resetRouteMark = function () {
  state.tempRoute = {
    startMark: null,
    endMark: null,
  };
};
