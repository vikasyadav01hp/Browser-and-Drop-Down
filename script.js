document.getElementById("add").addEventListener("click", function () {
    console.log("Adding new box");

    const content = document.getElementById("content");

    const newBox = document.createElement("div");
    newBox.className = "box";
    newBox.innerHTML = `
      <input type="file" accept="image/*" class="file-input">
      <select class="img-type">
        <option value="primary">Primary Image</option>
        <option value="secondary">Secondary Image</option>
      </select>
      <button class="remove btn btn-dark">Remove</button>
      <img src="" class="thumb" style="display: none;" />
    `;

    content.appendChild(newBox);
    console.log("New box added");

    newBox.querySelector(".file-input").addEventListener("change", function (event) {
        console.log("File input changed");
        showImage(event);
    });

    newBox.querySelector(".img-type").addEventListener("change", function () {
        console.log("Image type changed to:", this.value);
        typeChange(this);
    });

    setPrimary();
    console.log("Primary image set");
});

function showImage(event) {
    console.log("Showing image");

    const input = event.target;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        console.log("Image loaded");
        const thumb = input.nextElementSibling.nextElementSibling.nextElementSibling;
        thumb.src = e.target.result;
        thumb.style.display = "block";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function typeChange(select) {
    console.log("Handling image type change");
    const newType = select.value;
    
    if (newType === "primary") {
        console.log("New type is primary");
        const prevPrimary = document.querySelector(".box .img-type[value='primary']");
        if (prevPrimary && prevPrimary !== select) {
            console.log("Changing previous primary to secondary");
            prevPrimary.value = "secondary";
        }
    }

    setPrimary();
    console.log("Primary image set after type change");
}

function setPrimary() {
    console.log("Setting primary image");

    const types = document.querySelectorAll(".img-type");
    let hasPrimary = false;

    types.forEach(select => {
        if (select.value === "primary") {
            if (hasPrimary) {
                console.log("Changing duplicate primary to secondary");
                select.value = "secondary";
            } else {
                hasPrimary = true;
            }
        }
    });

    if (!hasPrimary) {
        console.log("No primary image found, setting first image as primary");
        const first = document.querySelector(".box .img-type");
        if (first) {
            first.value = "primary";
        }
    }
}

document.getElementById("content").addEventListener("change", function (event) {
    if (event.target.classList.contains("file-input")) {
        console.log("File input changed (delegated)");
        showImage(event);
    }
});

document.getElementById("content").addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        console.log("Remove button clicked");
        const box = event.target.parentElement;
        const typeSelect = box.querySelector(".img-type");
        if (typeSelect.value === "primary") {
            alert("You cannot remove the primary image.");
        } else {
            console.log("Removing box");
            box.remove();
        }
    }
});
