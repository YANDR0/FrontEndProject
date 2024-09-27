import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReviewsComponent } from './restaurant-reviews.component';

describe('RestaurantReviewsComponent', () => {
  let component: RestaurantReviewsComponent;
  let fixture: ComponentFixture<RestaurantReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
