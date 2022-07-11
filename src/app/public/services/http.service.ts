import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Config } from 'src/app/shared/models/config.model';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiURL = 'https://localhost:44310/ApiController';
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllConfigs(): Observable<Config[]> {
    return this.http
      .get<Config[]>(this.apiURL + '/GetConfigData')
      .pipe(catchError(this.handleError));
  }

  getConfig(id: string): Observable<Config> {
    return this.http
      .get<Config>(
        this.apiURL + '/GetOneConfigData/?Id=' + id,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteConfig(id: string) {
    return this.http
      .delete<boolean>(this.apiURL + '/DeleteData/?Id=' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deprecateConfig(id: string) {
    return this.http
      .get<boolean>(this.apiURL + '/deprecateData/?Id=' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateConfig(config: Config): Observable<Config> {
    return this.http
      .put<Config>(
        this.apiURL + '/UpdateData',
        JSON.stringify(config),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createConfig(config: Config): Observable<Config> {
    return this.http
      .post<Config>(
        this.apiURL + '/AddData',
        JSON.stringify(config),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
