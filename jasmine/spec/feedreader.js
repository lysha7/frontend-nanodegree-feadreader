/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs defined', function() {
            for (var feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined', function() {
            for (var feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /* Menu test suite */
    describe('The menu', function() {
    
        // Ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        // Ensures the menu changes visibility when the menu icon is clicked.
        it('changes visibility when menu icon is clicked', function() {
            const body = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    
    /* Initial Entries test suite */
    describe('Initial Entries', function() {

        // Ensures that the loadFeed function is complete before performing test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Ensures that there is at least a single .entry element within the .feed container
        it('are present after feed is loaded', function(done) {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).not.toBe(0);
            done();
        });
    });

    /* New Feed Selection test suite */
    describe('New Feed Selection', function() {

        // Loads one feed, then another, storing the feed title and title of first entry each time
        var feedTitle1,
            feedTitle2,
            entryTitle1,
            entryTitle2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedTitle1 = document.querySelector('.header-title').textContent;
                entryTitle1 = document.querySelector('.entry h2').textContent;
                
                loadFeed(1, function() {
                    feedTitle2 = document.querySelector('.header-title').textContent;
                    entryTitle2 = document.querySelector('.entry h2').textContent;
                    done();
                });
            });
        });

        // Ensures that the title and first entry of each feed do not match
        it('loads new content', function(done) {
            expect(feedTitle1).not.toMatch(feedTitle2);
            expect(entryTitle1).not.toMatch(entryTitle2);
            done();
        });

     });
}());
