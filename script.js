$(document).ready(function() {
    let itemCounter = 1;

    $('#add-browser').click(function() {
        console.log('Add Browser button clicked.');

        let allImagesSelected = true;
        $('.file-input').each(function() {
            if (!$(this).val()) {
                allImagesSelected = false;
            }
        });

        if (!allImagesSelected) {

            alert('First Add image for Preview then add another');
            return; 
        }

        itemCounter++;
        console.log(`Creating new item with counter: ${itemCounter}`);

        let newItemHtml = `
            <div class="browser-item" id="browser-item-${itemCounter}">
                <input type="file" class="file-input" />
                <img src="img.jpg" alt="Browser Image" class="browser-img">
                <select id="browser-select-${itemCounter}" class="browser-select">
                    <option value="primary">Primary</option>
                    <option value="secondary" selected>Secondary</option>
                </select>
                <span class="delete-btn">Remove</span>
            </div>
        `;
        
        $('#browser-list').append(newItemHtml);
        console.log('New item added to the browser list.');
    });

    $('#browser-list').on('click', '.delete-btn', function() {
        console.log('Delete button clicked.');

        let parentItem = $(this).parent();
        let isPrimary = parentItem.find('.browser-select').val() === 'primary';

        if (isPrimary) {
            alert('You cannot delete the primary browser.');
            console.log('Attempted to delete a primary browser.');
        } else {
            parentItem.remove();
            console.log('Item removed from the browser list.');
        }
    });

    $('#browser-list').on('change', '.browser-select', function() {
        console.log('Select dropdown changed.');

        if ($(this).val() === 'primary') {
            console.log('Primary selected. Changing all other selects to secondary.');
            $('.browser-select').not(this).val('secondary');
        }
    });

    $('#browser-list').on('change', '.file-input', function(event) {
        console.log('File input changed.');

        let reader = new FileReader();
        let file = event.target.files[0];
        let imgElement = $(this).siblings('.browser-img');

        reader.onload = function(e) {
            imgElement.attr('src', e.target.result);
            console.log('Image updated.');
        }

        if (file) {
            reader.readAsDataURL(file);
            console.log('Reading file as Data URL.');
        }
    });
});
