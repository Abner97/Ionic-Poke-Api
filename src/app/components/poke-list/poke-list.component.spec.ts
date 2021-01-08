import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokeListComponent } from './poke-list.component';

describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
