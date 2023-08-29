import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule ,Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Pipes
import { ConvertToSpacesPipe } from './pipes/convert-to-spaces.pipe';

// Components
import { ProductListComponent } from './products/product-list.component';
// import { ProductData } from './products/product-data';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { NavComponent } from './nav/nav.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const appRoutes: Routes = [
   { path: 'products', component: ProductListComponent },
   { path: 'products/:id/edit', component: ProductEditComponent },
   { path: 'products/:id/add', component: ProductAddComponent },
   { path: 'products/:id',canActivate: [ProductDetailGuard],component: ProductDetailComponent },
   { path: 'template', component: TemplateFormComponent },
   { path: 'reactive', component: ReactiveFormComponent },
   { path: 'welcome', component: WelcomeComponent },
   { path: '', redirectTo: '', pathMatch: 'full' },
   { path: '**', redirectTo: 'welcome', pathMatch: 'full' }]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    ProductEditComponent,
    NavComponent,
    TemplateFormComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
//     HttpClientInMemoryWebApiModule.forRoot(ProductData),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
