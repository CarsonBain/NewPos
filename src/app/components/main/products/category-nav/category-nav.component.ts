import { OnInit, Component, Output, EventEmitter} from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category.model'

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss']
})

export class CategoryNavComponent implements OnInit {
  public categories = [];
  @Output() action = new EventEmitter<Category>();

  constructor(public categoryService: CategoryService) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.categories = this.categoryService.getAll();
  }

  public categorySelect(category: Category): void {
    this.action.emit(category);
  }
}

