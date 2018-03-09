import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Directive({
  selector: '[imagesrc]'
})
export class ImagesrcDirective implements OnInit {

  @Input('imagesrc') url: string;

  constructor(private el: ElementRef, private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url, {
      responseType: 'blob'
    }).subscribe((data)=> {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.el.nativeElement.src = reader.result;
      };
    })
  }

}
