
const arrow = document.querySelector('.arrow');
const qiblaDirection = document.querySelector('.qibla-direction');

function calculateQibla(lat, lon) {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const y = Math.sin(toRadians(kaabaLon - lon));
    const x = Math.cos(toRadians(lat)) * Math.tan(toRadians(kaabaLat)) - Math.sin(toRadians(lat)) * Math.cos(toRadians(kaabaLon - lon));
    let angle = toDegrees(Math.atan2(y, x));
    angle = (angle + 360) % 360;
    return angle;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const qiblaAngle = calculateQibla(latitude, longitude);
            qiblaDirection.textContent = `Qibla: ${qiblaAngle.toFixed(2)}°`;

            window.addEventListener('deviceorientation', event => {
                const alpha = event.alpha;
                const finalAngle = qiblaAngle - alpha;
                arrow.style.transform = `rotate(${finalAngle}deg)`;
            });
        }, error => {
            qiblaDirection.textContent = 'Could not get location';
            console.error(error);
        });
    } else {
        qiblaDirection.textContent = 'Geolocation not supported';
    }
}

getLocation();
