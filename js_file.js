
document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.querySelector('.calendar_container');
    let colorCount = 0
    let normalDayCount = 0
    let coloredArr = [];
    let allDayArr = [];
    calendarContainer.addEventListener("mouseover", function(event) {
        // console.log(event.target.textContent)
        if (!event.target.classList.contains("calendar")){
            if (event.target.classList.contains("colored") && (!coloredArr.includes(event.target.textContent))) {
                colorCount += 1
                coloredArr.push(event.target.textContent)
            }
            if (!event.target.classList.contains("colored") && event.target.classList.contains("day") && (!allDayArr.includes(event.target.textContent))) {
                normalDayCount += 1
                allDayArr.push(event.target.textContent)
            }
            handleMouseOver(event, colorCount, normalDayCount);
            console.log(coloredArr, allDayArr)
        }
    });
    function handleMouseOver (event, colorCount, normalDayCount) {
        console.log(event.target.textContent, colorCount, normalDayCount)
        // const monthDetails = document.createElement('div');

    }
})


function init() {
    const colorArr = ['greenyellow', 'red', 'black']
    const allEmployeeInfo = document.querySelectorAll('.employee_info')

    for (let i = 0; i < allEmployeeInfo.length; i++) {
        allEmployeeInfo[i].style.backgroundColor = colorArr[i]
    }
    // commonWorkingDays()
}


function generateCalendar(startDate, endDate) {

    const calendarContainer = document.querySelector('.calendar_container');
    calendarContainer.innerHTML = '';

    // const startMonth = startDate.getMonth();
    // const endMonth = endDate.getMonth();

    // let currentDate = new Date(startDate);
    
    let weekCount = (startDate.getDay() >= 3 && startDate.getDay() <= 6) ? 1 : 0

    var monthCount = 0
    var firstMonth = true;
    while (startDate <= endDate) {
        const firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        // console.log(startingDay)
        // console.log(daysInMonth)

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[firstDay.getMonth()];

        const monthContainer = document.createElement('div');
        monthContainer.classList.add('calendar');

        const monthHeader = document.createElement('div');
        monthHeader.classList.add('month');
        monthHeader.textContent = monthName + ' ' + startDate.getFullYear();

        const daysContainer = document.createElement('div');
        daysContainer.classList.add('days');

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let dayNameHtml = '';
        for (let i = 0; i < 7; i++) {
            dayNameHtml += '<div class="day">' + dayNames[i] + '</div>';
        }
        daysContainer.innerHTML += dayNameHtml;
        // console.log(daysContainer.innerHTML)

        const employee = document.querySelector('#select_employee')
        // console.log(employee);
        
        let days = '';
        for (let i = 0; i < startingDay; i++) {
            days += '<div class="day"></div>';
        }
        for (let i = 1; i <= daysInMonth; i++) {
            if (i < startDate.getDate() && firstMonth){
                    days += '<div class="day weekend">' + i + '</div>';
            }else {
                if (new Date(firstDay.getFullYear(), firstDay.getMonth(), i) <= endDate) {
                    const dayOfWeek = new Date(startDate.getFullYear(), startDate.getMonth(), i).getDay();
                    // console.log(dayOfWeek)
                    if (employee.value === 'A' && dayOfWeek !== 0 && dayOfWeek !== 6) {
                        days += '<div class="day employee-A colored">' + i + '</div>';
                    }
                    else if (employee.value === 'B') {
                        if ((dayOfWeek === 1 || dayOfWeek === 2) && (weekCount % 2 === 0)) {
                            days += '<div class="day employee-B working-day colored">' + i + '</div>';
                        } else if ((dayOfWeek === 4 || dayOfWeek === 5) && (weekCount % 2 !== 0)) {
                            days += '<div class="day employee-B working-day colored">' + i + '</div>';
                        } else {
                            days += '<div class="day weekend">' + i + '</div>';
                        }
                    }
                    else if (employee.value === 'All') {
                        const arr = WorkingDaysOfEmployees();
                        const commonDays = commonWorkingDays(arr);
                        // const commonDays = Array.from(new Set(commonWorkingDaysObject))
                        console.log(commonDays);
                        if ((dayOfWeek === 1 || dayOfWeek === 2) && (commonDays.includes(String(dayOfWeek))) && ((weekCount % 2) === 0)) {
                            days += '<div class="day weekend colored" style="background-color: black; color:white;">' + i + '</div>';
                        }
                        else if ((dayOfWeek === 4 || dayOfWeek === 5) && (commonDays.includes(String(dayOfWeek))) && ((weekCount % 2) !== 0)) {
                            days += '<div class="day weekend colored" style="background-color: black; color:white;">' + i + '</div>';
                        }
                        else if(commonDays.includes(String(dayOfWeek)) && (dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 6)) {
                            days += '<div class="day weekend colored" style="background-color: black; color:white;">' + i + '</div>';
                        }
                        else {
                            days += '<div class="day weekend">' + i + '</div>';
                        }
                    }
                    else if (employee.value !== 'A' && employee.value !== 'B' && employee.value !== 'All') {
                        // console.log(employee)
                        const employeeWorkingDays = localStorage.getItem(employee.value)
                        if (employeeWorkingDays !== null) {
                            const employeeWorkingDaysArray = employeeWorkingDays.split(',')
                            // console.log(employeeWorkingDaysArray);
                            // console.log(employeeWorkingDaysArray.includes(String(dayOfWeek)), dayOfWeek)
                            if (employeeWorkingDaysArray.includes(String(dayOfWeek))) {
                                // console.log(true, dayOfWeek)
                                days += `<div class="day weekend colored" style='background-color:${employee.value}'>` + i + '</div>';
                                // console.log(localStorage.key(employee.value))
                            } else {
                                days += '<div class="day weekend">' + i + '</div>';
                            }
                        }
                    }
                    else {
                        days += '<div class="day weekend">' + i + '</div>';
                    }
                    if (dayOfWeek === 6) {
                        weekCount++;
                    }
                }
                else {
                    days += '<div class="day weekend">' + i + '</div>';
                }
            }
        }
        firstMonth = false;
        daysContainer.innerHTML += days;
        // console.log(daysContainer.innerHTML)

        monthContainer.appendChild(monthHeader);
        monthContainer.appendChild(daysContainer);
        calendarContainer.appendChild(monthContainer);

        startDate.setMonth(startDate.getMonth() + 1);
        startDate.setDate(1)

        setTimeout(() => {
            monthContainer.classList.add('show');
        }, 200 * monthCount);

        monthCount += 1
    }
}


function WorkingDaysOfEmployees () {
    const employees = document.querySelector('#select_employee').children
    const arr = [];
    for (let i = 1; i < employees.length; i++) {
        if (employees[i].innerText !== 'All employee') {
            // console.log(employees[i].innerText)
            if (employees[i].innerText === 'employee A') {
                arr.push(['1','2','3','4','5'])
            }
            else if (employees[i].innerText === 'employee B') {
                arr.push(['1','2','4','5'])
            }
            else {
                const employeeDays = localStorage.getItem(employees[i].value)
                const Days = employeeDays.split(',')
                // console.log(Days)
                arr.push(Days)
            }
        }
    }
    return arr;
}

function commonWorkingDays(arrays) {
    if (!arrays || arrays.length === 0) {
        return [];
    }
    function isInAllArrays(element) {
        return arrays.every(array => array.includes(element));
    }
    // console.log(arrays.flat().filter(isInAllArrays))
    const commonWorkingDaysObject =  arrays.flat().filter(isInAllArrays);

    return Array.from(new Set(commonWorkingDaysObject))
}


function getdata() {
    const startDate = new Date(document.getElementById('start_date').value);
    const endDate = new Date(document.getElementById('end_date').value);
    // console.log(startDate.getDate())

    if (startDate && endDate) {
        generateCalendar(startDate, endDate);
    } else {
        alert("Please select both start and end dates.");
    }
}


function addEmployee () {
    document.querySelector('.new_employee_container').style.display = 'block';
};


function Calender_Info () {
    const CalenderInfo = document.querySelector('.calender_info');
    // const no_of_employees = document.querySelector('#select_employee')

    const newEmployeeColor = document.querySelector('.new_employee_color')

    // const lastEmployee = no_of_employees.children.length
    const getNewEmployee = document.querySelector('.new_employee_input')

    const allEmployeeInfo = document.querySelectorAll('.employee_info')
    // const allEmployeeArray = Array.from(allEmployeeInfo);
    let uniqueColor = true;
    for (let i = 0; i < allEmployeeInfo.length; i++) {
        console.log(allEmployeeInfo[i].style.backgroundColor);
        if (allEmployeeInfo[i].style.backgroundColor === newEmployeeColor.value) {
            uniqueColor = false
            break
        }
    }
    if (uniqueColor) {
        const employee_Info = document.createElement('div');
        employee_Info.classList.add('employee_info')
        
        employee_Info.style.backgroundColor = newEmployeeColor.value;

        const employee_Name = document.createElement('span');
        employee_Name.classList.add('employee_name')

        employee_Name.innerText = getNewEmployee.value

        CalenderInfo.appendChild(employee_Info);
        CalenderInfo.appendChild(employee_Name);
        newEmployeeColor.value = ''

        return true;
    }
    else {
        alert('This color is already taken')
        uniqueColor = true
        newEmployeeColor.value = ''
        getNewEmployee.value = ''

        return false;
    }
}


function saveEmployee () {
    const getNewEmployee = document.querySelector('.new_employee_input')
    const newEmployeeColor = document.querySelector('.new_employee_color')
    const employees = document.querySelector('#select_employee');

    const newEmployeeOption = document.createElement('option');
    newEmployeeOption.innerText = getNewEmployee.value
    newEmployeeOption.value = newEmployeeColor.value
    // console.log(newEmployeeOption.value)
    
    const validEmployee = Calender_Info()
    console.log(validEmployee)
    
    if (validEmployee) {
        employees.appendChild(newEmployeeOption);
        getNewEmployee.value = ''

        const selectWorkingDays = document.querySelector('.select_working_days')
        // console.log(selectWorkingDays)
        const arr = [];
        for (let i = 1; i < selectWorkingDays.children.length; i+=2) {
            // console.log(selectWorkingDays.children[i].checked)
            if (selectWorkingDays.children[i].checked) {
                arr.push(Number(selectWorkingDays.children[i].value))
            }
        }
        // console.log(arr)
        localStorage.setItem(employees.children[employees.children.length - 1].value, arr)
    }
    const allCheckbox = document.querySelectorAll("input[type='checkbox']");
    allCheckbox.forEach((checkbox) => checkbox.checked = false)
    document.querySelector('.new_employee_container').style.display = 'none';
}

