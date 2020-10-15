import { http } from './HttpService'

export function getAllMedicines() {
    return http().get('/medicine');
}

export function getMedicineById(id) {
    return http().get(`/medicine/${id}`);
}

export function createMedicine(medicine) {
    return http().post('/medicine', medicine);
}

export function deleteMedicine(id) {
    return http().delete(`/medicine/${id}`);
}

export function updateMedicine(medicine) {
    return http().put('/medicine',medicine);
}

export function searchMedicine(keyword) {
    return http().get(`/medicine/search/${keyword}`);
}