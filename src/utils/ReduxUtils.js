// src/utils/ReduxUtils.js

/**
 * Sets the loading state for a given slice of the Redux store.
 * @param {Object} state - The state object for the specific action (e.g., state.login, state.signup).
 */
export const setLoadingState = (state) => {
  state.loading = true;
  state.message = "";
  // state.success = false;
};

/**
 * Sets the success state for a given slice of the Redux store.
 * @param {Object} state - The state object for the specific action (e.g., state.login, state.signup).
 * @param {Object} action - The action object containing the payload.
 */
export const setSuccessState = (state, action) => {
  state.loading = false;
  state.message = action.payload.message || "";
  state.success = true;
};

/**
 * Sets the failure state for a given slice of the Redux store.
 * @param {Object} state - The state object for the specific action (e.g., state.login, state.signup).
 * @param {Object} action - The action object containing the payload.
 * @param {string} defaultMessage - The default error message to use if no message is provided in the action payload.
 */
export const setFailureState = (state, action, defaultMessage) => {
  state.loading = false;
  state.message = action.payload?.message || defaultMessage;
  state.success = false;
};
