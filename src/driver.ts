
import { Builder, By, until } from 'selenium-webdriver'

let driver = new Builder().forBrowser('firefox').build();
driver.manage().setTimeouts( { implicit: 5000 } );
export { driver, By, until };
