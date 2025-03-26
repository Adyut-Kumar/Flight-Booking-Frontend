import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFareComponent } from './add-fare.component';

describe('AddFareComponent', () => {
  let component: AddFareComponent;
  let fixture: ComponentFixture<AddFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
