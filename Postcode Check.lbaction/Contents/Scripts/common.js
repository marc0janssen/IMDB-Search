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

    LaunchBar.debugLog('GET ' + url);
    
    var result = HTTP.getJSON(url);
    
    if (result.data) return result.data;
    
    if (result.response.status !== 200) {
        LaunchBar.alert(
                        'Could not contact postcodedate.nl.',
                        'This may be a temporary error. Try again later.\n\postcodedate.nl said: ' + result.response.status + ' ' + result.response.localizedStatus);
        return null;
    }
}


/**
 * Get External IP
 */

function getExternalIp(){
    
    var exIP = HTTP.getJSON('http://api.ipify.org?format=json');
    
    if (exIP.data){
        return exIP.data.ip;
    }
    
    if (exIP.response.status !== 200){
        
        return '0.0.0.0';
    }
    
    
    
}


/**
 * @param  {array} posts the Pinboard post objects as returned from HTTP JSON requests.
 * @return {array}       LaunchBar results.
 */

function postsAsListResults(results) {
    var status = results.status;
    var results = results.details;
    var items = [];
    
    var suggestions = [];

    if (status == "ok"){
    
        for (var i = 0; i < results.length; i++) {

            var result = results[i];

            suggestions.push({
                         title: result.street + " " + result.city + " ("+result.municipality+", "+result.province+")",
                         url: 'https://www.google.nl/maps/place/'+result.lat+'+'+result.lon,
                         icon: "at.obdev.LaunchBar:InfoTemplate"
                         });
        };
    }else{
        suggestions.push({
                         title: "No such zipcode and streetnumber found.",
                         icon: "at.obdev.LaunchBar:NotFound.icns"
                         });
        
    }

    return suggestions;
}





