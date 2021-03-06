import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import SocketedTextArea from './SocketedTextArea';
import { modifyDocument } from '../../js/actions/document-actions';
import AuthorSelector from './AuthorSelector/AuthorSelector';

class DocumentEditor extends Component {
  onChangeHandler = (id, value) => {
    if (value === this.props.selectedDocument[id]) return;
    const data = {
      [id]: value,
    };
    this.props.modifyDocument(this.props.selectedDocument._id, data);
  }

  render() {
    const selected = this.props.selectedDocument;
    let content = <div>No document selected</div>;
    if (selected) {
      content = (
        <Fragment>
          <TextField
            required
            className="docTitle"
            label="Title:"
            value={selected.title}
            margin="normal"
            onChange={e => this.onChangeHandler('title', e.target.value)}
          />
          <Typography className="docOwner" color="primary">Owner:{<br />}{selected.owner.firstName}</Typography>
          <Typography className="docCreatedAt" color="primary">Created at:{<br />}{selected.createdAt}</Typography>
          <Typography className="docUpdatedAt" color="primary">Updated at:{<br />}{selected.updatedAt}</Typography>
          <AuthorSelector />
          <SocketedTextArea />
        </Fragment>
      );
    }
    return (
      <div className="docEditor">
        {content}
      </div>);
  }
}

DocumentEditor.defaultProps = {
  selectedDocument: undefined,
};

DocumentEditor.propTypes = {
  selectedDocument: PropTypes.objectOf(PropTypes.any),
  modifyDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedDocument: state.documentReducer.selectedDocument,
});

const mapDispatchToProps = dispatch => ({
  modifyDocument: (id, data) => dispatch(modifyDocument(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEditor);
