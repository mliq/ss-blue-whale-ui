import { push } from 'react-router-redux';
import SessionRepository from '../repositories/SessionRepository';
import { ErrorType } from '../../BaseTypes';
import {
    SessionRequestType
} from '../types/SessionTypes';

export const CREATE_SESSION_START = 'CREATE_SESSION_START';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const CREATE_SESSION_FAIL = 'CREATE_SESSION_FAIL';

const createSessionStart = () => ({
    type: CREATE_SESSION_START
});

const createSessionSuccess = payload => ({
    type: CREATE_SESSION_SUCCESS,
    payload: payload
});

const createSessionError = errors => ({
    type: CREATE_SESSION_FAIL,
    payload: null,
    errors
});

/**
 * @function createSession
 * @param {SessionRequestType|Object} sessionFormValues
 * @return {Function}
 */
export const createSession = sessionFormValues => {
    if (!SessionRequestType.is(sessionFormValues)) {
        throw new TypeError('Invalid Registration type. Form values must be a SessionRequestType');
    }

    return dispatch => {
        dispatch(createSessionStart());

        return SessionRepository.createSession(sessionFormValues)
            .then(response => {
                dispatch(createSessionSuccess(response));
                return dispatch(push('/clients'));
            })
            .catch(error => dispatch(createSessionError(new ErrorType(error))));
    };
};