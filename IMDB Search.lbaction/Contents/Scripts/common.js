/*
 * This script is copied (grunt) to each action directory so they can share
 * common log in and HTTP request behaviour. It is included in each action with
 * the LaunchBar specific `include` function, but this seems to require the
 * shared script to be in the same directory as the calling script.
 */

/**
 * HTTP GET a give Rotten Tomatoes. Automatically requests JSON format
 * and include the API token (which must be loaded with loadApiToken first).
 *
 * Will automatically prompt for a new API token if hits a 401.
 *
 * @param  {string} url    URL to load.
 * @param  {object} params optional hash of parameter names to values.
 * @return {object}        the JSON result. null if not loaded.
 */
function getUrl(url, params) {
    //url = url + '&apikey=' + apiToken_;
/*
    if (params) {
        for (var name in params) {
            url += '&' + name + '=' + params[name];
        }
    }
*/
    
    LaunchBar.debugLog('GET ' + url);
    
    var result = HTTP.getJSON(url);
    
    if (result.data) return result.data;
    
    if (result.response.status !== 200) {
        LaunchBar.alert(
                        'Could not contact IMDB.',
                        'This may be a temporary error. Try again later.\n\IMDB said: ' + result.response.status + ' ' + result.response.localizedStatus);
        return null;
    }
}

/**
 * @param  {array} posts the Pinboard post objects as returned from HTTP JSON requests.
 * @return {array}       LaunchBar results.
 */

function postsAsListResults(results) {
    var results = results.Search;
    var items = [];
    
    var suggestions = [];
    
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        
        suggestions.push({
                         title: result.Title + " ("+result.Year+")",
                         url: 'http://www.imdb.com/title/' + result.imdbID,
                         icon: "at.obdev.LaunchBar:MoviesTemplate"
                         });
    };

    return suggestions;
}







