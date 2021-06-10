import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    My Webcomponent: {{title}}    
  `,
  styles: []
})
export class AppComponent {
  title = 'AppComponent';
}
