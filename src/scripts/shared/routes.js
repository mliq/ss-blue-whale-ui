import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components';

import SessionContainer from './components/container/session/SessionContainer';

import RegistrationContainer from './components/container/registration/RegistrationContainer';

import ClientRoot from './components/content/Client/ClientRoot';
import ClientListContainer from './components/container/client/ClientListContainer';
import ClientCreateContainer from './components/container/client/ClientCreateContainer';
import ClientSingleContainer from './components/container/client/ClientSingleContainer';
import { getSingleClient } from './domain/client/actions/ClientSingleActions';

import ProjectListContainer from './components/container/project/ProjectListContainer';

import ProjectTypeRoot from './components/content//ProjectType/ProjectTypeRoot';
import ProjectTypeContainer from './components/container/projectType/ProjectTypeContainer';
import ProjectTypeCreateContainer from './components/container/projectType/ProjectTypeCreateContainer';
import ProjectTypeSingleContainer from './components/container/projectType/ProjectTypeSingleContainer';
import { getProjectType } from './domain/projectType/actions/ProjectTypeActions';

import TaskItemRoot from './components/content/taskItem/TaskItemRoot';
import TaskItemListContainer from './components/container/taskItem/TaskItemListContainer';
import TaskItemCreateContainer from './components/container/taskItem/TaskItemCreateContainer';
import TaskItemSingleContainer from './components/container/taskItem/TaskItemSingleContainer';
import { getTaskItemList } from './domain/taskItem/actions/TaskItemListActions';
import { getSingleTaskItem } from './domain/taskItem/actions/TaskItemSingleActions';

export default function(store) {
    return (
        <Route component={ App } path="/">
            <Route path="login" component={ SessionContainer } />

            <Route path="users/new" component={ RegistrationContainer } />

            <Route path="clients" component={ ClientRoot }>
                <IndexRoute component={ ClientListContainer } />
                <Route path="create"
                    component={ ClientCreateContainer } />
                <Route path=":id"
                    component={ ClientSingleContainer }
                    onEnter={ nextState => store.dispatch(getSingleClient(nextState.params.id)) }/>
            </Route>

            <Route component={ ProjectListContainer } path="projects" />

            <Route component={ ProjectTypeRoot } path="projectTypes">
                <IndexRoute component={ ProjectTypeContainer } />
                <Route path="create"
                    component={ ProjectTypeCreateContainer } />
                <Route path=":id"
                    component={ ProjectTypeSingleContainer }
                    onEnter={ nextState => store.dispatch(getProjectType(nextState.params.id)) } />
            </Route>

            <Route component={ TaskItemRoot } path="taskItems">
                <IndexRoute component={ TaskItemListContainer }
                    onEnter={ () => store.dispatch(getTaskItemList()) } />
                <Route path="create"
                    component={ TaskItemCreateContainer } />
                <Route path=":id"
                    component={ TaskItemSingleContainer }
                    onEnter={ nextState => store.dispatch(getSingleTaskItem(nextState.params.id)) }/>
            </Route>
        </Route>
    );
}
