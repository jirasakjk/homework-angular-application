import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = "https://training-homework.calllab.net/v1/login";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  private authToken: string | null = null;

  private name: string = '';

  private accountId: string = '';

  private expiredDate: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(username: string, password: string): Observable<any> {
    const url = AUTH_API;
    const body = { username, password };
    return this.http.post<any>(url, body).pipe(
      tap(response => {
        this.authToken = response?.data?.accessToken;
        this.name = response?.data?.fullName;
        this.accountId = response?.data?.accountId;
        this.expiredDate = response?.data?.expiredDate;
        if (this.authToken) {
          localStorage.setItem('authToken', this.authToken);
          localStorage.setItem('userName', this.name);
          localStorage.setItem('accountId', this.accountId);
          localStorage.setItem('expiredDate', this.expiredDate);
        } else {
          console.error('Authentication token is null or undefined');
        }
      })
    );
  }

  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    this.authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('accountId');
    localStorage.removeItem('expiredDate');
    localStorage.removeItem('categoryId');
    localStorage.removeItem('titleCategory');

    // Redirect to login page
    this.router.navigate(['/login']);

  }
}
