import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RestaurantComponent } from './restaurant.component';
import { AuthService } from '../../../services/shared/auth.service';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { Restaurants } from '../../../types/restaurants';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRestaurantService: jasmine.SpyObj<RestaurantService>;

  const mockRestaurant: Restaurants = {
    _id: '1',
    name: 'Restaurant A',
    rating: 4,
    description: 'A great place to dine',
    image: 'image-a.jpg',
    category: ['Italian'],
    location: 1,
    price: 30,
  };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole']);
    mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getUrlId', 'getRestaurantData']);

    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue(1);
    mockRestaurantService.getUrlId.and.returnValue('1');
    mockRestaurantService.getRestaurantData.and.returnValue(of(mockRestaurant));

    await TestBed.configureTestingModule({
      imports: [RestaurantComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: RestaurantService, useValue: mockRestaurantService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch restaurant data on initialization', () => {
    component.ngOnInit();
    expect(mockRestaurantService.getUrlId).toHaveBeenCalled();
    expect(mockRestaurantService.getRestaurantData).toHaveBeenCalledWith('1');
    expect(component.restaurant).toEqual(mockRestaurant);
    expect(component.stars).toBe('★★★★☆');
  });
});
