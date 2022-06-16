import axios, { Axios, AxiosInstance, AxiosResponse } from 'axios';
import { tvdbconfig } from './tvdbapi.config';

export type TVDBApiResponse = {
    status: string;
    data: any[];
};

class TheTVDBApi {
    private static __instance: TheTVDBApi;
    private client: AxiosInstance;
    private baseURL: string;

    constructor() {
        this.baseURL = tvdbconfig.baseUrl;
        this.client = this.createAxiosClient();
    }
    private createAxiosClient(): AxiosInstance {
        return axios.create({
            baseURL: this.baseURL,
            responseType: 'json' as const,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tvdbconfig.apiKey}`
            }
        });
    }
    async search(searchTerm: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get(`/search`, { params: { query: searchTerm || '', type: ['series', 'movie'], limit: 20 } })
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    result.data.data = this.filterSearchData(result.data.data);
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }

    async getMovieById(movieId: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get(`/movies/${movieId}/extended`, { params: { meta: 'translations' } })
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }

    async getSeriesById(seriesId: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get(`/series/${seriesId}/extended`)
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }

    async getSeasonById(seasonId: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get(`/seasons/${seasonId}/extended`)
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }

    private filterSearchData(data: any[]) {
        return data.filter((entry) => ['movie', 'series'].includes(entry.type));
    }
    private limitData(data: any[], limit: number) {
        return data.slice(0, limit);
    }
    async getImageByUrl(imageUrl: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get(imageUrl)
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }

    async topMoviesByYear(year: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get('/movies/filter', { params: { country: 'usa', lang: 'eng', year: year, sort: 'score' } })
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    result.data.data = this.limitData(result.data.data, 10);
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }
    async topSeriesByYears(year: string) {
        return new Promise<TVDBApiResponse>((resolve, reject) => {
            this.client
                .get('/series/filter', { params: { country: 'usa', lang: 'eng', year: year, sort: 'score' } })
                .then((result: AxiosResponse<TVDBApiResponse | any>) => {
                    result.data.data = this.limitData(result.data.data, 10);
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }
}

export default new TheTVDBApi();
