import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export class BaseApiService {
  private baseUrl: string;
  public httpClient: HttpClient = inject(HttpClient);
  constructor(protected baseApi: string = '') {
    this.baseUrl = environment.BASE_API_URL + baseApi;
  }
  public get<T>(url: string, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.get<T>(url, options);
  }

  public post<T>(url: string, body?: object, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.post<T>(url, body, options);
  }

  public put<T>(url: string, body?: object, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.put<T>(url, body, options);
  }

  public delete<T>(url: string, options?: object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.delete<T>(url, options);
  }
}
