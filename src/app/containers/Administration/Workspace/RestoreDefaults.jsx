import {
  Space,
} from '@tonic-ui/react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'app/components/Buttons';
import Modal from 'app/components/Modal';
import i18n from 'app/lib/i18n';
import config from 'app/store/config';

class RestoreDefaults extends Component {
  static propTypes = {
    state: PropTypes.object,
    actions: PropTypes.object
  };

  render() {
    const { actions } = this.props;

    return (
      <Modal size="xs" onClose={actions.closeModal}>
        <Modal.Header>
          <Modal.Title>
            {i18n._('Workspace')}
            <Space width={8} />
            &rsaquo;
            <Space width={8} />
            {i18n._('Restore Defaults')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {i18n._('Are you sure you want to restore the default settings?')}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={actions.closeModal}
          >
            {i18n._('Cancel')}
          </Button>
          <Button
            btnStyle="danger"
            onClick={() => {
              // Restore default settings
              config.restoreDefault();

              // Persist data locally
              config.persist();

              // Reload the current page from the server
              window.location.reload(true);
            }}
          >
            {i18n._('Restore Defaults')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RestoreDefaults;
