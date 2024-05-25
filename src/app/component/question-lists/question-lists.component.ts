import { Component } from '@angular/core';
import { QuestionCategory } from '../../models/question-category';
import { QuestionCategoryService } from '../../services/question-service/question-category.service';
import { Router } from '@angular/router';
import { CommonDialogComponentComponent } from '../common-dialog-component/common-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogState } from '../../models/dialog-data';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

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

  public isLoading = false;

  constructor(
    private questionCategoryService: QuestionCategoryService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,
  ) {

  }

  ngOnInit(): void {
    localStorage.removeItem('categoryId');
    localStorage.removeItem('titleCategory');
    this.isLoading = true;
    this.questionCategoryService.getQuestionCategories().subscribe(
      (data) => {
        this.isLoading = false;
        this.categories = data?.data;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching categories', error);
        this.errorData = error?.error?.errors[0]?.message;
        const errKey = error?.error?.errors[0]?.key;
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
            if(errKey === '401002'){
              this.authService.logout();
            }else{
              return;
            }
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
