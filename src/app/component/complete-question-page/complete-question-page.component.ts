import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-question-page',
  templateUrl: './complete-question-page.component.html',
  styleUrl: './complete-question-page.component.css'
})
export class CompleteQuestionPageComponent {

  public fullScore: number = Number(localStorage.getItem('fullScore'));
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  goToHome() {
    localStorage.removeItem('categoryId')
    localStorage.removeItem('titleCategory')

    localStorage.removeItem('fullScore')
    localStorage.removeItem('score')

    this.router.navigate(['/web/question-list']);
  }

}