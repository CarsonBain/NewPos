import { OnInit, Component, EventEmitter, Output} from '@angular/core';
import * as Fuse from 'fuse.js';
import { ProductService } from 'src/app/services/product/product.service';
import { ISimpleProductSearch } from 'src/app/models/search/product-search.model'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})

export class ProductSearchComponent implements OnInit {
  public form: FormGroup;
  @Output() productFound = new EventEmitter<any>();
  
  get productSearch(): FormControl {
    return this.form.get('productSearch') as FormControl;
  }

  constructor(
    public productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }
  
  private buildForm(): void {
    this.form = this.formBuilder.group({
      productSearch: '',
    });
  }
  
  public searchProducts(): void {
    const products = this.productService.getAll();
    const options: Fuse.FuseOptions<ISimpleProductSearch> = {
      keys: ['name', 'sku'],
    };
    const fuse = new Fuse(products, options);
    const results = fuse.search(this.productSearch.value);
    this.productFound.emit(results);
  }

}

