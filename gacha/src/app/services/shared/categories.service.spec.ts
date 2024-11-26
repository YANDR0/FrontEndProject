import { TestBed } from '@angular/core/testing';
import { CategoriesService } from './categories.service';
import { HttpService } from './http-service';
import { of } from 'rxjs';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    // Crear un espía para HttpService
    mockHttpService = jasmine.createSpyObj('HttpService', ['getHttp']);

    TestBed.configureTestingModule({
      providers: [
        CategoriesService,
        { provide: HttpService, useValue: mockHttpService }, // Proveer el espía
      ],
    });

    service = TestBed.inject(CategoriesService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCategories', () => {
    fit('should call getHttp with "category" and return the result', () => {
      const mockResponse = [
        { _id: '1', name: 'Category A' },
        { _id: '2', name: 'Category B' },
      ];
      // Simular la respuesta del espía
      mockHttpService.getHttp.and.returnValue(of(mockResponse));

      service.getAllCategories().subscribe((categories) => {
        expect(categories).toEqual(mockResponse); // Comprobar que la respuesta sea la esperada
      });

      // Verificar que se haya llamado al método con el argumento correcto
      expect(mockHttpService.getHttp).toHaveBeenCalledWith('category');
    });

    fit('should handle empty response gracefully', () => {
      const mockResponse: any[] = [];
      mockHttpService.getHttp.and.returnValue(of(mockResponse));

      service.getAllCategories().subscribe((categories) => {
        expect(categories).toEqual([]); // Comprobar que se maneje la respuesta vacía
      });

      expect(mockHttpService.getHttp).toHaveBeenCalledWith('category');
    });
  });
});
