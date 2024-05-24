import { Component } from '@angular/core';
import { QuestionCategory } from '../../models/question-category';
import { QuestionCategoryService } from '../../services/question-service/question-category.service';
import { Router } from '@angular/router';
import { CommonDialogComponentComponent } from '../common-dialog-component/common-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogState } from '../../models/dialog-data';

@Component({
  selector: 'app-question-lists',
  templateUrl: './question-lists.component.html',
  styleUrl: './question-lists.component.css'
})
export class QuestionListsComponent {

  categories: QuestionCategory[] = [];

  data =[
    {
      questionCategoryId: "f48b1dfa-585c-4701-adba-3606d0075525",
      title: "ตอบคำถามการคูณหารเลขเบื้องต้น 101"
    },
    {
      questionCategoryId: "ffbd5505-97d5-408b-86d0-1fb9fcfae48d",
      title: "ตอบคำถามการคูณหารเลขเบื้องต้น 102"
    }
  ]
  
  public errorData: any;

  constructor(
    private questionCategoryService: QuestionCategoryService,
    private router: Router,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    localStorage.removeItem('categoryId');
    localStorage.removeItem('titleCategory');
    this.questionCategoryService.getQuestionCategories().subscribe(
      (data) => {
        this.categories = data?.data;
      },
      (error) => {
        console.error('Error fetching categories', error);
        this.errorData = error?.error?.errors[0]?.message;
        const dlgRef: MatDialogRef<CommonDialogComponentComponent> = this.dialog.open(CommonDialogComponentComponent, {
          hasBackdrop: true,
          data: {
            message: `${this.errorData}`,
            title: 'Error',
            type: 'error',
            approve: 'approve'
          }
        });
        dlgRef.afterClosed().subscribe((result: DialogState) => {
          if (result === DialogState.APPROVE) {
            return;
          }
        });
      }
    );
    // this.categories = this.data;
  }

  openQuestions(categoryId: string, title: string) {
    localStorage.setItem('titleCategory', title);
    localStorage.setItem('categoryId', categoryId);
    this.router.navigate(['/web/question-page']);
  }

}
