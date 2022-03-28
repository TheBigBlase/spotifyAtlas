export class Artists{
	private mMonthyListeners:number;
	private mName:string;
	private mUrl:string;

	constructor(name:string){
		this.mName = name;
		this.mMonthyListeners = 0;
	}

	name(){
		return this.mName;
	}

}
