import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(list: any[], filterText: string, typesearch: string = 'FOLDER'): any {
    if ( typesearch === 'FOLDER' ) {
      return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
    }
    return list
      ? list.filter(item => item.provider.name.search(new RegExp(filterText, 'i')) > -1 || item.provider.rfc.search(new RegExp(filterText, 'i')) > -1)
      : [];
  }

}
