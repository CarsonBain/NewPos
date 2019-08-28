import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

@Component({
  selector: "app-text-input",
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  set value(value: string) {
    this._value = value;
    this.onTouched();
    this.onChanged(this.value);
  }

  get value(): string {
    return this._value;
  }

  private _value: string;
  @Input() appearRequired: boolean;
  @Output() blurredResult = new EventEmitter();
  @Output() clickedResult = new EventEmitter();
  public disabled: boolean;
  @Output() enterKeyResult = new EventEmitter();
  @ViewChild('error') errorField: ElementRef;
  @Input() focused: boolean;
  @Output() focusedResult = new EventEmitter();

  @Input() identifier: any;
  @Input() inputType = 'text';
  @Input() invalid = false;
  @Input() placeholder = '';
  public prependEnabled = false;
  @ViewChild('prepend') prependField: ElementRef;
  // If you'd like to disable a text input, set the disabled attribute on the form control

  @Output() selectedResult = new EventEmitter();
  public suffixEnabled = false;
  @ViewChild('suffix') suffixField: ElementRef;
  @ViewChild('text') textField: ElementRef;
  @Input() typeahead = false;
  @ViewChild('typeaheadInstance') typeaheadInstance: NgbTypeahead;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onBlur(): void {
    this.focused = false;
    this.blurredResult.next();
  }

  onChanged: any = () => {};

  public onClick(event): void {
    this.clickedResult.next(event);
  }

  public onEnter(event): void {
    this.enterKeyResult.next(event);
  }

  public onFocus(event): void {
    this.focused = true;
    this.focusedResult.next(event);
    // This triggers angular change detection to run again
    // when ng-bootstrap auto focuses the first input within the view.
    this.changeDetectorRef.detectChanges();
  }
  onTouched: any = () => {};

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  @Input() search: Function = () => of();

  @Input() searchInputFormatter = (): string => {
    return undefined;
  };

  public searchResultFormatter = (result): string => {
    if (result) {
      return result.name;
    }
    return undefined;
  };

  public selectedItem(result: NgbTypeaheadSelectItemEvent): void {
    this.textField.nativeElement.blur();
    this.selectedResult.emit(result.item);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public setFocus(focused: boolean): void {
    this.focused = focused || false;
  }

  public setPrependEnabled(prependField: ElementRef): void {
    if (prependField && prependField.nativeElement.children.length) {
      this.prependEnabled = true;
    }
  }

  public setSuffixEnabled(suffixField: ElementRef): void {
    if (suffixField && suffixField.nativeElement.children.length) {
      this.suffixEnabled = true;
    }
  }

  public writeValue(val: string): void {
    this.value = val;
  }
}
