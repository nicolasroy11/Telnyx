/**
 * @overview Our main app layout.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <navigation></navigation>

    <div class='px-3'>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
