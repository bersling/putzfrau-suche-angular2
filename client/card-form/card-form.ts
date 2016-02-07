import {Component, View} from 'angular2/core';

import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {Cards} from 'collections/cards';

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

    constructor() {
        var fb = new FormBuilder();
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

    addCard(card: Card) {
        console.log('hi')
        if (this.cardForm.valid) {
            Cards.insert({
                name: card.name,
                description: card.description,
                plz: card.plz,
                age: card.age,
                price: card.price,
                email: card.email,
            });

            (<Control>this.cardForm.controls['name']).updateValue('');
            (<Control>this.cardForm.controls['description']).updateValue('');
            (<Control>this.cardForm.controls['price']).updateValue('');
            (<Control>this.cardForm.controls['age']).updateValue('');
            (<Control>this.cardForm.controls['email']).updateValue('');
            (<Control>this.cardForm.controls['price']).updateValue('');


        }
    }

    toggleLanguage(l) {
        this.chosenLanguages[l] = !this.chosenLanguages[l];
    }

}
