type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
  };
  
  export const api = {
    fetch: async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const defaultHeaders = {
        'Content-Type': 'application/json',
      };
  
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      return response.json();
    },
  
    get: async <T>(endpoint: string, headers?: Record<string, string>): Promise<T> => {
      return api.fetch<T>(endpoint, { headers });
    },
  
    post: async <T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> => {
      return api.fetch<T>(endpoint, { method: 'POST', body, headers });
    },
  
    put: async <T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> => {
      return api.fetch<T>(endpoint, { method: 'PUT', body, headers });
    },
  
    delete: async <T>(endpoint: string, headers?: Record<string, string>): Promise<T> => {
      return api.fetch<T>(endpoint, { method: 'DELETE', headers });
    },
  };