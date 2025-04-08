function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('fileLink').innerHTML = 
            `<a href="${data.fileUrl}" target="_blank">${data.fileUrl}</a>`;
    })
    .catch(err => console.error('Error uploading file:', err));
}
