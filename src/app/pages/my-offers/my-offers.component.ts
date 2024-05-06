import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../../shared/services/data.service";
import {AuthService} from "../../shared/services/auth.service";
import {Offer} from "../../models/Offer";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
  offerForm!: FormGroup;
  editing: { [key: string]: boolean } = {};
  myOffers: Array<any> = [];
  showModal = false;

  constructor(private fb: FormBuilder, private data: DataService, private auth: AuthService) {
  }

  ngOnInit() {
    this.offerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      salary: ['', Validators.required]
    });

    if (!this.auth.currentUser?.uid) {
      return;
    }
    this.loadMyOffers();
  }

  openNewOfferModal() {
    this.showModal = true;
  }

  createNewOffer() {
    if (!this.offerForm.valid) {
      console.error('Form is not valid.');
      return;
    }

    const newOffer: Offer = {
      ...this.offerForm.value,
      empId: this.auth.currentUser?.uid || ''
    };

    this.data.createJob(newOffer).then(success => {
      if (success) {
        console.log('Offer created successfully');
        this.showModal = false;
        this.loadMyOffers();
      }
    });
  }

  loadMyOffers() {
    this.data.getAllMyOffers(jobs => {
      this.myOffers = jobs;
    });
  }

  closeNewOfferModal() {
    this.showModal = false;
    this.offerForm.reset();
  }

  toggleEdit(id: string) {
    this.editing[id] = !this.editing[id];
  }

  save(offer: any) {
    this.data.updateOffer(offer).then(success => {
      if (success) {
        console.log('Offer updated successfully');
        this.toggleEdit(offer.id);
      }
    });
  }

  deleteOffer(offerId: string) {
    this.data.removeOffer(offerId).then(success => {
      if (success) {
        console.log('siker: törlés');
        this.myOffers = this.myOffers.filter(offer => offer.id !== offerId);
      } else {
        console.error('sikertelen törlés');
      }
    }).catch(err => {
      console.error(err);
    });
  }


}
