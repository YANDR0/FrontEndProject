import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestConfigComponent } from './rest-config.component';

describe('RestConfigComponent', () => {
  let component: RestConfigComponent;
  let fixture: ComponentFixture<RestConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
