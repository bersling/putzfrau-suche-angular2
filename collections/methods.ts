import {Cards} from './cards';

if (Meteor.isServer) {
	Meteor.methods({

		sendMessage: function(message: Message, card: Card) {
			var html = '<div style="white-space: pre-wrap">' + message.content + '</div>';
			var optionsSendInfo = {
				from: message.from,
				to: [card.email],
				bcc: ["support@putzfrau-suche.ch"],
				subject: 'Nachricht von ' + message.name,
				html: html
			};
			Email.send(optionsSendInfo);
		},

		sendMailOnCreation: function (newAd, url) {
			var html = 'Vielen Dank, dass Sie auf putzfrau-suche.ch inseriert haben! <br> Um Ihr Inserat zu editieren, klicken Sie auf: <a href=' + url + '>' + url + '</a> <br><br> Freundliche Grüsse <br> Ihr putzfrau-suche.ch Team';
			var optionsSendInfo = {
				from: "support@putzfrau-suche.ch",
				to: [newAd.email],
				bcc: ["bersling@gmail.com"],
				subject: "Link zum Editieren auf putzfrau-suche.ch",
				html: html
			}
			Email.send(optionsSendInfo);
		},

		deleteCard: function(id) {
			console.log(id);
			Cards.remove({_id: id});
		},

		updateCard: function(c) {
			Cards.update({_id: c._id}, c);
		}

	});
}