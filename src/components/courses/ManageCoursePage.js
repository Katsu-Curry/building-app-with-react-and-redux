import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

// destructured constructor calls for courses, authors, loadCourses, loadAuthors, and..
// ...props assigns any variable that has not be destructured and assign it to a variable called props

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      // Using JS computed property syntax to allow us to reference a property via a variable
      // https://www.javascripttutorial.net/es6/javascript-computed-property/
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  };

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
    ></CourseForm>
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

// Below gets state of props
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

//Two ways to load actions to dispatch to props
// first options is to import * as
// second option is to import the actual function and use it directly
// loadCourses below is done using the first option
// loadAuthors below is done using the second option

// props are used by the class and injects it into the component
const mapDispatchToProps = {
  loadCourses,
  loadAuthors: authorActions.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
