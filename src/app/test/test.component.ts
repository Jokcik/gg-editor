import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  public toggler = false;
  public togglerSpoiler = false;
  public toggleSmiles = false;
  public toggleImageUpload = false;
  constructor() { }

  ngOnInit() {
  }

}
