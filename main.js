//geocode();

// Get Location Form
var locationForm = document.getElementById('locationForm')

// listen for submit
locationForm.addEventListener('submit', geocode)
function geocode(e){
    e.preventDefault();
    // call geocode
    var location = document.getElementById('location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key:'AIzaSyCEsDIwekIAkBxE-f4zKisX8jPQoJxWgqg'
        }
    })
    .then(function(response){
        //log full response
        console.log(response)

        //formatted address
        var formattedAddress = (response.data.results[0].formatted_address);
        var formattedAddressOutput = `
            <ul class = "list-group">
                <li class = "list-group-item">${formattedAddress}</li>
            </ul>
        `;

        var addressComponents = response.data.results[0].address_components;
        var addressComponentsOutputs = '<ul class = "list-group">'

        for(var i = 0 ; i < addressComponents.length ; i++){
            addressComponentsOutputs += `
                <li class = "list-group-item">
                <strong>${addressComponents[i].types[0]}</strong>:
                ${addressComponents[i].long_name}                
                </li>
            `
        }
        addressComponentsOutputs += '</ul'

        //Geometry
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var geometryOutput = `
            <ul class = "list-group">
                <li class = "list-group-item"><strong>${lat}</strong></li>
                <li class = "list-group-item"><strong>${lng}</strong></li>
            </ul>
        `;
        //output to app
        document.getElementById('formattedAddress').innerHTML = formattedAddressOutput;
        
        document.getElementById('address-components').innerHTML = addressComponentsOutputs;
        document.getElementById('geometry').innerHTML = geometryOutput;

        
    })
    .catch(function(err){
        
    })
}