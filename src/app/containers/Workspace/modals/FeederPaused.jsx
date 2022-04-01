import chainedFunction from 'chained-function';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'app/components/Buttons';
import ModalTemplate from 'app/components/ModalTemplate';
import Modal from 'app/components/Modal';
import controller from 'app/lib/controller';
import i18n from 'app/lib/i18n';

function FeederPaused(props) {
  return (
    <Modal
      size="xs"
      disableOverlayClick
      showCloseButton={false}
    >
      <Modal.Body>
        <ModalTemplate type="warning">
          {({ PrimaryMessage, DescriptiveMessage }) => (
            <>
              <PrimaryMessage>
                {props.title}
              </PrimaryMessage>
              <DescriptiveMessage>
                {i18n._('Click the Continue button to resume execution.')}
              </DescriptiveMessage>
            </>
          )}
        </ModalTemplate>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="pull-left"
          btnStyle="danger"
          onClick={chainedFunction(
            () => {
              controller.command('feeder:stop');
            },
            props.onClose
          )}
        >
          {i18n._('Stop')}
        </Button>
        <Button
          onClick={chainedFunction(
            () => {
              controller.command('feeder:start');
            },
            props.onClose
          )}
        >
          {i18n._('Continue')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

FeederPaused.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func
};

export default FeederPaused;
