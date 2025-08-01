import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalConfirmationComponent } from './final-confirmation.component';

describe('FinalConfirmationComponent', () => {
  let component: FinalConfirmationComponent;
  let fixture: ComponentFixture<FinalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
