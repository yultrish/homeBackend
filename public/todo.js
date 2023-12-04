window.addEventListener('load', async () => {
    console.log('todo js is working');

    // fetch request to get all items
    const result = await fetch('http://localhost:7070/todo/allItems')
    const response = await result.json()
    console.log(response);

    // create the list
    response.forEach(items => {

        const container = document.querySelector('.itemContainer');
        const itemElement = document.createElement('div')
        itemElement.classList.add('item')

        itemElement.innerHTML += `
        <div class="completed">
        <input type="checkbox" name="checkbox" id="checkbox">
        <h2>${items.item}</h2>
        </div>
        <i class="bi bi-trash delete" delete-id="${items.id}"></i>
        `

        container.appendChild(itemElement);
    });

    // creating new item
    const addItem = document.querySelector('.submit');
    addItem.addEventListener('click', async (e) => {
        e.preventDefault();

        const item = document.querySelector('input#itemInput');
        // fetch request
        const result = await fetch('http://localhost:7070/todo/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: item.value
            })
        })
        try {
            if (result.status == 200 || result.status == 201) {
                const response = await result.json();
                console.log(response);

                // create the new item
                const container = document.querySelector('.itemContainer');
                const itemElement = document.createElement('div')
                itemElement.classList.add('item')

                itemElement.innerHTML += `
                <div>
        <input type="checkbox" name="checkbox" id="checkbox">
        <h2>${response.item}</h2>
        </div>
        <i class="bi bi-trash delete"></i>
        `
                container.appendChild(itemElement);
                item.value = "";
                // automatically refresh the page 
                window.location.href = './todo.html';

            }
        }
        catch (err) {
            console.error(err);
        }

    });

    //delete item
    const deleteBtn = document.querySelectorAll('.delete');

    deleteBtn.forEach(deleteItem => {
        deleteItem.addEventListener('click', async (e) => {
            e.preventDefault();

            const itemId = deleteItem.getAttribute('delete-id');
            console.log(itemId);

            try {
                let confirmed = confirm(`Are you sure you want to delete item ${itemId}?`);

                if (confirmed === true) {
                    const result = await fetch(`http://localhost:7070/todo/item/${itemId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const response = await result.json();
                    console.log(response.status);

                    if (result.status === 200 || result.status === 201) {
                        console.log("Deleted successfully");

                        const removeItem = deleteItem.parentElement;
                        removeItem.classList.add('remove-deleted');
                        removeItem.addEventListener('transitionend', () => {
                            removeItem.remove();
                        })
                    }
                    return true;
                }
            } catch (err) {
                console.error(err);
            }
        })
    });

    // check completed items 
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const itemText = checkbox.parentElement.querySelector('h2');
            if (checkbox.checked) {
                itemText.style.textDecoration = 'line-through';
                itemText.style.color = 'rgba(255, 255, 255, 0.7)';          
            } else {
                itemText.style.textDecoration = 'none';
                itemText.style.color = '#fff';          
            }
        });
    });




});