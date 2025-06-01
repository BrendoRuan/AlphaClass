import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarLivroComponent } from './adicionar-livro.component';



describe('AdicionarLivrosComponent', () => {
  let component: AdicionarLivroComponent;
  let fixture: ComponentFixture<AdicionarLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
