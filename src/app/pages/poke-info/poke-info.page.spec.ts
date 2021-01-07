import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokeInfoPage } from './poke-info.page';

describe('PokeInfoPage', () => {
  let component: PokeInfoPage;
  let fixture: ComponentFixture<PokeInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
