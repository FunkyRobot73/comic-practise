import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue'
})
export class KeyvaluePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  // Preserve original property order
originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
  return 0;
}

// Order by ascending property value
valueAscOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
  return a.value.localeCompare(b.value);
}

// Order by descending property key
keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
  return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
}

}
