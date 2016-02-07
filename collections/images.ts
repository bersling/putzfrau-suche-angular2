var createSquareThumb = function(fileObj, readStream, writeStream) {
	var size = '200';
	gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

var thumbStore = new FS.Store.FileSystem("thumbs", {
	transformWrite: createSquareThumb
});

export var Images = new FS.Collection("images", {
	stores: [thumbStore],
	filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
	}
});

Images.allow({
	download: function(userId, fileObj) {
		return true;
	},
	insert: function () {
		// add custom authentication code here
		return true;
	},
	update: function () {
		// add custom authentication code here
		return true;
	}
});