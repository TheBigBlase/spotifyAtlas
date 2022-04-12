import { Builder, By, until, WebDriver, WebElement } from 'selenium-webdriver'
import { error } from 'selenium-webdriver';

let driver = new Builder().forBrowser('firefox').build();
driver.manage().setTimeouts( { implicit: 5000 } );

export { driver, By, until, WebDriver, error as seleError, WebElement };
