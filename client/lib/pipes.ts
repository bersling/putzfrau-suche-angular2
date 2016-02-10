import {Pipe, PipeTransform} from 'angular2/core';



@Pipe({
	name: 'mapToIterable'
})
export class MapToIterable {
	transform(dict: Object): Array {
		var a = [];
		for (var key in dict) {
			if (dict.hasOwnProperty(key)) {
				a.push({key: key, val: dict[key]});
			}
		}
		return a;
	}
}

@Pipe({
	name: "orderBy"
})
export class OrderByPipe {

	transform(array: Array<string>, args: string): Array<string> {

		console.log(array);

		if (!array) {
			return array;
		}

		array = array.fetch()


		if (typeof args[0] === "undefined" || array.length < 2) {
			return array;
		}

		let direction   = args[0][0];
		if (direction === "-") {
			var key = args[0].slice(1);
		} else {
			var key = args[0];
		}

		array.sort((a: any, b: any) => {

			let left, right;

			if (args[1] === 'date') {
				left = Number(new Date(a[key]));
				right = Number(new Date(b[key]));
				return (direction === "-") ? right - left : left - right;
			} else {
				return (direction === "-") ? b[key] > a[key] : a[key] > b[key];
			}

		});

		return array;
	}
}

@Pipe({
	name: "sortBy"
})
export class SortByPipe {
	transform (cursor, )
}