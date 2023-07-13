import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiHttpService {
  constructor(
    private http: HttpClient
  ) { }

  public get(url: string,urlIndex=0,options?: any): Observable<any> {
    return this.http.get(environment.BASE_API_URL[urlIndex ? urlIndex : 0] +url, options);
  }

  public post(url: string, data: any,urlIndex=0, options?: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL[urlIndex ? urlIndex : 0] +url, data, options);
  }

  public put(url: string, data: any,urlIndex=0 ,options?: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL[urlIndex ? urlIndex : 0] +url, data, options);
  }

  public delete(url: string,urlIndex=0, options?: any): Observable<any> {
    return this.http.delete(environment.BASE_API_URL[urlIndex ? urlIndex : 0] +url, options);
  }
}
