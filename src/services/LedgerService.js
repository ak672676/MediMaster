import { http } from './HttpService'

export function searchLedger(keyword) {
    return http().get(`/user/search/${keyword}`);
}
export function getUser(id) {
    return http().get(`/user/${id}`);
}
export function updateLedger(newEntry) {
    return http().put('/user/ledger',newEntry);
}
