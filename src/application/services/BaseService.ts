interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export abstract class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  protected getApiUrl(endpoint: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return `${baseUrl}${this.baseUrl}${endpoint}`;
  }

  protected async fetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const url = new URL(this.getApiUrl(endpoint));
    
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.details || 'Bir hata oluştu');
    }

    return data;
  }

  protected get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) {
    return this.fetch<T>(endpoint, { params });
  }

  protected post<T>(endpoint: string, body: unknown) {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  protected put<T>(endpoint: string, body: unknown) {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  protected delete(endpoint: string) {
    return this.fetch(endpoint, {
      method: 'DELETE',
    });
  }
} 