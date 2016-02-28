import {Component, View} from 'angular2/core';

import {Cards} from 'collections/cards';

import {CardForm} from '../card-form/card-form';

import {RouterLink, RouteParams} from 'angular2/router';

import {Images} from "/collections/images";

import {MeteorComponent} from 'angular2-meteor';

import {MapToIterable, OrderByPipe} from 'client/lib/pipes';


@Component({
    selector: 'cards-list',
})
@View({
    templateUrl: '/client/card-list/card-list.html',
    directives: [RouterLink],
    pipes: [MapToIterable, OrderByPipe]
})
export class CardList extends MeteorComponent {
    cards: Mongo.Cursor<Card>;
    plz: ReactiveVar<number> = new ReactiveVar<number>(null);
    orderParameter: string;
    key: string;
    sortValue: ReactiveVar = new ReactiveVar(1);
    loading: boolean;
    cardMeta: Object;

    sortObject: ReactiveVar<Object> = new ReactiveVar<Object>({name: this.sortValue.get()});

    constructor(private _routeParams:RouteParams) {
        super();
        this.cardMeta = {};
        this.key = _routeParams.get('key');
        this.autorun(() => {
            let options = {
                sort: this.sortObject.get()
            }
            this.subscribe('cards', options, () => {
                this.cards = Cards.find({}, {sort: this.sortObject.get()});
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
            this.loading = false;
            this.sortObject.set({created: -1});
        } else {
            this.loading = true;

            var that = this;
            this.cards.forEach((card:Card) => {
                Meteor.call('getDistance', this.plz, card.plz, function(err, resp) {
                    that.cardMeta[card._id] = that.cardMeta[card._id] || {};
                    that.cardMeta[card._id].distance = resp;
                    console.log(resp)
                });
            });

            this.sortObject.set({ 'distance.value': -1 });
            this.loading = false;


            // TODO: Do the sorting [30']
            //
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
    };

    changeDirection() {
        if (this.sortValue.get() === 1) {
            this.sortValue.set(-1);
        } else if (this.sortValue.get() === -1) {
            this.sortValue.set(1);
        } else {
            console.log('problem');
        }
        this.sortObject.set({created: this.sortValue.get()});
    };

}
