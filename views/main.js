
//Function that creates new bottles for manufacturer and adds them to the inventory
function createNewBottle(){
    //todo
    var BottleID = document.getElementById("bottle_id").value;
    if (BottleID.length === 0) {
        alert("Please enter some id for the bottle");
    } else {
        $.post('/createbottle', {bottleID: BottleID },
            
            /*
            //this function could be an issue. dunno what it is.
            function (data, textStatus, jqXHR) {
                window.location.href="/balance";
            },  
            */
            'json');
    }
}