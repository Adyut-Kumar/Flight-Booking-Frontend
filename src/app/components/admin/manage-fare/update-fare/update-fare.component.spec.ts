import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFareComponent } from './update-fare.component';

describe('UpdateFareComponent', () => {
  let component: UpdateFareComponent;
  let fixture: ComponentFixture<UpdateFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
