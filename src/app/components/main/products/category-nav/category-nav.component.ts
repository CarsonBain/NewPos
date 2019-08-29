import { OnInit, Component, Output, EventEmitter} from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category.model'
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss']
})

export class CategoryNavComponent implements OnInit {
  public categories = [];
  public activeNavItem = false;
  @Output() action = new EventEmitter<Category>();

  constructor(public categoryService: CategoryService, public productService: ProductService) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.categories = this.categoryService.getAll();
  }

  public categorySelect(category: Category): void {

    const products = this.productService.getAll(category);
    console.log(products);
    this.action.emit(products);
  }
}
