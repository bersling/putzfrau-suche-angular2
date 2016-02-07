import {Component, View, NgZone} from 'angular2/core';

import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';

import {Cards} from 'collections/cards';

import {MeteorComponent} from 'angular2-meteor';

@Component({
	selector: 'contact'
})
@View({
	templateUrl: '/client/contact/contact.html'
})

export class Contact extends MeteorComponent {
	messageForm: ControlGroup;
	router: Router;
	card: Card;

	constructor(_router: Router, params: RouteParams) {
		super();
		var fb = new FormBuilder();
		this.router = _router;
		super();


		var cardId = params.get('card');
		this.subscribe('card', cardId, () => {
			this.autorun(() => {
				this.card = Cards.findOne(cardId);
			},   true);
		});

		this.messageForm = fb.group({
			name: ['', Validators.required],
			content: ['', Validators.required],
			from: ['', Validators.required],
		});
	}

	sendMessage(message: Message) {
		if (this.messageForm.valid) {
			Meteor.call('sendMessage', message, this.card);
			this.router.parent.navigate(['/CardList']);
			toastr.success('Message sent');
		} else {
			toastr.warning('Some fields are not filled out properly');
		}
	}

}
