import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductDTO } from 'src/app/shared/models/product-models';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  productsSaved!: ProductDTO[];
  products!: ProductDTO[];

  constructor(private navigationService: NavigationService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.updateProductsList();
  }

  search(event: any){
    const text = event.target.value;

    if(!text || text === ''){
      this.products = this.productsSaved;
    } else if (text.length >= 3) {
      this.products = this.productsSaved;
    }
  }

  private updateProductsList(){
    this.productService.getAllUsers()
      .subscribe(products => {
        this.productsSaved = products;
        this.products = this.productsSaved;
      });
  }
}
