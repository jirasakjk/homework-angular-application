import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteQuestionPageComponent } from './complete-question-page.component';

describe('CompleteQuestionPageComponent', () => {
  let component: CompleteQuestionPageComponent;
  let fixture: ComponentFixture<CompleteQuestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteQuestionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
