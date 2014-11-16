include('common.js');


function sleep(milliseconds) {
    var end = new Date().getTime() + milliseconds;
    while (end > new Date().getTime())
    {
        continue;
    }
}


function run()
{
    // No argument passed, just open the website:
    LaunchBar.openURL('http://www.imdb.com/');
}


function runWithString(argument)
{
    
    if (!argument){ return[]; }
    
    //if (!loadApiToken()) {return loginErrorAsListResults();}
    
    //sleep(300); // Slow our requests to be nice to IMDB

    var results = getUrl('http://www.omdbapi.com/?i=&s=' + encodeURIComponent(argument));
    
    if (!results) return;

    var suggestions = postsAsListResults(results);

    if (suggestions.length === 0)
    {
        return [ {
                title: "No results found for " + argument,
                icon: "at.obdev.LaunchBar:InfoTemplate"
                } ];
    }

    return suggestions;
}
