import React, { Component, PropTypes } from 'react';
import t from 'tcomb-form';
import { ClientContactCreationType } from '../../../domain/clientContact/types/ClientContactTypes';
import Button from '../../layout/Button/Button';

const Form = t.form.Form;

/**
 * @class AddContactToClientForm
 * @extends React/Component
 */
export default class AddContactToClientForm extends Component {

    /**
     * @for AddContactToClientForm
     * @method render
     * @return {JSX}
     */
    render() {
        return (
            <div>
                <Form
                    ref="addContactToClientForm"
                    type={ ClientContactCreationType } />

                <Button onClick={ this.onSubmit }>
                    Save new contact
                </Button>
            </div>
        );
    }

    /**
     * @for AddContactToClientForm
     * @method onSubmit
     * @param {Event} event
     * @callback
     */
    onSubmit = event => {
        event.preventDefault();

        const addContactToClientFormValues = this.refs.addContactToClientForm.getValue();

        if (addContactToClientFormValues !== null) {
            this.props.onRequestToAddContactToClient(addContactToClientFormValues);
        }
    }
}

/**
 * @property displayName
 * @type {String}
 */
AddContactToClientForm.displayName = 'AddContactToClientForm';

/**
 * @property propTypes
 * @type {Object}
 */
AddContactToClientForm.propTypes = {
    /**
     * @property onRequestToAddContactToClient
     * @type {Function}
     * @required
     */
    onRequestToAddContactToClient: PropTypes.func.isRequired
};
