const fileInput = document.querySelector("input"),
downlaodBtn = document.querySelector("button");

downlaodBtn.addEventListener("click", e => {
    fetchFile(fileInput.value);
    downlaodBtn.innerText = "Downloading file...";
    e.preventDefault();
});

async function fetchFile(url) {
    // fetching file & returning response as blob
    await fetch(url).then(res => res.blob()).then(file => {
        // URl.createObjectURl create a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^,*[\\\/]/,'');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
        downlaodBtn.innerText = "Download File";
    }).catch(() => {
        downlaodBtn.innerText = "Download File";
        alert("Failed to download file!");
    })
}