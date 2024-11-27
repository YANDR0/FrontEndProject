import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpService } from './shared/http-service';
import { Users } from '../types/users';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('HttpService', ['getHttp', 'postHttpAuth']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpService, useValue: mockHttpService }
      ],
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    fit('should start session with correct data', () => {
      const mockResponse = { _id: '1', name: 'Restaurant A', email:'yael.alexrb@gmail.com', password:'qwertyuiop'};
      const mockData: Users = { _id: '1', name: 'Restaurant A', email:'yael.alexrb@gmail.com', password:'qwertyuiop'};
      mockHttpService.postHttpAuth.and.returnValue(of(mockResponse));
      service.getRestaurantData(mockData).subscribe((response) => {
        expect(response).toBeDefined();
      });
    });
  });


});
