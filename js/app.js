if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', {scope: './'})
        .then((registration) => {
            console.log('Service worker was registered');
        })
        .catch((err)=> {
            console.log('Service worker failed to register', err);
        }
    );

    function get (url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var result = 'http://i.imgur.com/J9fGJuo.jpg';
                        resolve(result);
                    } else {
                        reject(xhr.err);
                    }
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        });
    }
}

get('http://i.imgur.com/fHyEMsl.jpg')
    .then((response) => {
        console.log('Success!');
        document.getElementById('targetImg').crossOrigin = 'Anonymous';
        document.getElementById('targetImg').src = response;
    })
    .catch((err) => {
        console.log('Error', err);
    }
);