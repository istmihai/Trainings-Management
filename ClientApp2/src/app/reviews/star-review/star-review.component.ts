import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent implements OnInit {
  @Input() isChangeable:boolean;
  @Input()  rating:number;
  @Output()  ratingUpdated=new EventEmitter();
  ratingArr = [0,1,2,3,4];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(rating:number){
    if(this.isChangeable)
    {
      this.rating=rating;
      this.ratingUpdated.emit(rating);
    }
  
  }
  showStar(index:number){
    if(index==Math.ceil(this.rating)-1 && (this.rating-Math.floor(this.rating))<=0.5 && (this.rating-Math.floor(this.rating))>0) return 'star_half';
    if(this.rating>=index+1 ) return 'star';
    return 'star_border';

  }



}
