import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {


  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
