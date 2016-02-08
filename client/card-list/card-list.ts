import {Component, View} from 'angular2/core';

import {Cards} from 'collections/cards';

import {CardForm} from '../card-form/card-form';

import {RouterLink} from 'angular2/router';

import {Images} from "/collections/images";

import {MeteorComponent} from 'angular2-meteor';

import {ValuesPipe} from 'client/lib/pipes';


@Component({
    selector: 'cards-list',
})
@View({
    templateUrl: '/client/card-list/card-list.html',
    directives: [RouterLink],
    pipes: [ValuesPipe]
})
export class CardList extends MeteorComponent {
    cards: Mongo.Cursor<Card>;
    plz: ReactiveVar<number> = new ReactiveVar<number>(null);
    orderParameter: string;

    constructor() {
        super();
        this.autorun(() => {
            this.subscribe('cards', this.plz.get(), () => {
                this.cards = Cards.find({}).fetch();
            }, true);
        });

    }

    removeCard(cardId: string) {
        Cards.remove(cardId);
    }

    getImageUrl (id) {
        var img = Images.findOne(id);
        if (img) {
            return Images.findOne(id).url();
        }
    };

    deleteCard (card: Card) {
        var r = confirm("Möchten Sie das wirklich löschen?");
        if (r) {
            console.log(card._id);
            this.removeCard(card._id);
            //Meteor.call('deleteCard', card._id);
        }
    };

    updateDistances() {
        if (this.plz < 1000 || this.plz > 9999) {
            this.orderParameter = '-created';
        } else {
            this.orderParameter = 'distance.value';


            // TODO: Do the sorting
            /*
            var promises = [];
            var distances = [];
            angular.forEach(this.cards, function(card: Card) {
                promises.push($meteor.call('getDistance', $scope.query.plz, ad.plz).then(function(response) {
                    return response;
                }));
            });

            $q.all(promises).then(function(data) {
                angular.forEach($scope.ads, function(ad, index) {
                    ad.distance = data[index];
                });
            });

            */
        }
    }

}
