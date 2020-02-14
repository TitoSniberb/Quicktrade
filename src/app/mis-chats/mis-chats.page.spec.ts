import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisChatsPage } from './mis-chats.page';

describe('MisChatsPage', () => {
  let component: MisChatsPage;
  let fixture: ComponentFixture<MisChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisChatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
