import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';
import { Users } from '../../../types/users';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  const mockUser: Users = {
    _id: '1',
    email: 'emailtest@email.com',
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    biography: 'This is a test biography',
    location: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantComponent], // Importamos el componente standalone
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }, // Mock ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent); // Instanciamos el componente
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
    expect(component.id).toBeDefined();
  });
});