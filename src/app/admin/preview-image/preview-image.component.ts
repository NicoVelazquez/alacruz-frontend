import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.css']
})
export class PreviewImageComponent implements OnInit {

  @Input() product;
  @Input() loading: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
