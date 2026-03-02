import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request if exists
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Jobs
export const jobsApi = {
  getAll: (params?: { search?: string; category?: string; location?: string }) =>
    api.get('/jobs', { params }),
  getOne: (id: number) => api.get(`/jobs/${id}`),
  create: (data: {
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    salary?: string;
    jobType?: string;
  }) => api.post('/jobs', data),
  delete: (id: number) => api.delete(`/jobs/${id}`),
};

// Applications
export const applicationsApi = {
  submit: (data: {
    job_id: number;
    name: string;
    email: string;
    resume_link: string;
    cover_note?: string;
  }) => api.post('/applications', data),
  getAll: () => api.get('/applications'),
  getByJob: (job_id: number) => api.get(`/applications/job/${job_id}`),
};

// Auth
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  register: (data: { email: string; password: string }) =>
    api.post('/auth/register', data),
};

export default api;