import { createReducer } from 'redux-create-reducer';
import { SessionStateType } from '../types/SessionTypes';

import {
    CREATE_SESSION_START,
    CREATE_SESSION_SUCCESS,
    CREATE_SESSION_FAIL,

    UNAUTHORIZED_SESSION,

    DESTROY_SESSION_START,
    DESTROY_SESSION_SUCCESS,
    DESTROY_SESSION_FAIL
} from '../actions/SessionActions';

const INITIAL_STATE = new SessionStateType({
    isLoading: false,
    payload: null,
    errors: null
});

const mergeState = (state, updates) => SessionStateType.update(state, { $merge: updates });

export default createReducer(INITIAL_STATE, {
    [CREATE_SESSION_START]: () => mergeState(
        INITIAL_STATE,
        {
            isLoading: true
        }
    ),

    [CREATE_SESSION_SUCCESS]: (state, { payload }) => mergeState(
        state,
        {
            isLoading: false,
            payload
        }
    ),

    [CREATE_SESSION_FAIL]: (state, { errors }) => mergeState(
        state,
        {
            isLoading: false,
            errors
        }
    ),

    [UNAUTHORIZED_SESSION]: (state, { errors }) => mergeState(
        state,
        {
            errors
        }
    ),

    [DESTROY_SESSION_START]: (state) => mergeState(
        state,
        {
            isLoading: true
        }
    ),

    [DESTROY_SESSION_SUCCESS]: (state) => mergeState(
        state,
        INITIAL_STATE
    ),

    [DESTROY_SESSION_FAIL]: (state, { errors }) => mergeState(
        state,
        {
            errors
        }
    )
});
