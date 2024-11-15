export default class CaptchaDto{
    key:String;
    value:String;
    type: "base64" | "turnstile";
    buildHeaderValue():string {
        if (this.type === "base64")
            return `${this.key}|${this.value}`
        else if (this.type === "turnstile")
            return this.value;
        else
            return "";
    }
    buildHttpHeaders(){
       return  {'X-Captcha':this.buildHeaderValue()
               ,"X-Captcha-Type":this.type};
    }
}