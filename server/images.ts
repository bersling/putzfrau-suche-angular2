import {Images} from 'collections/images';

Meteor.publish("images", function () {
	return Images.find({});
});