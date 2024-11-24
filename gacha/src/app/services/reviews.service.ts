import { Injectable } from '@angular/core';
import { HttpService } from './shared/http-service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpService: HttpService) { }

  getReviews(restaurantId: string) {
    return this.httpService.getHttpAuth(`reviews/restaurant/${restaurantId}`);
  }

  addReview(body: { content: string, rating: number, restaurantId: string, userId: string }) {
    return this.httpService.postHttpAuth(`reviews`, body);
  }

  editReview(body: { content: string, rating: number, reviewId: string }) {
    return this.httpService.putHttpAuth(`reviews`, body);
  }

  deleteReview(reviewId: string) {
    return this.httpService.deleteHttpAuth(`reviews`, { reviewId });
  }

}

