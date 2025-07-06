import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { categoryReducer } from "./categories/reducer";
import { brandReducer } from "./brands/reducer";
import { productReducer } from "./products/reducer";
import { hotDealReducer } from "./hotDeals/reducer";
import { flashDealReducer } from "./flashDeals/reducer";
import { userReducers } from "./users/reducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  brands: brandReducer,
  products: productReducer,
  hotDeals: hotDealReducer,
  flashDeal: flashDealReducer,
  user: userReducers,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
