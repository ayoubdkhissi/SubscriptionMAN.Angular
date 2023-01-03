import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ISubscriptionServiceDTO } from 'src/app/core/interfaces/ISubscriptionServiceDTO';
import { SubscriptionServiceService } from 'src/app/core/services/subscription-service.service';

@Component({
  selector: 'app-add-subscription-service',
  templateUrl: './add-subscription-service.component.html',
  styleUrls: ['./add-subscription-service.component.scss']
})
export class AddSubscriptionServiceComponent implements OnInit {

  public addSubscriptionServiceForm!: FormGroup;
  public snackBar: MatSnackBar;

  isSubmitting: boolean = false;
  error = '';

  /* Injectable Services */
  private _router: Router;
  private _formBuilder: FormBuilder;
  private _subscriptionServiceService: SubscriptionServiceService;



  constructor(router: Router,
    snackBar: MatSnackBar,
    formBuilder: FormBuilder,
    subscriptionServiceService: SubscriptionServiceService) {
    this._router = router;
    this._subscriptionServiceService = subscriptionServiceService;
    this.snackBar = snackBar;
    this._formBuilder = formBuilder;
  }

  ngOnInit(): void {

    this.addSubscriptionServiceForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }


  onSubmit() {

    if(this.addSubscriptionServiceForm.invalid)
      return;

    const subscriptionService: ISubscriptionServiceDTO = {
      name: this.addSubscriptionServiceForm.value.name,
      description: this.addSubscriptionServiceForm.value.description
    };

    console.log("Sendind Post request to create a new subscription service. Name " + subscriptionService.name + " Description " + subscriptionService.description);
    
    this._subscriptionServiceService.createSubscriptionService(subscriptionService).subscribe({
      next: (response) => {
        console.log("Subscription service created successfully");
        this.snackBar.open("Subscription service " + subscriptionService.name + " created successfully!", '', {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
        this._router.navigate(['home']);
      },
      error: (error => {
        this.snackBar.open("An error has occured, please Try again later", '', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      })
    });
  }

}
