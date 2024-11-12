export default class CaptchaDto{
    key:String;
    value:String;
    buildHeaderValue():string{
    return `${this.key}|${this.value}`
 }
}