import { INIT_MY_LIST } from "./actionsTypes";

type ActionType = { type: string; payload: any };

const initialState: any[] = [];
export default function myListReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case INIT_MY_LIST: {
      return action.payload;
    }
    default:
      return state;
  }
}
