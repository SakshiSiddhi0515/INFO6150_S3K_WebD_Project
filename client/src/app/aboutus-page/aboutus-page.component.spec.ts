import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusPageComponent } from './aboutus-page.component';

describe('AboutusPageComponent', () => {
  let component: AboutusPageComponent;
  let fixture: ComponentFixture<AboutusPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
