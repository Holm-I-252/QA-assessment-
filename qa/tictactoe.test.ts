import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();

});

test('X can place a token in the upper left', async () => {
    let topLeft = await (await driver).findElement(By.xpath('//*[@id="cell-0"]'));
    await topLeft.click();
    await driver.sleep(1000);
});

test("Checks if x is placed when x player clicks a space", async () => {
    let topLeft = await (await driver).findElement(By.xpath('//*[@id="cell-0"]')).getText();
    expect(topLeft).toEqual('X');
});

test("X can place a token in the center", async () => {
    let center = await (await driver).findElement(By.xpath('//*[@id="cell-4"]'));
    await center.click();
    await driver.sleep(1000);
});

test('O places a token after X', async () => {
    let topMiddle = await (await driver).findElement(By.xpath('//*[@id="cell-1"]')).getText();
    expect(topMiddle).toEqual('O');
});

test('Check to see if app will prevent multiple tokens in the same space', async () => {
    let topMiddle = await (await driver).findElement(By.xpath('//*[@id="cell-1"]'));
    await topMiddle.click();
    await driver.sleep(1000);
    let check = await (await driver).findElement(By.xpath('//*[@id="cell-1"]')).getText();
    expect(check).toEqual('O')
})

test('check if you can win a game', async () => {
    let bottomRight = await (await driver).findElement(By.xpath('//*[@id="cell-8"]'));
    await bottomRight.click();
    let headderCheck = await (await driver).findElement(By.xpath('//*[@id="topBar"]/h1')).getText();
    expect(headderCheck).toEqual("X wins!");
    await driver.sleep(1000);
})
