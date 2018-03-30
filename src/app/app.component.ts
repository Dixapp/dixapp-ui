import { Component } from '@angular/core';

@Component({
  selector: 'body',
  host: {
    "[style.backgroundColor]":"'whitesmoke'"
  },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
