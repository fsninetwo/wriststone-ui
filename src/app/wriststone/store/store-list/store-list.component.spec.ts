import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';

import { StoreListComponent } from './store-list.component';

class NavigationServiceMock {
  public goToFullRoute(route: string): void {}
}

class ProductServiceMock {
  public getAllUsers() {
    return of([]);
  }
}

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreListComponent ],
      providers: [
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: ProductService, useClass: ProductServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
