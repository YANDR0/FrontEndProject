import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestAboutComponent } from './rest-about.component';

describe('RestAboutComponent', () => {
  let component: RestAboutComponent;
  let fixture: ComponentFixture<RestAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
