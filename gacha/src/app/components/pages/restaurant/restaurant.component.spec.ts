import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantComponent } from './restaurant.component';
import { Restaurants } from '../../../types/restaurants';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;
  let mockRestaurantService: jasmine.SpyObj<RestaurantService>;

  const mockRestaurant: Restaurants =
    {
      _id: '1',
      name: 'Restaurant A',
      rating: 4,
      description: 'Cozy place with great food',
      image: 'image-a.jpg',
      category: ['Italian', 'Pasta'],
      location: 1,
      price: 30,
    };

    beforeEach(async () => {
      mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getRestaurantData']);
      mockRestaurantService.getRestaurantData.and.returnValue(of(mockRestaurant));
  
      await TestBed.configureTestingModule({
        imports: [RestaurantComponent], // Import HomeComponent as it is standalone
        providers: [
          { provide: RestaurantService, useValue: mockRestaurantService }, // Mock the service
          { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }, // Mock ActivatedRoute
        ],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RestaurantComponent); // Create the component
      component = fixture.componentInstance; // Get an instance of the component
      fixture.detectChanges(); // Trigger lifecycle hooks
    });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should fetch restaurant with and specific id', () => {
    expect(mockRestaurantService.getRestaurantData).toHaveBeenCalled();
    expect(component.restaurant).toBe(mockRestaurant);
  });

  fit('should have same stars as rating', () => {
    expect(component.stars).toBe("★".repeat(mockRestaurant.rating) + "☆".repeat(5 - mockRestaurant.rating));
  });

  fit('should be hidden in the beggining', () => {
    expect(component.show).toBe(false);
  });

});
