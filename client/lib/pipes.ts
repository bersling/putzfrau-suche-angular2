import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		return Object.keys(value).map(key => value[key]);
	}
}

/*
@Pipe({ name: 'mapToIterable',  pure: false })
export class MapToIterablePipe implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		return Object.keys(value).map(key => value[key]);
	}
}*/