//code from https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140

import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { sort } from '../utils/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;
  constructor(
    private targetElm: ElementRef
    ) { }

  @HostListener("click")
  sortData(){
    const Sort = new sort();
    const elem = this.targetElm.nativeElement;
    const order = elem.getAttribute("data-order");
    const type = elem.getAttribute("data-type");
    const property = elem.getAttribute("data-name");

    if(order === "desc"){
      this.appSort.sort(Sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    }else{
      this.appSort.sort(Sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }

}
