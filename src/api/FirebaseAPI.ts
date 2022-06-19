import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FIREBASE_FUNC_BASE_URL } from './firebase.config';
import { AssetEntry } from '../types/AssetEntry';
import { Review } from '../types/Review';

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

    /* WATCHLIST */
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
    async getWatchlistIds(token: string) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .get('/watchlist/addedIds', { headers: { Authorization: `Bearer ${token}` } })
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

    /* REVIEW */

    async addReview(token: string, review: Review) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .post('/review', review, { headers: { Authorization: `Bearer ${token}` } })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }

    async getReview(token: string, entryId: number) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .get(`/review/${entryId}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }

    async deleteReview(token: string, entryId: number, reviewId: string) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
            this.client
                .delete(`/review/${reviewId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { entryId: entryId }
                })
                .then((result: AxiosResponse<any>) => {
                    return resolve(result.data);
                })
                .catch((e) => reject(e));
        });
    }
}

export default new FirebaseAPI();
