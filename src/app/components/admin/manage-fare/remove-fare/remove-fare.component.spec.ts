import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFareComponent } from './remove-fare.component';

describe('RemoveFareComponent', () => {
  let component: RemoveFareComponent;
  let fixture: ComponentFixture<RemoveFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
