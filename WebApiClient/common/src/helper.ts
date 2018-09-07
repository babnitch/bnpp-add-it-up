export class Helper {
  IsNumber(value: any): boolean {
    if(typeof value === "string"){
      var integer = parseInt(value, 10);
      return (
        isFinite(integer) &&
        Math.floor(integer) === integer
      );
    }
   
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  }

  NumberWithinRange(
    value: number,
    minValue: number,
    maxValue: number
  ): boolean {
    if (value >= minValue && value <= maxValue) {
      return true;
    }
    return false;
  }

  UpperCaseFirstAllWords(str: string | null): string | null {
    if (str == null || str == undefined) {
      return str;
    }

    let pieces = str.split(" ");
    for (let i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1).toLowerCase();
    }
    return pieces.join(" ");
  }
}
