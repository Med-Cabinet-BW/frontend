// import { axiosWithAuth } from "../Utils/axiosWithAuth";
import * as types from "../Actions/ActionType";

// const user = JSON.parse(localStorage.getItem("user"));
//todo add password to localStorage

const initialState = {
  email: "jackBarry@test.com", //todo get from local storage here
  password: "password",
  strains: [],
  queriedStrains: [],
  currentCabinetStrain: {}
};

const combinedReducer = (state = initialState, action) => {
  // console.log(`Reducer state ${state}, action ${action.type}`)s
  // console.log(action.type)
  switch (action.type) {

    case types.SIGN_UP:
      console.log(`Reducer SIGN_UP, ${action.type}`);
      return state;

    case types.LOGIN:
      console.log(`Reducer LOGIN, ${action.type}`);
      return initialState;

    case types.QUERY_STRAINS:
      return{
        ...state,
        queriedStrains:action.payload
      };
      
    case types.UPDATE_CURRENT_CABINET_STRAIN:
      return {
        ...state,
        currentCabinetStrain: action.payload
      };

    case types.GET_CABINET_STRAINS:
      console.log("GET_CABINET_STRAINS");
      return {
        ...state,
        strains: action.payload
      };

    case types.DELETE_CABINET_STRAINS:
      console.log("DELETE_CABINET_STRAINS");
      return {
        ...state
      };
    // add search, save, delete
    default:
      return state;
  }
};

export default combinedReducer;
