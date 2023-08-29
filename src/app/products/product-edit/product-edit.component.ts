import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
    id = Number(this.route.snapshot.paramMap.get('id'));
    idObservable:any;
 ngOnInit():void {
     this.route.paramMap.subscribe(x=>this.idObservable=x.get('id'));
 }

}
