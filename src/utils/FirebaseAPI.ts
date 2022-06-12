import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FIREBASE_FUNC_BASE_URL } from './firebase.config';
import { AssetEntry } from '../types/AssetEntry';

class FirebaseAPI {
    private static __instance: FirebaseAPI;
    private client: AxiosInstance;
    private baseURL: string;

    constructor() {
        this.baseURL = FIREBASE_FUNC_BASE_URL || '';
        this.client = this.createAxiosClient();
    }
    private createAxiosClient(): AxiosInstance {
        return axios.create({
            baseURL: this.baseURL,
            responseType: 'json' as const,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    async addToWatchlist(token: string, entry: AssetEntry) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .post('/watchlist', entry, { headers: { Authorization: `Bearer ${token}` } })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }

    async getWatchlist(token: string) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .get('/watchlist', { headers: { Authorization: `Bearer ${token}` } })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }

    async updateWatchlistEntry(token: string, entry: AssetEntry) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .put(`/watchlist/${entry.id}`, entry, { headers: { Authorization: `Bearer ${token}` } })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }

    async deleteWatchlistEntry(token: string, entryId: string | number) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .delete(`/watchlist/${entryId}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }
}

export default new FirebaseAPI();
