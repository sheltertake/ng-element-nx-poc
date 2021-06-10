# ng-element-nx-poc

## 1 - Create Angular minimal app and Web Component demo

```cmd
ng new wc  --skip-install --inline-style --inline-template --skip-tests --style=scss --minimal
ng new ang  --skip-install --inline-style --inline-template --skip-tests --style=scss --minimal
```

## 2 - Web Component

```cmd
cd wc
npm i 
ng add @angular/elements
npm i serve concat --save-dev
ng s
```

 - app.module.ts

```typescript
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

```

 - app.component.ts

```typescript
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

```

 - build webcomponent app

```cmd
ng b --prod --delete-output-path --output-hashing=none --output-path=../output/wc
```
 - concat bundles -> node build.js

```javascript
const concat = require('concat');

const build = async () =>{
    const files = [
        '../output/wc/runtime.js',
        '../output/wc/polyfills.js',
        '../output/wc/main.js'
      ];
    
      await concat(files, '../output/wc.min.js');
}
build();
```

 - ../output/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Wc</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <h1>Web Component DEMO Page</h1>
    <my-element></my-element>
    <script src="wc.min.js" defer></script>
  </body>
</html>
```

 - test demo -> npx serve ..\output\ -l 4001
 - upload bundle minified on azure storage -> https://ngelementpoc.z35.web.core.windows.net/wc.min.js

## 3 - Consumer App

```cmd
cd ang
ng s --port 4002
```

 - index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Ang</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://ngelementpoc.z35.web.core.windows.net/wc.min.js"></script>
</head>
<body>
  <h1>My Angular APP:</h1>
  <app-root></app-root>
  <hr />
  <h1>My Angular WEB Component:</h1>
  <my-element></my-element>
</body>
</html>
```

 - app.component.ts

```typescript
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
```

 - build consumer app

```cmd
ng b --delete-output-path  --output-path=../output/app
```

 - upload dist content on azure storage -> https://ngconsumer.z35.web.core.windows.net/