import { GeneratedMeal } from "../libs/types";

export type MenuState = {
  items: GeneratedMeal[];
};

export type MenuAction =
  | { type: "SET_MENU"; payload: GeneratedMeal[] }
  | { type: "UPDATE_ITEM"; index: number; field: keyof GeneratedMeal; value: any }
  | { type: "REMOVE_ITEM"; index: number };

export const menuReducer = (
  state: MenuState,
  action: MenuAction
): MenuState => {
  switch (action.type) {
    case "SET_MENU":
      return { items: action.payload };

    case "UPDATE_ITEM": {
      const updated = [...state.items];
      updated[action.index] = {
        ...updated[action.index],
        [action.field]: action.value,
      };
      return { items: updated };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((_, i) => i !== action.index),
      };

    default:
      return state;
  }
};
