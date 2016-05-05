import request from 'axios';
import {
    ClientListType,
    ClientType
} from '../types/ClientTypes';
import { ENDPOINTS } from '../../endpoints';

const ENDPOINT = `${ENDPOINTS}/clients`;

export default {
    getClientList: () => {
        return request.get(`${ENDPOINT}`)
            .then(response => new ClientListType(response.data))
            .catch(error => {
                throw error;
            });
    },

    createClient: createClientRequest => {
        return request.post(`${ENDPOINT}`, createClientRequest)
            .then(response => new ClientType(response.data))
            .catch(error => {
                throw error;
            });
    },

    saveClient: (id, clientRequest) => {
        return request.put(`${ENDPOINT}/${id}`, clientRequest)
            .then(response => new ClientType(response.data))
            .catch(error => {
                throw error;
            });
    },

    getSingleClient: id => {
        return request.get(`${ENDPOINT}/${id}`)
            .then(response => new ClientType(response.data))
            .catch(error => {
                throw error;
            });
    },

    deleteClient: id => {
        return request.delete(`${ENDPOINT}/${id}`)
            .then(response => response)
            .catch(error => {
                throw error
            });
    }
};
