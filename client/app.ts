import {Component, View, NgZone, provide} from 'angular2/core';

import {bootstrap} from 'angular2-meteor';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';

import {CardList} from 'client/card-list/card-list';
import {CardForm} from 'client/card-form/card-form';
import {Info} from 'client/info/info';
import {Contact} from 'client/contact/contact';

import 'collections/methods';

import {enableProdMode} from 'angular2/core';
enableProdMode();

@Component({
    selector: 'app'
})
@View({
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', as: 'CardList', component: CardList },
    { path: '/suche-job-als-putzfrau', as: 'CardForm', component: CardForm },
    { path: '/info', as: 'Info', component: Info },
    { path: '/contact', as: 'Contact', component: Contact }
])

class Socially {
}

bootstrap(Socially, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
