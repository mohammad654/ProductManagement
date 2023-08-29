import { Component,OnInit ,OnDestroy} from "@angular/core";
import { InProduct } from "./product";
import {ProductService} from '../services/product.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]

})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts: InProduct[] = [];
    products: InProduct[] =[]
    private _listFilter:string='';
     sub!: Subscription;
     errorMessage: string = '';

    get listFilter():string{ return this._listFilter;}

    set listFilter(value:string){
    this._listFilter=value;
    this.filteredProducts=this.performFilter(value);
    }

performFilter(filterBy:string): InProduct[]{
    filterBy=filterBy.toLocaleLowerCase();
     return this.products.filter((product:InProduct)=>
            product.productName.toLocaleLowerCase().includes(filterBy)
          )
}
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
   constructor(private productService: ProductService) { }

  ngOnInit(): void{
   this.listFilter='cart';
      this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
  }
    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}
