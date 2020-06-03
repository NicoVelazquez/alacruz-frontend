import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Output() pressed = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.pressed.emit();
  }

}
