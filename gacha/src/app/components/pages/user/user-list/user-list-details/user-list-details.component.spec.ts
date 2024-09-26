import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListDetailsComponent } from './user-list-details.component';

describe('UserListDetailsComponent', () => {
  let component: UserListDetailsComponent;
  let fixture: ComponentFixture<UserListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
