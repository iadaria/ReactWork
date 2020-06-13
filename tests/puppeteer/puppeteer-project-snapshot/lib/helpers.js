module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			throw new Error(`Could not click on selector: ${selector}`)
		}
    },
    
    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, element => element.innerHTML);
        } catch (error) {
            throw new Error(`Could get text from the selector: ${selector}`);
        }
    },

    getCount: async function(page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$$eval(selector, element => element.length);
        } catch(error) {
            throw new Error(`Cannot get count of the selector: ${selector}`);
        }
    }

    ,typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector);
			await page.type(selector, text);
		} catch (error) {
			throw new Error(`Could not type into selector: ${selector}`);
		}
    }

    ,waitForText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector);
			await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                {}, //options
                selector,
                text
            });
		} catch (error) {
			throw new Error(`Text: ${text} for the selector: ${selector}`);
		}
    }

    ,shouldNotExist: async function(page, selector) {
        try {
            //await page.waitFor(() => !document.querySelector(selector));
            await page.waitForSelector(selector, {hidden: true});
        } catch(error) {
            throw new Error(`The selector: ${selector} is visible, but should not be.`);
        }
    }
}

//http://zero.webappsecurity.com/login.html