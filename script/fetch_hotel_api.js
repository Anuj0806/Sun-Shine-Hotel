// Function to display skeleton loading placeholders


function showSkeletonLoading() {
    for (let i = 0; i < 3; i++) {
        const hotelContainer = document.getElementById('hotelContainer');
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'hotel-skeleton skeleton';
        skeletonCard.innerHTML = `
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 50%;"></div>
        `;
        hotelContainer.appendChild(skeletonCard);
    }
}

const rooms = [

    {
        "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQf5JbWUQApKbde0mcDHJ-DxU3llLO1070PA&s",
        "hotel_id": 1,
        "description": "123 Main St, Cityville BEST ROOM",
        "ac_nonac": "Non AC",
        "floor": "1 Floor",
        "beds": "King Size Beds",
        "class": "Double room",
        "room_id": 1,
        "room_no": 101,
        "prize": 500,
        "pending": "UR",
        "approve": ""
    }
];

const hotels_data = [
    {
        "hotel_id": 1,
        "hotel_name": "Grand Plaza Hotel",
        "hotel_address": "123 Main St, Cityville ,Delhi",
        "hotel_mobile": 9896858587,
        "addhar_card": 1234567891234567,
        "pan_card": "ECEPA45325K"
    }
];




const rooms_local = localStorage.getItem('rooms');
let filteredRooms = rooms;

try {
    if (rooms_local) {
        const parsedData = JSON.parse(rooms_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            filteredRooms = filteredRooms.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}

let rooms_json = filteredRooms.filter(room => room.pending === "UR");

const hotel_local = localStorage.getItem('hotels_data');
let hotel_json = hotels_data;

try {
    if (hotel_local) {
        const parsedData = JSON.parse(hotel_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            hotel_json = hotel_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}



function onloadhomepage() {
    showSkeletonLoading();
    displayHotels_admin(rooms_json);

    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "ABCD HOTALS";
    });
    document.querySelectorAll(".footer_data_lic").forEach(function (element) {
        element.innerHTML = "&copy; 2023  ABCD HOTELS";
    });


}

function getHotelNameById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_name : 'Unknown Hotel';
}
function getHotelAddressById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_address : 'Unknown Hotel';
}


function apply_filter_admin() {
    const priceFilter = document.getElementById('price_filter').value;
    const addressFilter = document.getElementById('description_filter').value;
    const acFilter = document.getElementById('classInput_filter').value;
    const priceValue = priceFilter;
    const address = addressFilter || '';
    const ac = acFilter || '';
    let minPrice = 0;
    let maxPrice = Infinity;
    if (priceValue === '999') {
        maxPrice = 999;
    } else if (priceValue === '1000') {
        minPrice = 1000;
        maxPrice = 2999;
    } else if (priceValue === '3000') {
        minPrice = 3000;
        maxPrice = 4999;
    } else if (priceValue === '5000') {
        minPrice = 5000;
        maxPrice = Infinity;
    }


    const filteredHotels = rooms_json.filter(hotel => {
        const matchesPrice = hotel.prize >= minPrice && hotel.prize <= maxPrice;
        const matchesAddress = !address || getHotelAddressById(hotel.hotel_id).includes(address);
        const matchesAc = !ac || hotel.ac_nonac === ac;
        return matchesPrice && matchesAddress && matchesAc;
    });
    displayHotels_admin(filteredHotels);
}


function remove_filter_admin() {
    const priceFilter = document.getElementById('price_filter');
    const addressFilter = document.getElementById('description_filter');
    const acFilter = document.getElementById('classInput_filter');
    priceFilter.value = '';
    addressFilter.value = '';
    acFilter.value = '';
    displayHotels_admin(rooms_json);
}




function displayHotels_admin(rooms_json_data) {
    const hotelContainer = document.getElementById('hotelContainer');
    hotelContainer.innerHTML = ''; // Clear previous content  


    rooms_json_data.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card card';
        hotelCard.style = "width: 90%;margin: auto;margin-bottom: 10px;"
        // Conditionally add the delete button only if room_id is not 1
        if (hotel.room_id !== 1) {
            hotelCard.innerHTML += '<img src="' + hotel.photo + '" alt="Hotel Image" class="hotel-image" onerror="this.onerror=null; this.src=\'default-image.jpg\';">' +
                    '<div class="hotel-info">' +
                    '<h3 class="hotel-name">' + getHotelNameById(hotel.hotel_id) + '</h3>' +
                    '<p class="hotel-address">' + getHotelAddressById(hotel.hotel_id) + '</p>' +
                    '<div class="hotel-rating">' +
                    '<span class="hotel-star">' + hotel.class + '</span>' +
                    '<span class="hotel-star">' + hotel.ac_nonac + '</span>' +
                    '<br> <span class="hotel-star"><b>Room Price:</b> ' + hotel.prize + '</span>' +
                    '</div>' +
                    '<p class="hotel-price">' + hotel.description + '</p>' +
                    '<button class="hotel-button"  onclick="login_alert()">Book Room</button>' +
                    '</div>';
        } else {
            hotelCard.innerHTML += '<img src="' + hotel.photo + '" alt="Hotel Image" class="hotel-image" onerror="this.onerror=null; this.src=\'default-image.jpg\';">' +
                    '<div class="hotel-info">' +
                    '<h3 class="hotel-name">' + getHotelNameById(hotel.hotel_id) + '</h3>' +
                    '<p class="hotel-address">' + getHotelAddressById(hotel.hotel_id) + '</p>' +
                    '<div class="hotel-rating">' +
                    '<span class="hotel-star">' + hotel.class + '</span>' +
                    '<span class="hotel-star">' + hotel.ac_nonac + '</span>' +
                    '<br> <span class="hotel-star"><b>Room Price:</b> ' + hotel.prize + '</span>' +
                    '</div>' +
                    '<p class="hotel-price">' + hotel.description + '</p>' +
                    '<button class="hotel-button" >Demo Data You Can\'t Book</button>' +
                    '</div>';
            ; // Add an empty cell if no delete button is added
        }

        hotelContainer.appendChild(hotelCard);
    });
}



function onloadguestloginpage() {
    showSkeletonLoading();


    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "ABCD HOTALS";
    });
    document.querySelectorAll(".footer_data_lic").forEach(function (element) {
        element.innerHTML = "&copy; 2023  ABCD HOTELS";
    });

    displayHotels(rooms_json);
}




function apply_filter() {
    const priceFilter = document.getElementById('price_filter').value;
    const addressFilter = document.getElementById('description_filter').value;
    const acFilter = document.getElementById('classInput_filter').value;
    const priceValue = priceFilter;
    const address = addressFilter || '';
    const ac = acFilter || '';
    let minPrice = 0;
    let maxPrice = Infinity;
    if (priceValue === '999') {
        maxPrice = 999;
    } else if (priceValue === '1000') {
        minPrice = 1000;
        maxPrice = 2999;
    } else if (priceValue === '3000') {
        minPrice = 3000;
        maxPrice = 4999;
    } else if (priceValue === '5000') {
        minPrice = 5000;
        maxPrice = Infinity;
    }



    const filteredHotels = rooms_json.filter(hotel => {
        const matchesPrice = hotel.prize >= minPrice && hotel.prize <= maxPrice;
        const matchesAddress = !address || getHotelAddressById(hotel.hotel_id).includes(address);
        const matchesAc = !ac || hotel.ac_nonac === ac;
        return matchesPrice && matchesAddress && matchesAc;
    });
    displayHotels(filteredHotels);
}


function remove_filter() {
    const priceFilter = document.getElementById('price_filter');
    const addressFilter = document.getElementById('description_filter');
    const acFilter = document.getElementById('classInput_filter');
    priceFilter.value = '';
    addressFilter.value = '';
    acFilter.value = '';
    displayHotels(rooms_json);
}






function displayHotels(hotels) {

    const hotelContainer = document.getElementById('hotelContainer');
    hotelContainer.innerHTML = ''; // Clear previous content  
    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card card';
        if (hotel.room_id !== 1) {
            hotelCard.innerHTML += '<img src="' + hotel.photo + '" alt="Hotel Image" class="hotel-image" onerror="this.onerror=null; this.src=\'default-image.jpg\';">' +
                    '<div class="hotel-info">' +
                    '<h3 class="hotel-name">' + getHotelNameById(hotel.hotel_id) + '</h3>' +
                    '<p class="hotel-address">' + getHotelAddressById(hotel.hotel_id) + '</p>' +
                    '<div class="hotel-rating">' +
                    '<span class="hotel-star">' + hotel.class + '</span>' +
                    '<span class="hotel-star">' + hotel.ac_nonac + '</span>' +
                    '<br> <span class="hotel-star"><b>Room Price:</b> ' + hotel.prize + '</span>' +
                    '</div>' +
                    '<p class="hotel-price">' + hotel.description + '</p>' +
                    '<button class="hotel-button" onclick="show_vacent_room(\'' + hotel.room_id + '\')">Book Room</button>' +
                    '</div>';

        } else {
            hotelCard.innerHTML += '<img src="' + hotel.photo + '" alt="Hotel Image" class="hotel-image" onerror="this.onerror=null; this.src=\'default-image.jpg\';">' +
                    '<div class="hotel-info">' +
                    '<h3 class="hotel-name">' + getHotelNameById(hotel.hotel_id) + '</h3>' +
                    '<p class="hotel-address">' + getHotelAddressById(hotel.hotel_id) + '</p>' +
                    '<div class="hotel-rating">' +
                    '<span class="hotel-star">' + hotel.class + '</span>' +
                    '<span class="hotel-star">' + hotel.ac_nonac + '</span>' +
                    '<br> <span class="hotel-star"><b>Room Price:</b> ' + hotel.prize + '</span>' +
                    '</div>' +
                    '<p class="hotel-price">' + hotel.description + '</p>' +
                    '<button class="hotel-button" >Demo Data You Can\'t Book</button>' +
                    '</div>';
            ; // Add an empty cell if no delete button is added
        }
        hotelContainer.appendChild(hotelCard);
    });
}






function login_alert() {
    alert("To book This Please Login !");
    window.location = ("guestLogin.html#cover");
}