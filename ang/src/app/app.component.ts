import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>My component title: {{title}}</p>     
  `,
  styles: []
})
export class AppComponent {
  title = 'AppComponent';
}
