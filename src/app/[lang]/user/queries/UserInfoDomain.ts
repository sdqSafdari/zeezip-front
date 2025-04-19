
export default class UserInfoDomain {
    name: string;
    email: string;
    picture: string;

    constructor(name: string, email: string, picture: string) {
        this.name = name;
        this.email = email;
        this.picture = picture;
    }


    avatarFallbackName():string{
        if (!this.name)
            return '';
        return this.name.split(' ')
            .map(n=>n.substring(0,1))
            .map(n=>n.toUpperCase())
            .reduce((pn,cn)=>pn+cn,'');
    }
}