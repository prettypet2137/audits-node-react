import React from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

class ProjectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], filter: '' };
    this.handleEditProject = this.handleEditProject.bind(this);
    this.handleRemoveProject = this.handleRemoveProject.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.getByID = this.getByID.bind(this);
    this.handleChange = this.handleChange.bind(this);
    if (process.env.NODE_ENV === 'test') return;
    // Continue initialization for non-test environments
    this.fetchProjects();
  }

  handleEditProject(event, id) {
    event.preventDefault();
    const { sendToEdit } = this.props;
    const { projects } = this.state;
    sendToEdit(projects.find((p) => p.id === id));
  }

  handleRemoveProject(event, id) {
    event.preventDefault();
    API.delete(`/api/projects/${id}`)
      .then(() => {
        this.fetchProjects();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    const vm = this;
    const targetValue = event.target.value;
    this.setState({ filter: event.target.value }, () => {
      if (targetValue) vm.getByID();
      else vm.fetchProjects();
    });
  }

  getByID() {
    const { filter } = this.state;
    console.log(filter);
    API.get(`/api/projects/${filter}`)
      .then((res) => {
        if (res.data) this.setState({ projects: [res.data] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchProjects() {
    API.get('/api/projects')
      .then((res) => {
        this.setState({ projects: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { projects, filter } = this.state;
    const listItems = projects.map((item) => (
      <tr key={item.id}>
        <th scope="row">
          {item.id}
        </th>
        <td>
          {item.title}
        </td>
        <td>
          {item.owner}
        </td>
        <td>
          {item.description}
        </td>
        <td>
          <div className="btn-group" role="group" aria-label="">
            <button type="button" className="btn btn-warning" onClick={(e) => this.handleEditProject(e, item.id)}>
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={(e) => this.handleRemoveProject(e, item.id)}>
              Remove
            </button>
          </div>
        </td>
      </tr>
    ));
    return (
      <div className="card">
        <div className="card-body">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Filter
              </span>
            </div>
            <input type="text" className="form-control" placeholder="ID" aria-label="ID" value={filter} onChange={this.handleChange} />
          </div>

          <table className="table table-hover table-responsive-sm">
            <thead>
              <tr>
                <th scope="col">
                  #
                </th>
                <th scope="col">
                  Title
                </th>
                <th scope="col">
                  Owner
                </th>
                <th scope="col">
                  Description
                </th>
                <th scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ProjectTable.propTypes = {
  sendToEdit: PropTypes.func.isRequired,
};

export default ProjectTable;
