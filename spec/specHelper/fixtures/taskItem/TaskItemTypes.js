// import t from 'tcomb';

import {
    VALID_TASK_ITEM_API_RESPONSE,
    VALID_TASK_ITEM_LIST_API_RESPONSE
} from '../../mocks/taskItem/taskItemMocks';

import {
    VALID_BASE_STATE_TYPE
} from '../../mocks/BaseTypes';

import {
    TaskItemType,
    TaskItemListType,
    TaskItemListStateType
} from '../../../../src/scripts/shared/domain/taskItem/types/TaskItemTypes';

export const ValidTaskItemType = new TaskItemType(VALID_TASK_ITEM_API_RESPONSE);

export const ValidTaskItemListType = new TaskItemListType(VALID_TASK_ITEM_LIST_API_RESPONSE);

export const ValidTaskItemListStateType = new TaskItemListStateType({
    ...VALID_BASE_STATE_TYPE,
    payload: ValidTaskItemListType
});