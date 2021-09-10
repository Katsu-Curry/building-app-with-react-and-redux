import * as types from "./actionTypes";

export function setSearchSuccess(search) {
    return { type: types.SET_SEARCH, search };
}

export function setSearch(search) {
    return function (dispatch) {
        dispatch(setSearchSuccess(search))
    }
}