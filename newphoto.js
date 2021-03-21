const form = document.querySelector('#photo_form');

function doUpload(event) {
    const formData = new FormData(event.target);
    var tags = formData.get('tags');
    var file = formData.get('photo');
    //console.log(tags);
    //console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        f = reader.result.split(',')[1]
        sdk.uploadPost({}, {'x-amz-meta-customLabels':tags, 'file':f, 'name':file.name})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    };
    reader.onerror = error => {
        console.log(error);
    };
    event.preventDefault();
}


form.addEventListener('submit', doUpload);