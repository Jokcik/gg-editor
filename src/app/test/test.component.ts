import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  public toggler: boolean = false;
  public togglerSpoiler: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
