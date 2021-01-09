import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonOtpPage } from './common-otp.page';

describe('CommonOtpPage', () => {
  let component: CommonOtpPage;
  let fixture: ComponentFixture<CommonOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
