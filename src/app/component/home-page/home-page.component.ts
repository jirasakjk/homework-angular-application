import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { QuestionCategoryService } from '../../services/question-service/question-category.service';
import { QuestionCategory } from '../../models/question-category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  public userName: string = localStorage.getItem('userName') || '';

  categories: QuestionCategory[] = [];
  
  constructor(
    private authService: AuthServiceService,
  ) {}

  

  logout(): void {
    this.authService.logout();
  }

  displayTitle(): string {
    let title;
    title = localStorage.getItem('titleCategory') ? localStorage.getItem('titleCategory') : ''; 
    if (title) {
      return title;
    } else {
      return 'Welcome, ' + this.userName;
    }
  }

}
