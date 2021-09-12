/* eslint-disable @typescript-eslint/no-var-requires */
const { reloadApp } = require('detox-expo-helpers');

describe('Example', () => {
  beforeEach(async () => {
    await reloadApp();
    // sleep so app can boot
    await sleep(4000);
  });

  it('should login to admin account and see create apartment button', async () => {
    await expect(element(by.id('login'))).toBeVisible();
    await element(by.id('inputEmail')).typeText('admin@gmail.com');
    await element(by.id('inputPassword')).typeText('123123');
    await element(by.id('login')).tap();

    await sleep(1000);
    await expect(element(by.id('createApartment'))).toBeVisible();
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
