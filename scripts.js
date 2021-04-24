
//APOD API begins
fetch('https://api.nasa.gov/planetary/apod?api_key=7RpwmTsiC3mN4SHtN2rM6KksYK9op8DflUQcfapR', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then(res => res.json())
    .then(data => {
        console.log(data);
        if(data['media_type']=='image')
        {
            let bgImage;
            if(data['hdurl']!=null)
                bgImage = data['hdurl'];
            else
                bgImage = data['url'];
            document.body.style.background = 'url(' + bgImage + ')';
        }
    })
    .catch(err => console.error('Error:', err));


//retrieve settings from local storage
let getSettings = JSON.parse(localStorage.getItem('settings'));
if(getSettings!=null) {
    document.myForm.hours[getSettings['hours']].checked = true;
    document.myForm.seconds[getSettings['seconds']].checked = true;
    document.myForm.dates[getSettings['dates']].checked = true;
}
//retrieval ends

//settings begins
document.getElementById('sidebar').onclick = function (e) {
	e.preventDefault();
	document.getElementById("mySidebar").style.width = "300px";
}

document.getElementById('close').onclick = function (e) {
	e.preventDefault();
	document.getElementById("mySidebar").style.width = "0";
}
//settings ends

//more options begins
document.getElementById('more').onclick = function (e) {
	e.preventDefault();

	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    let weekOfYear = Math.round(((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 604800000) + 1);

    document.getElementById("weekDay").innerHTML = days[new Date().getDay()]; //day of week
    document.getElementById("monthDay").innerHTML = new Date().getDate(); //day of month
    document.getElementById("yearDay").innerHTML = dayOfYear; //day of month
    document.getElementById("weekYear").innerHTML = weekOfYear; //day of month

	document.getElementById("myMorebar").style.height = "300px";
}

function dayOfTheYear(date) {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}

document.getElementById('moreClose').onclick = function (e) {
	e.preventDefault();
	document.getElementById("myMorebar").style.height = "0";
}
//more options ends

//settings data retrieval
document.getElementById('myFormButton').onclick = function (e) {
	e.preventDefault();
	let hours = document.querySelector('input[name="hours"]:checked').value;
	let seconds = document.querySelector('input[name="seconds"]:checked').value;
	let dates = document.querySelector('input[name="dates"]:checked').value;
	console.log(hours + '-' + seconds + '-' + dates);

	//save settings to local storage
	let settings = {'hours': hours, 'seconds': seconds, 'dates': dates};
	localStorage.setItem('settings', JSON.stringify(settings));
	clock();
	//close settings
	document.getElementById("mySidebar").style.width = "0";
}

clock();
function clock() {
	let getSettings = JSON.parse(localStorage.getItem('settings'));
	let date = new Date();
	// console.log(date);
	let time;
	let h = date.getHours(); // 0 - 23
	let m = date.getMinutes(); // 0 - 59
	let s = date.getSeconds(); // 0 - 59

	if((h>=0)&&(h<12))
		document.getElementById('greetings').innerText="Good Morning";
	else if((h>=12)&&(h<17))
		document.getElementById('greetings').innerText="Good Afternoon";
    else if((h>=17)&&(h<20))
        document.getElementById('greetings').innerText="Good Evening";
	else
		document.getElementById('greetings').innerText="Good Night";
    if(getSettings!=null) {
        if (getSettings['hours'] == 0) //24 hour clock
        {
            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            if (getSettings['seconds'] == 0) //show seconds
            {
                time = h + ":" + m + ":" + s;
            } else
                time = h + ":" + m;
        } else //12 hour clock
        {
            let session = "AM";

            if (h == 0) {
                h = 12;
            }

            if (h > 12) {
                h = h - 12;
                session = "PM";
            }

            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            if (getSettings['seconds'] == 0) //show seconds
            {
                time = h + ":" + m + ":" + s + "<span class='session'>" + session + "</span>";
            } else
                time = h + ":" + m + "<span class='session'>" + session + "</span>";
        }

        if (getSettings['dates'] == 0) {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            time += "<div class='date'>" + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + "</div>";
        }
    }
    else
    {
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        time = h + ":" + m + ":" + s + "<div class='date'>" + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + "</div>";
    }
	// console.log(date);
	document.getElementById('clock').innerHTML=time;

}
window.setInterval(clock,[1000]);