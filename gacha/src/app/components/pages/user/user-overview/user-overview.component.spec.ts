import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserOverviewComponent } from './user-overview.component';
import { UserService } from '../../../../services/user.service';
import { of } from 'rxjs';
import { Users } from '../../../../types/users';
import { ActivatedRoute } from '@angular/router';

describe('UserOverviewComponent', () => {
  let component: UserOverviewComponent;
  let fixture: ComponentFixture<UserOverviewComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUser: Users = {
    _id: '1',
    email: 'emailtest@email.com',
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    biography: 'This is a test biography',
    location: 1,
  };

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUserData']);
    mockUserService.getUserData.and.returnValue(of(mockUser));

    await TestBed.configureTestingModule({
      imports: [UserOverviewComponent], // Importamos el componente standalone
      providers: [
        { provide: UserService, useValue: mockUserService }, // Mock del servicio
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }, // Mock ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverviewComponent); // Instanciamos el componente
    component = fixture.componentInstance;
    fixture.detectChanges(); // Disparamos los ciclos de vida
  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should load user data from sessionStorage on initialization', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    component.ngOnInit();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('user');
    expect(component.user).toEqual(mockUser);
  });

  fit('should handle missing user data in sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    spyOn(console, 'error'); // Mockeamos el console.error
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('No se encontró el usuario en sessionStorage');
    expect(component.user).toBeNull();
  });

  fit('should return correct location text based on location ID', () => {
    const locationId = 1; // Guadalajara, Jalisco
    const locationText = component.getLocationText(locationId);
    expect(locationText).toBe('Guadalajara, Jalisco');
  });

  fit('should return "Ubicación no especificada" for unknown location ID', () => {
    const unknownLocationId = 999;
    const locationText = component.getLocationText(unknownLocationId);
    expect(locationText).toBe('Ubicación no especificada');
  });
});
