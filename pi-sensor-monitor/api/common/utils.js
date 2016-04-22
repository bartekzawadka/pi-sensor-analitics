/**
 * Created by barte_000 on 2016-04-22.
 */
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}