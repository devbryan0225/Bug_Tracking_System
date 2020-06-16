
function PopulateEmployees() {
    let select = document.getElementById("select-login-employee");

    getEmployeeAsync()
        .then(data =>
            data.forEach(function (item) {
                console.log(item)
                let option = CreateElement("option", "", `${item["name"]} (${item["role"]["title"]})` );
                option.value = item["employeeId"];

                select.appendChild(option);
            }))
}

window.onload = PopulateEmployees()