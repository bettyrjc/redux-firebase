import { types } from "../../types/types";

describe("Pruebas con nuestros tipos", () => {
  test("Debe tener estas types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      uiSetError: "[UI] set error",
      uiRemoveError: "[ui] remove error",
      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",

      notesAddNew: "[Notes] new note",
      notesActive: "[Notes] set active note",
      notesLoad: "[Notes] load notes",
      notesUpdated: "[Notes] updated image url",
      notesDelete: "[Notes] delete note",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
    });
  });
});
