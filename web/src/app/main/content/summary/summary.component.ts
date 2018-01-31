import {Component, Input} from '@angular/core';
import {fuseAnimations} from "../../../core/animations";
import {Summary} from "./summary";

@Component({
  selector   : 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls  : ['./summary.component.scss'],
  animations : fuseAnimations
})
export class SummaryComponent {

  @Input() summary: Summary
}
