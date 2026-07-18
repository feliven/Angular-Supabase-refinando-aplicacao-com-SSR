import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductDetails } from './pages/product-details/product-details';
import { productResolver } from './product-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'details/:id',
    component: ProductDetails,
    resolve: { product: productResolver },
  },
];
