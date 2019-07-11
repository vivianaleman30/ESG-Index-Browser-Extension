//the main code
async function displaySticker(businessList){
    await sleep(1000);

    //narrowing the span down to the unordered lists on the page
    var list = document.getElementsByClassName('lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH');
    console.log("narrowed down to list");
    console.log("list length= " + list.length);
    
    //for debugging purposes, DO NOT DELETE
    //some pages on yelp have more undordered lists than others, this code is for figuring out which one is the correct one
    //the unordered list we need has 10 listings, at least until yelp changes the code to display more listings per page
    //THOROUGH TESTING WILL BE REQUIRED ONCE THE DATABASE IS SET UP
//    for(var i = 0; i < list.length; i++)
//    {
//        var listings = list[i].getElementsByTagName('li');
//        console.log("number of listings in list #" + i +":" + listings.length);
//    }
//to decide which list is the one we need
    if(list.length == 9)
    {
        var importantList = list[5].getElementsByTagName('li');
    }
    else if(list.length== 10)
    {
        var importantList = list[6].getElementsByTagName('li');
    }
    
    //rest of actual code starts here
    var businessOfRelevance;

    //for loop to cycle through the lines in the list
    for(var r = 0; r < importantList.length; r++) {
        //narrowing it down to an individual line in the list
        var listing = importantList[r];
        console.log(" ");
        console.log("narrowed down to listing");

        //other useful variables
        var businessName;
        var businessPhone;
        var businessAddress; //can separate into the different address sections if needed
        var valid = false;
        var headOfRelevance

        //to skip over the lines in the list that are only captions
        var heads = listing.getElementsByTagName('P');
        console.log("about to check the headings");
        if(heads.length >1)
        {
            console.log("the right listing");
            //First, get the business name
            var divOfRelevance = listing.getElementsByClassName('lemon--div__373c0__1mboc businessName__373c0__1fTgn border-color--default__373c0__2oFDT');
            console.log(divOfRelevance.length);
            headOfRelevance = divOfRelevance[0].getElementsByTagName('h3');
            var aOfRelevance = divOfRelevance[0].getElementsByTagName('a');
            businessName = aOfRelevance[0].innerText; //may need to use textContent for firefox
            console.log("businessName is " + businessName);

            //Second, get the phone #
            var secondDivOfRelevance = listing.getElementsByClassName('lemon--div__373c0__1mboc secondaryAttributes__373c0__7bA0w arrange-unit__373c0__1piwO border-color--default__373c0__2oFDT');
            var pOfRelevance = secondDivOfRelevance[0].getElementsByTagName('p');
            businessPhone = pOfRelevance[0].innerText;
            console.log("businessPhone is " + businessPhone);
            //to do: make sure the phone number is in 1234567891 format

            //Third, get the address
            //to do: also get city, zipcode(?), and state and country
            //try-catch to avoid an error that happens when a listing doesn't have an address
            try{
                var addressOfRelevance = secondDivOfRelevance[0].getElementsByTagName('address');
                var spanOfRelevance = addressOfRelevance[0].getElementsByTagName('span');
                businessAddress = spanOfRelevance[0].innerText;
                //make the boodean true
                valid = true;
                console.log("valid is true");
            }
            catch(err){
                businessAddress = "Null";
                valid = false;
            }
            finally{
                console.log("businessAddress is " + businessAddress);
            }
        }//closing the if to check if the listing is valid
        else
        {
            console.log("not the right listing");
        }

        //separate if to handle what to do with the data
        if(valid==true)
        {
            var inData = false;
            //search the table for the business listing
            //temporary: for loop to run through all the listings in living_wage_businesses.js
            for(var n = 0; n < businessList.length; n++)
            {
                //if the business name is in the data
                if(businessName === businessList[n].name)
                {
                    //if the address is in the data
                    if(businessAddress === businessList[n].streetAddress)
                    {
                        //setting the business from the data to the object
                        businessOfRelevance = businessList[n];
                        console.log("found business, inData is true");
                        //set inData to true
                        inData = true;
                    }
                    else
                    {
                        console.log("did not find business");
                    }
                }//end of outer if line
            }//closing the for loop

            //if for displaying the sticker
            if(inData)
            {
                //initializing the img element to avoid redundancy
                var img = document.createElement("img");
                img.height = 32;
                img.width = 40;
                
                //if to know which sticker to display
                if(businessOfRelevance.certificationLevel === "Gold")
                {
                    img.src = "chrome-extension://acndfmbdnajhncpamoahgnidhellckmm/icons/Gold.png";
                    headOfRelevance[0].appendChild(img);
                    console.log("certification level is gold");
                }
                else if(businessOfRelevance.certificationLevel === "Silver")
                {
                    img.src = "chrome-extension://acndfmbdnajhncpamoahgnidhellckmm/icons/Silver.png";
                    headOfRelevance[0].appendChild(img);
                    console.log("certification level is silver");
                }
                else if(businessOfRelevance.certificationLevel === "Aspiring")
                {
                    img.src = "chrome-extension://acndfmbdnajhncpamoahgnidhellckmm/icons/Aspiring.png";
                    headOfRelevance[0].appendChild(img);
                    console.log("certification level is aspiring");
                }
                else
                {
                    //this will be an option for not certified businesses
                }
            }
            else
            {
                //indicate that the business is not in the index
                console.log("did not find business");
            }
        }//closing the if
    }//closing the for
}

//does the part of refreshing the page so the icons show
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

displaySticker(businesses);
