window.addEventListener('load', async () => {
    console.log('variable.js is working');

    // fetch request to get all employees
    const result = await fetch('http://localhost:7070/api/employees')
    const response = await result.json();
    console.log(response);

    // create the employee table
    const tbody = document.querySelector('tbody');
    let tContents = '';

    response.forEach(employee => {
        tContents += `
    <tr>
    <td scope="row">${employee.name}</td>
    <td>${employee.email}</td>
    <td>${employee.job_title}</td>
    <td>
        <div class="action">
            <span class="material-symbols-outlined edit" edit-id="${employee.id}">
                edit
            </span>
            <span class="material-symbols-outlined delete" delete-id="${employee.id}">
                delete
            </span>
        </div>
    </td>
</tr>
    `;
        tbody.innerHTML = tContents;
    });

    // button to create employee in the modal
    const createEmployee = document.querySelector("button.submitBtn");
    createEmployee.style.display = 'block';

    createEmployee.addEventListener('click', async (e) => {
        e.preventDefault();

        // checks the input values
        const name = document.querySelector('input#nameInput').value;
        const email = document.querySelector('input#emailInput').value;
        const job_title = document.querySelector('input#jobInput').value;
        const error = document.querySelector('form .error');
        const message = document.querySelector('form .error .error-message');

        // checks for empty inputs
        if (email == '' || email == null || name == '' || name == null || job_title == '' || job_title == null) {
            const modal = document.querySelector('div.modal');
            // creates a new modal instance
            const modalObj = new bootstrap.Modal(modal);
            const button = document.querySelector('.editButton');

            error.style.display = 'block';
            message.textContent = 'Please fill all fields';
            modalObj.show();
            button.style.display = 'none';

            // remove error message after 3 seconds
            setTimeout(() => {
                error.style.display = 'none';
            }, 3000);
            return;
        } else {
            const confirmed = confirm('Are you sure you want to create a new employee?');

            if (confirmed) {
                // post request to create employee
                const result = await fetch('http://localhost:7070/api/employee', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        job_title: job_title
                    })
                })

                //check http status
                if (result.status != 201) {
                    const response = await result.json();

                    error.style.display = 'block';
                    message.textContent = response.message;
                    // remove error message after 3 seconds
                    setTimeout(() => {
                        error.style.display = 'none';
                    }, 3000);

                    return;
                }
                if (result.status == 201) {
                    const response = await result.json();
                    console.log(response);

                    // create the employee table
                    const tbody = document.querySelector('tbody');
                    let tContents = '';

                    tContents += `
<tr>
<td scope="row">${name}</td>
<td>${email}</td>
<td>${job_title}</td>
<td>
<div class="action">
<span class="material-symbols-outlined edit">
  edit
</span>
<span class="material-symbols-outlined delete">
  delete
</span>
</div>
</td>
</tr>
`;
                    tbody.innerHTML = tContents;

                    // automatically refresh the page 
                    window.location.href = window.location.href;
                }
            }

        }

    });

    // edit icon event listener 
    const editBtns = document.querySelectorAll('.edit');

    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', async () => {

            const employeeId = editBtn.getAttribute('edit-id');

            const modal = document.querySelector('.modal');
            // create a new modal instance
            const modalObj = new bootstrap.Modal(modal);

            // create employee button
            const createEmployee = document.querySelector("button.submitBtn");
            createEmployee.style.display = 'none';
            // update employee button
            const updateEmployee = document.querySelector('button.editButton');
            updateEmployee.style.display = 'block';

            // fetch request to get a single employee by id
            try {
                const result = await fetch(`http://localhost:7070/api/employee/${employeeId}`);
                const response = await result.json();
                console.log(response);
                modalObj.show();
                document.querySelector('#nameInput').value = response.name;
                document.querySelector('#emailInput').value = response.email;
                document.querySelector('#jobInput').value = response.job_title;
                document.querySelector('div.d-none').id = response.id;

            } catch (error) {
                console.error(error);
            }
        });
    });

    // update employee
    const updateEmployee = document.querySelector('button.editButton');

    updateEmployee.addEventListener('click', async (e) => {
        e.preventDefault();

        let name = document.querySelector('#nameInput').value;
        let email = document.querySelector('#emailInput').value;
        let job_title = document.querySelector('#jobInput').value;
        let employee = document.querySelector('div.d-none').id; //set id to employee such that employee reference will pull the id

        const confirmation = confirm('Are you sure you want to update employee' + " " + employee)

        // fetch request to update employee
        if (confirmation) {
            const result = await fetch(`http://localhost:7070/api/employee/${employee}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    job_title: job_title
                })
            })
            if (result.status == 200 || result.status == 201) {
                // this redirects to the same page with the updated changed
                window.location.href = "./dashboard.html";
            }
        }
    })

    // delete employee 
    const deleteBtns = document.querySelectorAll('.delete');

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async (e) => {
            const employeeId = deleteBtn.getAttribute('delete-id');
            console.log(employeeId);

            try {

                let confirmed = confirm(`Are you sure you want to delete employee ${employeeId}`);

                // fetch request to delete employee
                if (confirmed === true) {
                    const result = await fetch(`http://localhost:7070/api/employee/${employeeId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const response = await result.json();
                    console.log(response.status)
                    if (result.status === 200 || result.status === 201) {
                        console.log("Deleted successfully");

                        // transition
                        const usr = e.target.parentElement.parentElement;
                        const user = usr.parentElement;
                        user.classList.add('remove-deleted');
                        user.addEventListener('transitionend', () => {
                            user.remove();
                        })

                        // window.location.href = "./dashboard.html";

                    }
                    return true;
                }

            } catch (error) {
                console.error(error);
            }
        });
    });

    const switched = document.querySelector('.content .header .switch');

    switched.addEventListener('click', function (e) {
        e.preventDefault();

        document.body.classList.toggle('theme-dark');
    });

    setInterval(() => {
        const width = window.innerWidth;
        if (width <= 480) {
            console.log('width is less than 480');
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.add('sidebar-short');
        }
    }, 4000);

    const showBtn = document.querySelector('.show span');
    const sidebar = document.querySelector('.sidebar');

    showBtn.addEventListener('click', function (e) {
        e.preventDefault();
        sidebar.classList.remove('sidebar-short');
        sidebar.classList.toggle('sidebar-full');
    });



    // logout
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", async (e) => {
        e.preventDefault();
        const confirmed = confirm("are u sure u want to logout");


        //if true then logout user 
        if (confirmed == true) {

            window.location.href = "index.html";
        }
    });



});