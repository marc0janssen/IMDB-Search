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
    LaunchBar.openURL('http://www.postcodedata.nl/');
}


function runWithString(argument)
{
    
    if (!argument){ return[]; }
    
    var pattPostcode = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}([\s][1-9][0-9]{0,})?$/i;
    var pattNumbers = /^[1-9][0-9]{3}$/;
    
    
    if (pattPostcode.test(argument)){

        var parts = argument.split(" ");
        
        if (pattNumbers.test(parts[0])){

            var zipcode = parts[0]+parts[1];
            if (typeof parts[2] == "undefined"){var streetnumber = 0;}
            else{var streetnumber = parts[2];}
        
        } else {
            
            var zipcode = parts[0];
            if (typeof parts[1] == "undefined"){var streetnumber = 0;}
            else{var streetnumber = parts[1];}
        }
        
        var exIP = getExternalIp();

        var results = getUrl('http://api.postcodedata.nl/v1/postcode/?postcode='+zipcode+'&streetnumber='+streetnumber+'&ref='+exIP+'&type=json');
        
        if (!results) return;
        
        var suggestions = postsAsListResults(results);
        return suggestions;
    }
    return[];
}
