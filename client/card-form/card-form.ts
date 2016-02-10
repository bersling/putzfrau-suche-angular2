import {Component, View, NgZone} from 'angular2/core';

import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {Router, RouteParams} from 'angular2/router';

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
	profilePic: string;
	router: Router;
	card: Card;

	constructor(
			_router: Router,
			private _routeParams:RouteParams
	) {
		// if it's to edit an existing card
		var cardId = _routeParams.get('card');
		var key = _routeParams.get('key');
		if (cardId) {
			var card = Cards.findOne({_id: cardId});
			if (key === card.key) {
				this.card = card;
			}
		} else {
			this.card = {
				languages: {},
			};
		}
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
	}

	selectFile(event): void {

		var f = event.target.files[0];
		var that = this;

		Images.insert(f, function(err, fileObj) {
			if (!err) {
				// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				that.profilePic = fileObj._id;
			} else {
				toastr.warning('Please select an image file (.jpg, .png, ...)');
			}
		});

	};

	addCard() {
		var c = this.card;
		if (this.cardForm.valid && (c.pic || this.profilePic)) {
			if (this.profilePic) {
				c.pic = this.profilePic;
			}
			if (c._id) {
				Meteor.call('updateCard', c);
			} else {
				c.key = Math.random().toString(36).substr(2, 12);
				c.created = new Date().getTime();
				Cards.insert(c);
				var url = window.location.origin + '?key=' + c.key;
				Meteor.call('sendMailOnCreation', c, url);
			}

			this.router.parent.navigate(['CardList', {key: c.key}]);
		} else {
			toastr.warning('Please fill out all fields')
		}
	};

	toggleLanguage(l) {
		this.card.languages[l] = !this.card.languages[l];
	};

}
