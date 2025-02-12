import chainedFunction from 'chained-function';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'app/components/Buttons';
import ModalTemplate from 'app/components/ModalTemplate';
import Modal from 'app/components/Modal';
import controller from 'app/lib/controller';
import i18n from 'app/lib/i18n';

const FeederWait = ({
    title,
    message,
    onClose,
}) => (
    <Modal
        size="xs"
        disableOverlay={true}
        showCloseButton={false}
    >
        <Modal.Body>
            <ModalTemplate type="warning">
                <h5>{title}</h5>
                {message &&
                    <p>{message}</p>
                }
                <p>{i18n._('Waiting for the planner to empty...')}</p>
            </ModalTemplate>
        </Modal.Body>
        <Modal.Footer>
            <Button
                btnStyle="danger"
                onClick={chainedFunction(
                    () => {
                        controller.command('feeder:stop');
                    },
                    onClose
                )}
            >
                {i18n._('Stop')}
            </Button>
        </Modal.Footer>
    </Modal>
);

FeederWait.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func
};

export default FeederWait;
