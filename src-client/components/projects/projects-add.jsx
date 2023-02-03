import React from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

class ProjectAdd extends React.Component {
  constructor(props) {
    const obj1 = { title: '', description: '' };

    super(props);
    this.state = { project: obj1, editMode: false };
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateAction = this.updateAction.bind(this);
  }

  handleAddProject(event) {
    event.preventDefault();
    const { editMode, project } = this.state;
    const { refreshTable } = this.props;
    if (!project) return;
    if (editMode) {
      API.put(`/api/projects/${project.id}`, project)
        .then((res) => {
          refreshTable();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      API.post('api/projects', project)
        .then((res) => {
          refreshTable();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChange(event) {
    const { project } = this.state;
    project[event.target.id] = event.target.value;
    this.setState({ project });
  }

  updateAction(project) {
    if (project) {
      this.setState({ project, editMode: true });
    } else {
      this.setState({ project: { title: '', description: '' }, editMode: false });
    }
  }

  render() {
    const { editMode, project } = this.state;
    return (
      <div className="card text-left mb-3">
        <div className="card-body">
          <form onSubmit={this.handleAddProject}>
            <div className="form-group">
              <label htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="title"
                placeholder="Enter title"
                onChange={this.handleChange}
                value={project.title}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>
              <textarea className="form-control" id="description" placeholder="description" onChange={this.handleChange} value={project.description} />
            </div>

            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-primary">
                {editMode ? 'Edit' : 'Add'}
              </button>
              {editMode
                    && (
                    <button type="button" className="btn btn-warning" onClick={() => this.updateAction()}>
                      Close
                    </button>
                    )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ProjectAdd.propTypes = {
  refreshTable: PropTypes.func.isRequired
};
export default ProjectAdd;
