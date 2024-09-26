import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestReviewsComponent } from './rest-reviews.component';

describe('RestReviewsComponent', () => {
  let component: RestReviewsComponent;
  let fixture: ComponentFixture<RestReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
