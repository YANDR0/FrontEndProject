import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpService } from './shared/http-service';
import { Users } from '../types/users';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('HttpService', ['getHttp', 'postHttp']);

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
      const mockResponse = { email:'yael.alexrb@gmail.com', password:'qwertyuiop'};
      const mockData: Users = { email:'yael.alexrb@gmail.com', password:'qwertyuiop'};
      mockHttpService.postHttp.and.returnValue(of(mockResponse));
      service.login(mockData).subscribe((response: Users) => {
        expect(response).toBeDefined();
      });
    });
  });


});
