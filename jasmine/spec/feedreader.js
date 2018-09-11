/* All tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Phrase within single quotes can be anything, but keep it short and descriptive
    // The for loop run the code for each item in the allFeeds array
    // The 1st line checks that the feed.url is defined; undefined = error
    // The 2nd line checks the value's length is greater than 0; less than 0 = error
    it('url defined', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    it('name defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  describe('The Menu', function() {
    /* All files were provided by Udacity so in order to check if there is a toggle class for the menu to disappear/reappear upon click, we need to inspect the files. Either through the files provided or by inspecting the page using the dev tools.

    After playing around on the page, it's clear that the menu button toggles.
    Now, we need to check what the exact name of the toggle class is so we can refer to it in the tests.
    */

    // Here we're retrieving the body element from the DOM and assiging it to the const 'body'
    // The 2nd line of code checks to see if the body contains the class 'menu-hidden' by default
    it('hidden', function() {
      const body = document.querySelector('body');
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

    // By using the click() method, it will click the menu icon
    // This should toggle the menu-hidden class off (remember, default is ON)
    // After the click, the expect function checks the body's menu-hidden class = false
    // If it's still true, then an error will pursue
    // The 2nd menu.click() will click the menu icon again which should close the menu
    // The 2nd expectation checks to see if the menu-hidden class is back or not
    it('toggles on/off', function() {
      const body = document.querySelector('body');
      const menu = document.querySelector('.menu-icon-link');

      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });
  });


  describe('Initial Entries', function() {
    /* Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function. */

    // All code within Jasmine's beforeEach function will run before the expect test functions
    // The 0 in loadFeed is the first index
    // The spec will not run until Jasmine's done() function is called in the beforeEach
    // The specs will not complete until done() is called
    // In apps.js, the if statment has a parameter cb (callback) to run as a method cb()
    // By putting 'done' here, it will pass through and lets the Jasmine test know that the beforeEach function is completed so that the rest of the test can continue
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    // Now that the beforeEach function is finished, the following it function runs
    // It will check that the element within the feed container has at least 1 elements
    // Which is why we use the length method
    it('completed work', function() {
      const feed = document.querySelector('.feed .entry');
      expect(feed.children.length > 0).toBe(true);
    });
  });


  describe('New Feed Selector', function() {
    const feed = document.querySelector('.feed');
    const firstFeed = [];
    const secondFeed = [];

    beforeEach(function(done) {
      // Refers to loadFeed(0) only
      // The Array.from() copies an array
      // The forEach() goes through each item in the Array
      // Each item is pushed into the empty array declared above 'firstFeed'
      // loadFeed(1) loads the page to the 2nd feed
      // The done parameter tells Jasmine that the beforeEach() is completed
      loadFeed(0, function() {
        Array.from(feed.children).forEach(function(item) {
          firstFeed.push(item.innerText);
        });
        loadFeed(1, done);
      });
    });

    it('content changes', function() {
      // This it function refers to loadFeed(1)
      Array.from(feed.children).forEach(function(item, index) {
        // Push headline text of 2nd page to secondFeed variable
        secondFeed.push(item.innerText);
        // Print to console to make sure everything went through
        console.log(firstFeed[index], secondFeed[index], firstFeed[index] === secondFeed[index]);
        // This expectation tests that the firstFeed != secondFeed
        expect(firstFeed[index]).not.toBe(secondFeed[index]);
      });
      // Loads the page back to the first feed
      loadFeed(0);
    });
  });
});
