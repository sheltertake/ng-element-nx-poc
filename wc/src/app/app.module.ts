import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: environment.production ? [] : [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule { 
  constructor(private readonly injector: Injector) {
  }

  ngDoBootstrap() {
    if (environment.production) {
      const customElement = createCustomElement(AppComponent, { injector: this.injector });
      window.customElements.define('my-element', customElement);
    }
  }
}
