import { types } from "../types/types";

export const setUiError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeUiError = () => ({
  type: types.uiRemoveError,
});

export const uiStartLoading = () => ({
  type: types.uiStartLoading,
});

export const uiFinishLoading = () => ({
  type: types.uiFinishLoading,
});
