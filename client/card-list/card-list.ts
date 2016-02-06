import {Component, View} from 'angular2/core';

import {Cards} from 'collections/cards';

import {CardForm} from '../card-form/card-form';

import {RouterLink} from 'angular2/router';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'cards-list',
})
@View({
    templateUrl: '/client/card-list/card-list.html',
    directives: [CardForm, RouterLink]
})
export class CardList extends MeteorComponent {
    cards: Mongo.Cursor<Card>;
    plz: ReactiveVar<number> = new ReactiveVar<number>(null);

    constructor() {
        super();
        this.autorun(() => {
            this.subscribe('cards', this.plz.get(), () => {
                this.cards = Cards.find({});
            }, true);
        });
    }

    removeCard(card) {
        Cards.remove(card._id);
    }

}
