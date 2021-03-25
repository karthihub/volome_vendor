import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoinsPackagePage } from './coins-package.page';

describe('CoinsPackagePage', () => {
  let component: CoinsPackagePage;
  let fixture: ComponentFixture<CoinsPackagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsPackagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoinsPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
