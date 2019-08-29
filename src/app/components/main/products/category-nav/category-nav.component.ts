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
  public activeCategory;
  @Output() action = new EventEmitter<Category>();

  constructor(public categoryService: CategoryService, public productService: ProductService) {}

  public ngOnInit(): void {
    this.getCategories();
    this.categorySelect(this.categories[0].name)
  }

  public getCategories(): void {
    this.categories = this.categoryService.getAll();
  }

  public categorySelect(category): void {
    this.activeCategory = category;
    const products = this.productService.getAll(category);
    this.action.emit(products);
  }
}

