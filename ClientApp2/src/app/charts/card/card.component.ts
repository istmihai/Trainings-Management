import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/shared/training.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() training:Training;

  constructor() { }

  ngOnInit(): void {
  }

}
