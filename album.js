const form = document.querySelector('#tag_form');
const button = document.querySelector('#speech');

function doSearch(tags) {
    data = {'q': tags}
    sdk.searchGet(data)
    .then((res) => {
        console.log(res['data']['urls']);
        var urls = res['data']['urls'];
        if (urls == undefined)
            urls = []
       if (urls.length > 0) {
            var table = document.querySelector('.photo-table');
            while (table.firstChild) 
                table.removeChild(table.firstChild);
            for (i=0; i<urls.length; i++) {
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                var img = document.createElement('img');
                img.src = urls[i];
                td.appendChild(img);
                tr.appendChild(td);
                table.appendChild(tr);
            }
        } else {
            var table = document.querySelector('.photo-table');
            while (table.firstChild) 
                table.removeChild(table.firstChild);
            var h1 = document.createElement('h1');
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            h1.innerHTML = "No Photos Found for query " + "\'" + tags + "\'";
            td.appendChild(h1);
            tr.appendChild(td);
            table.appendChild(tr);            
        }
    })
    .catch((err) => {
        console.log(err);
    });
}


function onText(event) {
    const formData = new FormData(event.target);
    var tags = formData.get('tags');
    console.log(tags);
    doSearch(tags);
    event.preventDefault();
}

function onSpeech(event) {
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = (e) => { 
        console.log(e);
        button.style.backgroundColor = 'lightgrey';
        tags = e['results'][0][0]['transcript'];
        console.log(tags);
        doSearch(tags);
    }
    recognition.onstart = (e) => {
        button.style.backgroundColor = 'red';
    }
    recognition.start();
}

form.addEventListener('submit', onText);
button.addEventListener('click', onSpeech);