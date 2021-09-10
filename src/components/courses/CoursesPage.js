import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import * as authorActions from "../../redux/actions/authorActions";
import * as searchActions from "../../redux/actions/searchActions";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(event) => {
                this.props.actions.setSearch(event.target.value);
              }}
            ></input>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: filterCourses(state),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      setSearch: bindActionCreators(searchActions.setSearch, dispatch),
    },
  };
}

const filterCourses = (state) => {
  if (state.authors.length) {
    const coursesWithAuthors = state.courses.map((course) => {
      return {
        ...course,
        authorName: state.authors.find((a) => a.id === course.authorId).name,
      };
    });

    return coursesWithAuthors.filter((course) => {
      return course.title.toLowerCase().includes(state.search.toLowerCase());
    });
  } else {
    return [];
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
