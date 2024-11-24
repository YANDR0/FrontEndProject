import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../modules/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../../../services/reviews.service';
import { RestaurantService } from '../../../../services/shared/restaurant.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-restaurant-reviews',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './restaurant-reviews.component.html',
  styleUrl: './restaurant-reviews.component.scss'
})
export class RestaurantReviewsComponent implements OnInit {
  newComment: string = "";
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  form: FormGroup;
  restaurantId: string = "";
  userReviwed: boolean = false;
  userId: string = "";

  test = 'test';

  reviewList: Array<{ [key: string]: any, isEditing?: boolean }> = [];

  constructor(formBuilder: FormBuilder, private reviewsService: ReviewsService, private restaurantService: RestaurantService, private userService: UserService) {
    this.form = formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(1)]],
      rating: [null, [Validators.required]]
    });
  }

  selectRating(star: number) {
    this.rating = star;
    this.form.get('rating')?.setValue(star);
  }

  submitComment() {
    if (this.form.valid) {
      const reviewData = {
        content: this.form.value.comment,
        rating: this.form.value.rating,
        restaurantId: this.restaurantId,
        userId: this.userService.getUserId()
      }
      this.reviewsService.addReview(reviewData).subscribe((res) => {
        this.form.reset();
        this.rating = 0;
        this.getReviews();
        this.userReviwed = true;
        alert('Review added successfully');
      });
    }
  }

  getReviews() {
    this.reviewsService.getReviews(this.restaurantId).subscribe((data: any) => {
      this.reviewList = data;
      for (let review of this.reviewList) {
        review['isEditing'] = false;
      }
    });
  }

  toggleEditReview(review: any) {
    review.isEditing = !review.isEditing;
  }

  editReview(reviewId: string) {
    if (this.form.valid) {
      const reviewData = {
        content: this.form.value.comment,
        rating: this.form.value.rating,
        reviewId: reviewId
      }
      this.reviewsService.editReview(reviewData).subscribe((res) => {
        this.form.reset();
        this.rating = 0;
        this.getReviews();
        alert('Review edited successfully');
      });
    }
  }

  deleteReview(reviewId: string) {
    this.reviewsService.deleteReview(reviewId).subscribe((res) => {
      this.getReviews();
      alert('Review deleted successfully');
    });
  }

  ngOnInit(): void {
    this.restaurantId = this.restaurantService.getUrlId();
    this.userId = this.userService.getUserId();
    this.reviewsService.getReviews(this.restaurantId).subscribe((data: any) => {
      this.reviewList = data;
      for (let review of this.reviewList) {
        review['isEditing'] = false;
      }

      console.log(this.reviewList);
      if (this.reviewList.find((review) => review['user']['_id'] == this.userId)) {
        this.userReviwed = true;
      }
    });
  }
}
