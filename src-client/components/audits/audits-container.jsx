import React, { Component } from 'react';

import AuditTable from './audits-table';

export default class AuditsContainer extends Component {
  constructor(props) {
    super(props);
    this.auditTable = React.createRef();
  }

  render() {
    return (
      <div className="col">
        <AuditTable ref={this.auditTable} />
      </div>
    );
  }
}
