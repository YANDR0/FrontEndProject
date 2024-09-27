import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantConfigComponent } from './restaurant-config.component';

describe('RestaurantConfigComponent', () => {
  let component: RestaurantConfigComponent;
  let fixture: ComponentFixture<RestaurantConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
