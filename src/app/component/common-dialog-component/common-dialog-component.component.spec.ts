import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDialogComponentComponent } from './common-dialog-component.component';

describe('CommonDialogComponentComponent', () => {
  let component: CommonDialogComponentComponent;
  let fixture: ComponentFixture<CommonDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
