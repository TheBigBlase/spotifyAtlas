import { Artists } from './artist';
import { driver, By, until } from './driver';

const getRootArtist = async():Promise<void> =>{
	
	//get top 100 worldwide playlist
	await driver.get('https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF');
	let cookies = '//*[@id="onetrust-reject-all-handler"]';
	let xpath = "/html/body/div[3]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div/div/div[2]/main/section/div[2]/div[3]/div/div[2]/div[2]/div[1]/div/div[2]/div/span/a"
	let spath = "/html/body/div[3]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div/div/div[2]/main/section/div[2]/div[3]/div/div[2]/div[2]/div[1]/div/div[2]/div/span/a"
	let res = await driver.wait(until.elementLocated(By.xpath(cookies)));
	res.click();
	res = await driver.wait(until.elementLocated(By.xpath(xpath)));
	res.click();

	console.log(res);

	//let artist  = new Artists();

}

export {getRootArtist}
