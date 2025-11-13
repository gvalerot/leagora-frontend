import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpcomingTournamentsComponent } from './upcoming-tournaments.component';

describe('UpcomingTournamentsComponent', () => {
  let component: UpcomingTournamentsComponent;
  let fixture: ComponentFixture<UpcomingTournamentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingTournamentsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
