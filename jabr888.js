function getVersion() {
    const fetchPromise = fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/Version");
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((version) => document.getElementById("Version").innerHTML = version);
}

function getIcon() {
    const fetchPromise = fetch('https://cws.auckland.ac.nz/Qz2021JGC/api/PersonIcon');
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((data) => {document.getElementById("person_id").innerHTML = data;});
}

function getStatMan() {
    const fetchPromise = fetch('https://cws.auckland.ac.nz/Qz2021JGC/api/Statistician');
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => print_stat(data));
    streamPromise.then((data) => get_vcard(data));
}

function print_stat(data){
    let htmlString = ``
    htmlString += `<img width="20%" src="https://unidirectory.auckland.ac.nz/people/imageraw/${data.upi}/${data.imageId}/biggest"> <br> `
    document.getElementById("vcard").innerHTML = htmlString;
}

function getCaseCount() {
    const fetchPromise = fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/CaseCounts");
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((cases) => print_ten(cases));
}

function print_ten(data) {
    var case_list = '';
    var values = [];
    var keys = [];

    for (var x in data){
        values.push(`${data[x]}`);
        keys.push(`${x}`);
        case_list += `${x} ${data[x]} <br>`;
    }

    line_graph(values);
    document.getElementById("cases_c").innerHTML = case_list;
    values_list = values.slice(-10); keys_list = keys.slice(-10);

    let person_icon = `<svg height="25" width="20"><use href='#person'/></svg>`;
    html_ten_info = ``;

    j = 0
    values_list.forEach(element =>{
        var rounded = Math.floor(element/10);
        html_ten_info += `${keys_list[j]}`;
        j+=1;
        for(let i = 0; i < element; i++){
            html_ten_info += person_icon;
        }
        html_ten_info += `<br>`
    });

    document.getElementById("show_ten").innerHTML = `<div>${html_ten_info}</div>`;
    
}


function line_graph(values){
    htmlString = `<svg viewBox="0 0 500 100" class="chart"><polyline fill="none" stroke="#0074d9" stroke-width="3" points="`
    i = 1;
    values.forEach(element =>{
        element = 100-element;
        htmlString += `${i},${element} `
        i+= 1;
    });
    htmlString += `"/></svg>`
    document.getElementById("line").innerHTML = htmlString;
}

function get_vcard(data){
    const options = {
        method: 'GET',
        mode: 'no-cors'
      };
    const fetchPromise = fetch(`https://unidirectory.auckland.ac.nz/people/vcard/${data.upi}`,options);
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((vcard) => document.getElementById("info").innerHTML = vcard);
}


getIcon();
getVersion();
getCaseCount();
getStatMan();
