import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFormsComponent } from './available-forms.component';

describe('AvailableFormsComponent', () => {
  let component: AvailableFormsComponent;
  let fixture: ComponentFixture<AvailableFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
