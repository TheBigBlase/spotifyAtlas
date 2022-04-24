import { Artists } from './artist';
import { driver, By, until, seleError } from './driver';

let delay = (ms:number):Promise<void> => { //wait 1 sec then retry
					return new Promise(resolve => {
							setTimeout(resolve, ms);
					});
			}

const getRootArtist = async():Promise<void> =>{
	
	//get top 100 worldwide playlist
	await driver.get('https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF');

	async function clickCookies():Promise<void>{
		let cookies = '//*[@id="onetrust-reject-all-handler"]';
		let res = await driver.wait(until.elementLocated(By.xpath(cookies)));
		await res.click();
		return;
	}

	async function mainArtist(){
		let artist = "/html/body/div[3]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div/div/div[2]/main/div/section/div[2]/div[2]/div/div/button/div/following::a[1]";
		let res = await driver.wait(until.elementLocated(By.xpath(artist)));
		await res.click();
	}

	try{
		await clickCookies();
	}
	catch(e){
		console.log("err", e);
		if(e instanceof seleError.ElementClickInterceptedError || e instanceof seleError.ElementNotInteractableError){
			console.log("waiting 1 sec");
			
		await delay(2000);
		await clickCookies();
		}
	}
	console.log("after cookies");

	try{
		console.log("im here");
		await mainArtist();
		console.log("left main artist");
	}
	catch(e){
		if(e instanceof seleError.ElementClickInterceptedError || e instanceof seleError.ElementNotInteractableError){
			console.log("waiting 1 sec");
			let delay = (ms:number):Promise<void> => { //wait 1 sec then retry
					return new Promise(resolve => {
							setTimeout(resolve, ms);
					});
			}
		await delay(1000);
		await mainArtist();
		}
	}

	let regexNumber:RegExp = new RegExp('[0-9,]+');
	let regexRemoveCommas:RegExp = new RegExp(',', 'g');
	let regexName:RegExp = new RegExp('(?<=\\n)[a-zA-Z ]+(?=\\n)');
	let name = "";
	let number = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "contentSpacing")]'))).getText();
	let numRes = parseInt(number.match(regexNumber)[0].replace(regexRemoveCommas, ''));
	let artist  = new Artists(0, await driver.getCurrentUrl());
	await artist.getProp(driver);
	await artist.getSimilar(driver);
}

export {getRootArtist}
