window.addEventListener('load', async()=>{
    console.log('add.js is working')
    
const uploadButton = document.querySelector("input[type=file]");

let uploadedFilename;

uploadButton.addEventListener("change", async (event) => {
    try {
        alert("attempting to upload an image file");
        let fileImage = event.target.files[0];
        if (!fileImage) {
            return alert("no file selected");
        }

        const formData = new FormData();
        formData.append("file", fileImage);
        let server = await fetch('http://localhost:7070/store-image', {
            method: 'POST',
            headers: {
                Accept: "application/json", // Adjust the content type as needed
            },
            body: formData,
        });

        if (server.ok) {
            const response = await server.json();
            console.log(response);
            // Store the filename in the variable
            uploadedFilename = response.filename;
        } else {
            console.error('Server returned an error:', server.status);
            // Handle the error appropriately
        }
    } catch (err) {
        console.log(err);
    }
});

const addBtn = document.querySelector('.addProduct');
addBtn.addEventListener('click', async () => {
    try {
        // Get product details from input fields
        const name = document.querySelector('input#productName').value;
        const description = document.querySelector('input#description').value;
        const stock = document.querySelector('input#stock').value;
        const price = document.querySelector('input#price').value;

        // Check if any of the fields are empty
        if (!name || !description || !stock || !price) {
            alert('Please fill in all the fields');
            return;
        }

        // Fetch request to submit product details
      const result = await fetch('http://localhost:7090/product-upload', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: name,
        description: description,
        stock: stock,
        price: price,
        filename: uploadedFilename, // Use the uploaded filename obtained earlier
    }),
});
console.log(result)

if (result.ok) {
    const res = await result.json();
    console.log(res);
        // Display success alert
    alert("Image uploaded successfully!");
    
    // Redirect to dashboard.html
    window.location.href = './dashboard.html';
    
} else {
    console.error('Server returned an error:', result.status);
    // Handle the error appropriately
}

    } catch (err) {
        console.log(err);
    }

    window.location.href = './shoppind.html'
});



    // logout
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", async (e) => {
        e.preventDefault();
        const confirmed = confirm("are u sure u want to logout");


        //if true then logout user 
        if(confirmed == true){
            window.location.href = "index.html";
            /*
            let token = localStorage.getItem('tokenKey');
            console.log(token)
            if(token != ""){
                
                const result = await fetch('http://localhost:5151/api/logout', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode : 'cors'
                 })

            if(result.status == 200){

                localStorage.removeItem('tokenKey');
                
            }
        } */
        
    }
        // return;
    });
})