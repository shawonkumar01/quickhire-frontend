export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  salary?: string;
  jobType?: string;
  created_at: string;
}

export interface Application {
  id: number;
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}