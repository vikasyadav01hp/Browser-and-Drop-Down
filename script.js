document.getElementById("add").addEventListener("click", function () {
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

    // Handle remove button click
    newBox.querySelector(".remove").addEventListener("click", function () {
        const typeSelect = newBox.querySelector(".img-type");
        if (typeSelect.value === "primary") {
            alert("You cannot remove the primary image.");
        } else {
            content.removeChild(newBox);
            setPrimary();
        }
    });

    // Handle file input change
    newBox.querySelector(".file-input").addEventListener("change", function (event) {
        showImage(event);
    });

    // Handle image type change
    newBox.querySelector(".img-type").addEventListener("change", function () {
        typeChange(this);
    });

    setPrimary();
});

// Function to display the selected image
function showImage(event) {
    const input = event.target;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const thumb = input.nextElementSibling.nextElementSibling.nextElementSibling;
        thumb.src = e.target.result;
        thumb.style.display = "block";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to handle changing image types
function typeChange(select) {
    const newType = select.value;

    if (newType === "primary") {
        const prevPrimary = document.querySelector(".box .img-type[value='primary']");
        if (prevPrimary && prevPrimary !== select) {
            prevPrimary.value = "secondary";
        }
    }

    setPrimary();
}

// Ensure only one primary image is selected
function setPrimary() {
    const types = document.querySelectorAll(".img-type");
    let hasPrimary = false;

    types.forEach(select => {
        if (select.value === "primary") {
            if (hasPrimary) {
                select.value = "secondary";
            } else {
                hasPrimary = true;
            }
        }
    });

    if (!hasPrimary) {
        const first = document.querySelector(".box .img-type");
        if (first) {
            first.value = "primary";
        }
    }
}

// Use event delegation to handle changes for all file inputs
document.getElementById("content").addEventListener("change", function (event) {
    if (event.target.classList.contains("file-input")) {
        showImage(event);
    }
});

// Use event delegation to handle clicks for all remove buttons
document.getElementById("content").addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        const box = event.target.parentElement;
        const typeSelect = box.querySelector(".img-type");
        if (typeSelect.value === "primary") {
            alert("You cannot remove the primary image.");
        } else {
            box.remove();
            setPrimary();
        }
    }
});
