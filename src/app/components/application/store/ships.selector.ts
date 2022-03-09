import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./store.reducer";

export const getShipListSelector = createFeatureSelector<AppState>('store');

export const getShipList = createSelector(
    getShipListSelector,
    (state: AppState) => state.shipList
)