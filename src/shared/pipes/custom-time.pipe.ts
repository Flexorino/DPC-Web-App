import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe implements PipeTransform {

  transform(value: number, type? : string, precesion? : number): any {

      if(type === "hours"){
      return  (value/3600).toFixed(precesion? precesion: 1) + " Stunden";
      }
      else{
        let time = this.timeConverter(value);
        if(type==="date"){
          return time.date+" "+time.month+" "+time.year;
        }else if( type==="dayTime"){
          return this.pad(time.hour,2)+":"+this.pad(time.min,2);
        }
      }
  }

  private timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = {"year":year, "date":date,"month":month,"hour":hour,"min":min,"sec":sec};
    return time;
  }

  //https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
  private pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

}
