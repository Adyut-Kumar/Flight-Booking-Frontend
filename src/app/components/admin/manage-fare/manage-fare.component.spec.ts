import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFareComponent } from './manage-fare.component';

describe('ManageFareComponent', () => {
  let component: ManageFareComponent;
  let fixture: ComponentFixture<ManageFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
