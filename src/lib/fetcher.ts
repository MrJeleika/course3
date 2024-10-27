export interface FetcherResponse<T> {
  data: T | null;
  status: number;
  statusText: string;
}

export class Fetcher {
  private readonly _headers: Record<string, string>;

  constructor(headers: Record<string, string>) {
    this._headers = headers;
  }

  public async get<T>(url: string) {
    return this._processResponse<T>(
      fetch(url, {
        headers: this._headers,
      }),
    );
  }

  public async post<T>(url: string, body?: Record<string, unknown>) {
    return this._processResponse<T>(
      fetch(url, {
        method: 'POST',
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  }

  public async put<T>(url: string, body?: Record<string, unknown>) {
    return this._processResponse<T>(
      fetch(url, {
        method: 'PUT',
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  }

  public async delete<T>(url: string) {
    return this._processResponse<T>(
      fetch(url, {
        method: 'DELETE',
        headers: this._headers,
      }),
    );
  }

  public async patch<T>(url: string, body?: Record<string, unknown>) {
    return this._processResponse<T>(
      fetch(url, {
        method: 'PATCH',
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  }

  private async _processResponse<T>(
    responsePromise: Promise<Response>,
  ): Promise<FetcherResponse<T>> {
    const response = await responsePromise;
    const responseText = response.ok ? await response.text() : '';
    const data = responseText ? JSON.parse(responseText) : null;
    return { data, status: response.status, statusText: response.statusText };
  }
}

export const apiClient = () => {
  return new Fetcher({
    'Content-Type': 'application/json',
  });
};
