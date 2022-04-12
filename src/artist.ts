import { By, until, WebDriver, WebElement} from './driver';

export class Artists{
	private mMonthyListeners:number=0;
	private mName:string;
	private mUrl:string;
	private mTop:number = 3;//TODO better top
	private mDepth:number;
	private mMaxDepth = 5;
	private mHasChildFinished:Boolean = false;
	private mChildren:string[] = [];

	constructor(depth:number, url:string){
		this.mDepth = depth;
		this.mUrl = url;
	}

	name(){
		return this.mName;
	}

	async getSimilar(driver:WebDriver):Promise<void>{
		if(this.mDepth >= this.mMaxDepth)
			return;
		while(!this.mHasChildFinished){
			let xpath:string[] = [
				'//a[text() ="Fans also like"]/following::a[2]',
				'//a[text() ="Fans also like"]/following::a[3]',
				'//a[text() ="Fans also like"]/following::a[4]'
			];

			await driver.get(this.mUrl);
			for(let k = 0; k < this.mTop ; k++){
				let res:string|WebElement = await driver.wait(
					until.elementLocated(By.xpath(xpath[k])));
				res = await res.getAttribute("href");//list of links
				console.log(res);
				this.mChildren.push(res);
			}

			for(let l = 0; l < this.mTop ; l++){
				await driver.get(this.mChildren[l]);
				await driver.wait(until.elementLocated(By.xpath(xpath[l])))
					.getAttribute("href");
				console.log(this.mUrl + await driver.getCurrentUrl())
				let artist = await new Artists(this.mDepth + 1, 
																			 await driver.getCurrentUrl()).getProp(driver);
				await artist.getSimilar(driver);
			}

			this.mHasChildFinished = true;
		}
	}

	setTop(top:number){
		this.mTop = top;
	}

	async getProp(driver:WebDriver):Promise<Artists>{
		const regexNumber:RegExp = new RegExp('[0-9,]+');
		const regexRemoveCommas:RegExp = new RegExp(',', 'g');
		const regexName:RegExp = new RegExp('(?<=\\n)[a-zA-Z ]+(?=\\n)');

		let description:string;
		let getDescritpion = async ():Promise<string> => {
			return await driver.wait(
			until.elementLocated(By.xpath('//div[contains(@class, "contentSpacing")]')))
			.getText();
		}

		while(!description){
			let delay = (ms:number):Promise<void> => { //wait 1 sec then retry
					return new Promise(resolve => {
							setTimeout(resolve, ms);
					});
			}
			await delay(300);
			getDescritpion()	;
		}

		this.mMonthyListeners = parseInt(description.match(regexNumber)[0]
																		 .replace(regexRemoveCommas, ''));
		this.mName = description.match(regexName)[0];

		console.log("[ARTIST] name : " + this.mName + " listeners : " + this.mMonthyListeners
							 + " Depth : " + this.mDepth + " URL : " + this.mUrl);
		return this;
	}
}
