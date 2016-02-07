import {Component, View, NgZone} from 'angular2/core';

import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {Router} from 'angular2/router';

import {Cards} from 'collections/cards';
import {Images} from 'collections/images';

@Component({
	selector: 'card-form'
})
@View({
	templateUrl: '/client/card-form/card-form.html'
})
export class CardForm {
	cardForm: ControlGroup;
	availableLanguages: Array<string>;
	chosenLanguages: Object;
	profilePic: string;
	router: Router;

	constructor(_router: Router) {
		var fb = new FormBuilder();
		this.router = _router;
		this.cardForm = fb.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			age: ['', Validators.required],
			price: ['', Validators.required],
			plz: ['', Validators.required],
			email: ['', Validators.required],
			languages: [{}, Validators.required],
		});
		this.availableLanguages = ['de', 'fr', 'it', 'hr', 'al', 'gb', 'pt', 'es', 'tr', 'in', 'nl', 'ru', 'cn', 'th', 'mk', 'hu'];
		this.chosenLanguages = {};
	}

	selectFile(event): void {

		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function(err, fileObj) {
				if (!err) {
					// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
					this.profilePic = fileObj._id;
				} else {
					toastr.warning('Please select an image file (.jpg, .png, ...)');
				}
			});
		});


		/*
		var inputValue = $event.target;
		var f = inputValue.files[0];
		console.debug("Input File name: " + f.name + " type:" + f.size + " size:" + f.size);*/
	}

	addCard(card: Card) {
		if (this.cardForm.valid) {
			Cards.insert({
				name: card.name,
				description: card.description,
				plz: card.plz,
				age: card.age,
				price: card.price,
				email: card.email,
				languages: this.chosenLanguages,
				pic: this.profilePic
			});
			this.router.parent.navigate(['/CardList'])
		}
	}

	toggleLanguage(l) {
		this.chosenLanguages[l] = !this.chosenLanguages[l];
	}

}
