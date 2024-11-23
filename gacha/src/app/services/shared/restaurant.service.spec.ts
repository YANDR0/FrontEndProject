import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RestaurantService } from './restaurant.service';
import { HttpService } from './http-service';
import { of } from 'rxjs';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let mockHttpService: jasmine.SpyObj<HttpService>;
  let mockRouter: { url: string };

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('HttpService', ['getHttp', 'postHttpAuth']);
    mockRouter = { url: '' }; // Create a mock router object with a configurable `url` property

    TestBed.configureTestingModule({
      providers: [
        RestaurantService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: Router, useValue: mockRouter }, // Provide the mock router
      ],
    });

    service = TestBed.inject(RestaurantService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllRestaurants', () => {
    fit('should call getHttp with "restaurant" and return the result', () => {
      const mockResponse = [
        { _id: '1', name: 'Restaurant A', rating: 4.5 },
        { _id: '2', name: 'Restaurant B', rating: 4.2 },
      ];
      mockHttpService.getHttp.and.returnValue(of(mockResponse));

      service.getAllRestaurants().subscribe((restaurants) => {
        expect(restaurants).toEqual(mockResponse);
      });

      expect(mockHttpService.getHttp).toHaveBeenCalledWith('restaurant');
    });
  });

  describe('getRestaurantData', () => {
    fit('should call postHttpAuth with "restaurant/info" and the correct payload', () => {
      const mockResponse = { _id: '1', name: 'Restaurant A', rating: 4.5 };
      const mockId = '1';
      mockHttpService.postHttpAuth.and.returnValue(of(mockResponse));

      service.getRestaurantData(mockId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      expect(mockHttpService.postHttpAuth).toHaveBeenCalledWith('restaurant/info', { _id: mockId });
    });
  });

  describe('getUrlId', () => {
    fit('should extract the last part of the URL if it is not "reviews"', () => {
      mockRouter.url = '/restaurants/12345'; // Set the mock URL
      expect(service.getUrlId()).toBe('12345');
    });

    fit('should return the second to last part of the URL if the last part is "reviews"', () => {
      mockRouter.url = '/restaurants/12345/reviews'; // Set the mock URL
      expect(service.getUrlId()).toBe('12345');
    });

    fit('should return an empty string if the URL is empty or invalid', () => {
      mockRouter.url = '/'; // Set the mock URL
      expect(service.getUrlId()).toBe('');
    });
  });
});
