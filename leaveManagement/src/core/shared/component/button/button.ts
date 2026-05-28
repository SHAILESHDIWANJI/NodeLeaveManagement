import { Component, Input } from "@angular/core";
import { SHARED_IMPORTS } from "../../sharedModule";

@Component({
    selector: 'app-button',
    imports: [SHARED_IMPORTS],
    templateUrl: './button.html',
    styleUrls: ['./button.scss']
})
export class ButtonComponent {
      @Input() type: string = 'button';

  @Input() buttonClass: string = '';  
  
}