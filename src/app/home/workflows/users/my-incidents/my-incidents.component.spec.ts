import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyIncidentsComponent } from './my-incidents.component';

describe('MyIncidentsComponent', () => {
  let component: MyIncidentsComponent;
  let fixture: ComponentFixture<MyIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
