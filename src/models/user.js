export class User {
	name: String;
	username: String;
	password: String;
	hospitalCode: Number;
	password2:String;
	userState: String;

	constructor(obj){
		this.name=obj.name;
		this.username=obj.username;
		this.hospitalCode=obj.hospitalCode;
		this.password=obj.password;
		this.password2=obj.password2;
		this.userState=obj.userState;
	}
}