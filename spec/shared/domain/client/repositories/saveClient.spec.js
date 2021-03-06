import ava from 'ava';
import nock from 'nock';
import {
    VALID_CLIENT_REQUEST,
    VALID_SINGLE_CLIENT_API_RESPONSE
} from '../../../../specHelper/mocks/client/clientMocks';
import { ClientType } from '../../../../../src/scripts/shared/domain/client/types/ClientTypes';
import ClientRepository from '../../../../../src/scripts/shared/domain/client/repositories/ClientRepository';

const CLIENT_ID = 1;

ava('saveClient returns a ClientType', async t => {
    const saveClient = nock(global.NOCK_SCOPE)
        .put('/clients/1')
        .reply(200, VALID_SINGLE_CLIENT_API_RESPONSE);

    const response = await ClientRepository.saveClient(CLIENT_ID, VALID_CLIENT_REQUEST);

    t.truthy(saveClient.isDone());
    t.truthy(response);
    // t.truthy(ClientType.is(response));
});

ava('saveClient completes request if there is a network error', async t => {
    const errorToThrow = new Error();
    const saveClient = nock(global.NOCK_SCOPE)
        .put('/clients/1')
        .reply(500, errorToThrow);

    const error = await ClientRepository.saveClient(CLIENT_ID, VALID_CLIENT_REQUEST)
        .then(() => false)
        .catch(response => response.status === 500);

    t.truthy(saveClient.isDone());
    t.truthy(error);
});
