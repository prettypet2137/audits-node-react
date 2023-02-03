import React, { Component } from 'react';

import ProjectAdd from './projects-add';
import ProjectTable from './projects-table';

export default class ProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.sendToEdit = this.sendToEdit.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.projectAddForm = React.createRef();
    this.projectTable = React.createRef();
  }

  sendToEdit(project) {
    this.projectAddForm.current.updateAction(project);
  }

  refreshTable(project) {
    this.projectTable.current.fetchProjects(project);
  }

  render() {
    return (
      <div className="col">
        <ProjectAdd ref={this.projectAddForm} refreshTable={this.refreshTable} />
        <ProjectTable sendToEdit={this.sendToEdit} ref={this.projectTable} />
      </div>
    );
  }
}
