import {Component, View} from 'angular2/core';

import {Cards} from 'collections/cards';

import {CardForm} from '../card-form/card-form';

import {RouterLink, RouteParams} from 'angular2/router';

import {Images} from "/collections/images";

import {MeteorComponent} from 'angular2-meteor';

import {MapToIterable} from 'client/lib/pipes';


@Component({
    selector: 'cards-list',
})
@View({
    templateUrl: '/client/card-list/card-list.html',
    directives: [RouterLink],
    pipes: [MapToIterable]
})
export class CardList extends MeteorComponent {
    cards: Mongo.Cursor<Card>;
    plz: ReactiveVar<number> = new ReactiveVar<number>(null);
    orderParameter: string;
    key: string;

    constructor(private _routeParams:RouteParams) {
        super();
        this.key = _routeParams.get('key');
        this.autorun(() => {
            this.subscribe('cards', undefined, this.plz.get(), () => {
                this.cards = Cards.find({});
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
            Meteor.call('deleteCard', card._id);
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
