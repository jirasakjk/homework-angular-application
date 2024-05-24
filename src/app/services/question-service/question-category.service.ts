import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryService {

  private apiUrl = 'https://training-homework.calllab.net/v1';



  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  getQuestionCategories(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<any>(this.apiUrl + '/question-categories', { headers });
  }

  getQuestions(categoryId: string): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<any>(this.apiUrl+ `/questions/categories/${categoryId}`, { headers });
  }

  submitAssignment(data : any): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post<any>(this.apiUrl + '/questions/submit-assignment', data, { headers });
  }


}
