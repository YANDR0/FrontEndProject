import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestDetailsComponent } from './rest-details.component';

describe('RestDetailsComponent', () => {
  let component: RestDetailsComponent;
  let fixture: ComponentFixture<RestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
