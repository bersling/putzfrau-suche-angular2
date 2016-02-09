import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		return Object.keys(value).map(key => value[key]);
	}
}

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

/*
@Pipe({ name: 'mapToIterable',  pure: false })
export class MapToIterablePipe implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		return Object.keys(value).map(key => value[key]);
	}
}*/