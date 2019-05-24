import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="isError()" class="ui-message ui-messages-error">
    {{ text }}
  </div>
`,
styles: [`
  .ui-messages-error {
    margin: 0;
    margin-top: 4px;
    border: none;
    color: red;
  }
`]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  isError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
