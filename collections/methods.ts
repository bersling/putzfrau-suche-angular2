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

	});
}