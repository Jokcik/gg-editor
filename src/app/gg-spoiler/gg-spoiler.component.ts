import {Component, Input} from '@angular/core';

@Component({
  selector: 'gg-spoiler',
  templateUrl: './gg-spoiler.component.html'
})
export class GGSpoilerComponent {
  @Input() title: string;
  @Input() active: boolean = false;
}
