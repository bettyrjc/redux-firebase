import { authReducer } from "../../reducer/authReducer";
import { types } from "../../types/types";

describe("Pruebasen el auth reducer", () => {
  test("login ", () => {
    const initState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Betty",
      },
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({
      uid: "abc",
      name: "Betty",
    });
  });

  test("logout ", () => {
    const initState = {
      uid: "abc",
      displayName: "Betty",
    };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({});
  });

  test("No debe haber cambios en el state ", () => {
    const initState = {
      uid: "abc",
      displayName: "Betty",
    };
    const action = {
      type: "basura",
    };
    const state = authReducer(initState, action);
    expect(state).toEqual(initState);
  });
});
