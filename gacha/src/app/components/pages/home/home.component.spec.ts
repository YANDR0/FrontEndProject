import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { of } from 'rxjs';
import { Restaurants } from '../../../types/restaurants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRestaurantService: jasmine.SpyObj<RestaurantService>;

  const mockRestaurants: Restaurants[] = [
    {
      _id: '1',
      name: 'Restaurant A',
      rating: 4.8,
      description: 'Cozy place with great food',
      image: 'image-a.jpg',
      category: ['Italian', 'Pasta'],
      location: 'City Center',
      price: 30,
      __v: 0,
    },
    {
      _id: '2',
      name: 'Restaurant B',
      rating: 4.5,
      description: 'Modern vibes with excellent service',
      image: 'image-b.jpg',
      category: ['American', 'Burgers'],
      location: 'Uptown',
      price: 25,
      __v: 0,
    },
    {
      _id: '3',
      name: 'Restaurant C',
      rating: 4.7,
      description: 'Best sushi in town',
      image: 'image-c.jpg',
      category: ['Japanese', 'Sushi'],
      location: 'Downtown',
      price: 40,
      __v: 0,
    },
    {
      _id: '4',
      name: 'Restaurant D',
      rating: 4.6,
      description: 'Classic diner experience',
      image: 'image-d.jpg',
      category: ['Diner', 'Breakfast'],
      location: 'Midtown',
      price: 20,
      __v: 0,
    },
    {
      _id: '5',
      name: 'Restaurant E',
      rating: 4.4,
      description: 'Authentic Mexican flavors',
      image: 'image-e.jpg',
      category: ['Mexican', 'Tacos'],
      location: 'Westside',
      price: 15,
      __v: 0,
    },
    {
      _id: '6',
      name: 'Restaurant F',
      rating: 4.9,
      description: 'Luxury dining experience',
      image: 'image-f.jpg',
      category: ['French', 'Gourmet'],
      location: 'Eastside',
      price: 100,
      __v: 0,
    },
    {
      _id: '7',
      name: 'Restaurant G',
      rating: 4.3,
      description: 'Great pizza and family-friendly',
      image: 'image-g.jpg',
      category: ['Italian', 'Pizza'],
      location: 'Suburbs',
      price: 18,
      __v: 0,
    },
  ];

  beforeEach(async () => {
    mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getAllRestaurants']);
    mockRestaurantService.getAllRestaurants.and.returnValue(of(mockRestaurants));

    await TestBed.configureTestingModule({
      imports: [HomeComponent], // Import HomeComponent as it is standalone
      providers: [{ provide: RestaurantService, useValue: mockRestaurantService }], // Mock the service
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent); // Create the component
    component = fixture.componentInstance; // Get an instance of the component
    fixture.detectChanges(); // Trigger lifecycle hooks
  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should fetch restaurants on initialization', () => {
    expect(mockRestaurantService.getAllRestaurants).toHaveBeenCalled();
    expect(component.restaurants.length).toBe(mockRestaurants.length);
  });

  fit('should calculate trending restaurants correctly', () => {
    expect(component.trending.length).toBe(6);
    expect(component.trending[0].rating).toBeGreaterThanOrEqual(component.trending[1].rating);
    expect(component.trending[0].name).toBe('Restaurant F');
  });

  fit('should calculate top 10 restaurants correctly', () => {
    expect(component.top10.length).toBeLessThanOrEqual(10);
    expect(component.top10[0].rating).toBeGreaterThanOrEqual(component.top10[1].rating);
  });
});