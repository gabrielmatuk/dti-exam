import { API_URL } from '@/const';
import { ListPhotos, User } from '@/types';
import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private axiosInstance: AxiosInstance;
  private apiToken: string;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/api/v1`,
    });
    this.apiToken = '';
    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      async (error) => {

        if (error.response.data.message === 'Token invalid or expired') {
          try {
            const response = await axios.post('/login');
            this.apiToken = response.data.token;
            return this.axiosInstance.request(error.config);
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return Promise.reject(error.message);
      }
    )
  }


  async getPhotos(): Promise<ListPhotos> {
    return this.axiosInstance.get('/photos', {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.axiosInstance.get(`/users/${email}`, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });
  }

  async createUser(email: string, password: string, name: string): Promise<User> {
    return this.axiosInstance.post('/user', { email, password, name });
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    return await this.axiosInstance.post('/login', { email, password });
  }

  async getUsers(): Promise<User[]> {
    return this.axiosInstance.get('/users', {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });
  }
}