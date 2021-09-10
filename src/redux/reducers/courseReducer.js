import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(courses = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...courses, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return courses.filter((course) => course.id !== action.course.id);
    default:
      return courses;
  }
}
