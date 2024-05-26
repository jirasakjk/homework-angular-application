import { Component } from '@angular/core';
import { QuestionCategoryService } from '../../services/question-service/question-category.service';
import { QuestionList } from '../../models/question-list';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Answer, Submission } from '../../models/submission';
import { Router } from '@angular/router';
import { CommonDialogComponentComponent } from '../common-dialog-component/common-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogState } from '../../models/dialog-data';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.css',
})
export class QuestionPageComponent {

  public question: QuestionList = {
    questionCategoryId: '',
    title: '',
    totalQuestion: 0,
    level: '',
    timeLimitOfMinuteUnit: 0,
    questionInfo: []
  };

  public remainingTime: number = 0;
  public timerInterval: any;
  public displayTime: string = '00:00';
  public isLoading = false;


  private submission: Submission = {
    questionCategoryId: '',
    questions: []
  };

  public errorData: any;


  data ={ questionInfo: [
    {
      questionId: "ea7a985a-a53f-4df3-a2a8-d4de82d6d67a",
      sequence: 1,
      title: "ข้อใดได้ผลรวม 20 ",
      questionAnswerInfo: [
        {
          questionAnswerId: "f7fc7571-16f5-4e59-8153-94fc59c1fb8b",
          sequence: 1,
          answer: "5+5+5+5"
        },
        {
          questionAnswerId: "35110810-4593-4c00-84b9-21b0b45fd87e",
          sequence: 2,
          answer: "-5-5+5+10"
        },
        {
          questionAnswerId: "b22dfe6f-20c4-434e-a850-21ab8c1dbb1c",
          sequence: 3,
          answer: "-6-1+5+10"
        },
        {
          questionAnswerId: "2fa25d71-520e-4e56-a3c7-1b3d41512b68",
          sequence: 4,
          answer: "-1-8+10"
        }
      ]
    },
    {
      questionId: "ea7a985a-a53f-4df3-a2a8-d4de82d6d67b",
      sequence: 2,
      title: "ข้อใดได้ผลรวม 20",
      questionAnswerInfo: [
        {
          questionAnswerId: "f7fc7571-16f5-4e59-8153-94fc59c1fb8b",
          sequence: 1,
          answer: "5+5+5+5"
        },
        {
          questionAnswerId: "35110810-4593-4c00-84b9-21b0b45fd87e",
          sequence: 2,
          answer: "-5-5+5+10"
        },
        {
          questionAnswerId: "b22dfe6f-20c4-434e-a850-21ab8c1dbb1c",
          sequence: 3,
          answer: "-6-1+5+10"
        },
        {
          questionAnswerId: "2fa25d71-520e-4e56-a3c7-1b3d41512b68",
          sequence: 4,
          answer: "-1-8+10"
        }
      ]
    },
    {
      questionId: "ea7a985a-a53f-4df3-a2a8-d4de82d6d67c",
      sequence: 3,
      title: "ข้อใดได้ผลรวม 20",
      questionAnswerInfo: [
        {
          questionAnswerId: "f7fc7571-16f5-4e59-8153-94fc59c1fb8b",
          sequence: 1,
          answer: "5+5+5+5"
        },
        {
          questionAnswerId: "35110810-4593-4c00-84b9-21b0b45fd87e",
          sequence: 2,
          answer: "-5-5+5+10"
        },
        {
          questionAnswerId: "b22dfe6f-20c4-434e-a850-21ab8c1dbb1c",
          sequence: 3,
          answer: "-6-1+5+10"
        },
        {
          questionAnswerId: "2fa25d71-520e-4e56-a3c7-1b3d41512b68",
          sequence: 4,
          answer: "-1-8+10"
        }
      ]
    },
    {
      questionId: "ea7a985a-a53f-4df3-a2a8-d4de82d6d67d",
      sequence: 4,
      title: "ข้อใดได้ผลรวม 20",
      questionAnswerInfo: [
        {
          questionAnswerId: "f7fc7571-16f5-4e59-8153-94fc59c1fb8b",
          sequence: 1,
          answer: "5+5+5+5"
        },
        {
          questionAnswerId: "35110810-4593-4c00-84b9-21b0b45fd87e",
          sequence: 2,
          answer: "-5-5+5+10"
        },
        {
          questionAnswerId: "b22dfe6f-20c4-434e-a850-21ab8c1dbb1c",
          sequence: 3,
          answer: "-6-1+5+10"
        },
        {
          questionAnswerId: "2fa25d71-520e-4e56-a3c7-1b3d41512b68",
          sequence: 4,
          answer: "-1-8+10"
        }
      ]
    },
    {
      questionId: "ea7a985a-a53f-4df3-a2a8-d4de82d6d67e",
      sequence: 5,
      title: "ข้อใดได้ผลรวม 20",
      questionAnswerInfo: [
        {
          questionAnswerId: "f7fc7571-16f5-4e59-8153-94fc59c1fb8b",
          sequence: 1,
          answer: "5+5+5+5"
        },
        {
          questionAnswerId: "35110810-4593-4c00-84b9-21b0b45fd87e",
          sequence: 2,
          answer: "-5-5+5+10"
        },
        {
          questionAnswerId: "b22dfe6f-20c4-434e-a850-21ab8c1dbb1c",
          sequence: 3,
          answer: "-6-1+5+10"
        },
        {
          questionAnswerId: "2fa25d71-520e-4e56-a3c7-1b3d41512b68",
          sequence: 4,
          answer: "-1-8+10"
        }
      ]
    }
  ]}

  

  firstFormGroup = this._formBuilder.group({
    questionId: ['', Validators.required],
    questionAnswerId: this._formBuilder.array([]) 
  });
  secondFormGroup = this._formBuilder.group({
    questionId: ['', Validators.required],
    questionAnswerId: this._formBuilder.array([]) ,
  });
  thirdFormGroup = this._formBuilder.group({
    questionId: ['', Validators.required],
    questionAnswerId: this._formBuilder.array([]) 
  });
  fourthFormGroup = this._formBuilder.group({
    questionId: ['', Validators.required],
    questionAnswerId: this._formBuilder.array([]) 
  });
  fifthFormGroup = this._formBuilder.group({
    questionId: ['', Validators.required],
    questionAnswerId: this._formBuilder.array([]) 
  });
  stepperOrientation: Observable<StepperOrientation>;
  
  constructor(
    private questionCategoryService: QuestionCategoryService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {

    const categoryId: string|null = localStorage.getItem('categoryId');
    let qId: string ='';
    if(categoryId){
      qId = categoryId
    }
    this.isLoading = true;
    this.questionCategoryService.getQuestions(qId).subscribe(
      (data) => {
        if(data?.data){
          this.isLoading = false;
          this.question = data?.data;
          this.remainingTime = this.question?.timeLimitOfMinuteUnit * 60;
          this.setQuestionId();
        }
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
          if(errKey === '401002'){
            this.authService.logout();
          }else{
            return;
          }
        });
      }
    );

    this.startTimer();
  }

  setQuestionId(){
    this.question?.questionInfo.forEach((item, index) => {
      if(item.sequence === 1){
        this.firstFormGroup.get('questionId')?.setValue(item.questionId);
      }
      if(item.sequence === 2){
        this.secondFormGroup.get('questionId')?.setValue(item.questionId);
      }
      if(item.sequence === 3){
        this.thirdFormGroup.get('questionId')?.setValue(item.questionId);
      }
      if(item.sequence === 4){
        this.fourthFormGroup.get('questionId')?.setValue(item.questionId);
      }
      if(item.sequence === 5){
        this.fifthFormGroup.get('questionId')?.setValue(item.questionId);
      }
    })
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.showTimeoutPopup();
      }
      this.updateDisplayTime();
    }, 1000); // Update timer every second
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  showTimeoutPopup() {
    clearInterval(this.timerInterval);
    const dlgRef: MatDialogRef<CommonDialogComponentComponent> = this.dialog.open(CommonDialogComponentComponent, {
      hasBackdrop: true,
      data: {
        message: `Time's up.`,
        title: 'Warning',
        type: 'warning',
        approve: 'approve'
      }
    });
    dlgRef.afterClosed().subscribe((result: DialogState) => {
      if (result === DialogState.APPROVE) {
        this.submitForm();
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval); // Clear interval to avoid memory leaks
  }
  submitForm() {
   
    this.submission = this.constructSubmissionModel([this.firstFormGroup, this.secondFormGroup, this.thirdFormGroup, this.fourthFormGroup, this.fifthFormGroup]);
    this.isLoading = true;
    this.questionCategoryService.submitAssignment(this.submission).subscribe(
      (data) => {
        this.isLoading = false;
        if(data?.data){
          localStorage.setItem('fullScore', data?.data?.fullScore);
          localStorage.setItem('score', data?.data?.score);
        }
        localStorage.removeItem('titleCategory');
        this.router.navigate(['/web/complete-question-page']);
      },
      (error) => {
        this.isLoading = false;
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
              this.router.navigate(['/web/complete-question-page']);
            }
          }
        });
      }
    );

    // this.router.navigate(['/web/complete-question-page']);
    // localStorage.removeItem('titleCategory');

  }

  constructSubmissionModel(formGroups: FormGroup[]): Submission {
    const submission: Submission = {
      questionCategoryId: '', // Set this value appropriately
      questions: []
    };

    submission.questionCategoryId = this.question?.questionCategoryId;
  
    // Iterate through each form group
    formGroups.forEach((formGroup: FormGroup) => {
      // Extract questionId from the form group
      const questionId: string = formGroup.get('questionId')?.value || '';
      
      // Extract questionAnswerId(s) from the form group
      const questionAnswerIds: string[] = (formGroup.get('questionAnswerId') as FormArray)?.value || [];
  
      // Construct answers array
      const answers: Answer[] = questionAnswerIds.map((answerId: string) => ({ questionAnswerId: answerId })) || [];
  
      // Construct question object and push it to the questions array
      submission.questions.push({ questionId, answers });
      
  
    });
  
    return submission;
  }

  onCheckboxChange(event: any, formGroup: FormGroup, questionId: string) {
    const formArray = formGroup.get('questionAnswerId') as FormArray;

    const formQuestionId = formGroup.get('questionId') as FormControl;

    if (questionId) {
      formQuestionId.setValue(questionId);
    }
    
    if (event.target.checked) {
      // Add the selected value to the form array
      formArray.push(this._formBuilder.control(event.target.value));
    } else {
      // Remove the value from the form array
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
    
  }

}
