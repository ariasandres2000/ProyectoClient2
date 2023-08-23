import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAIComponent } from './open-ai.component';

describe('OpenAIComponent', () => {
  let component: OpenAIComponent;
  let fixture: ComponentFixture<OpenAIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenAIComponent]
    });
    fixture = TestBed.createComponent(OpenAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
