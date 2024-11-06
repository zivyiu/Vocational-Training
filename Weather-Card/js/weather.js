const cardRegion = document.querySelector('.card_region')
cardRegion.innerHTML = '';
let cities = [
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'],
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣'],
    ['臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣'],
    ['臺南市', '高雄市', '屏東縣'],
    ['宜蘭縣', '花蓮縣', '臺東縣'],
    ['澎湖縣', '金門縣', '連江縣'],
];
let nowCities = cities[0];

const url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-DC5BAF3F-215E-46FC-BBA9-C65EBFB8CF6E'
let orgData = {};
fetchData();

const btnAll = document.querySelectorAll('button');

btnAll.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        console.log(btn, index);
        cardRegion.innerHTML = '';
        nowCities = cities[index];
        fetchData();
    })
})

// const taiwanAllBtn = document.querySelector('.taiwan_all_btn');
// const northAreaBtn = document.querySelector('.north_area_btn');
// const centralAreaBtn = document.querySelector('.central_area_btn');
// const southAreaBtn = document.querySelector('.south_area_btn');
// const eastAreaBtn = document.querySelector('.east_area_btn');
// const outlyingIslandsBtn = document.querySelector('.outlying_islands_btn');

// taiwanAllBtn.addEventListener('click', () => {
//     cardRegion.innerHTML = '';
//     nowCities = cities[0];
//     fetchData();
// });

// northAreaBtn.addEventListener('click', () => {
//     cardRegion.innerHTML = '';
//     nowCities = cities[1];
//     fetchData();
// });

// centralAreaBtn.addEventListener('click', () => {
//     cardRegion.innerHTML = '';
//     nowCities = cities[2];
//     fetchData();
// });

// southAreaBtn.addEventListener('click', () => {
//     cardRegion.innerHTML = '';
//     nowCities = cities[3];
//     fetchData();
// });

// eastAreaBtn.addEventListener('click', () => {
//     cardRegion.innerHTML = '';
//     nowCities = cities[4];
//     fetchData();
// });

// outlyingIslandsBtn.addEventListener('click', () => {
//     cardRegion.innerHTML = '';
//     nowCities = cities[5];
//     fetchData();
// });


// ============================================

function fetchData() {
    // fetch = 從url獲取資料
    fetch(url)
        // then = 等待回應
        .then(function (response) {
            // 回傳json格式資料
            return response.json();
        })
        // 第二個then用於接收資料放置於dataAll中
        .then(function (dataAll) {
            console.log(dataAll);
            // 整理資料
            organizationData(dataAll);
            // 顯示卡片
            arrangeCitites();
        });
};

function organizationData(dataAll) {
    const locationAll = dataAll.records.location;
    locationAll.forEach((location, index) => {
        let locationName = location.locationName;
        let startTime = location.weatherElement[0].time[0].startTime;
        let endTime = location.weatherElement[0].time[0].endTime;
        let wxName = location.weatherElement[0].time[0].parameter.parameterName;
        let wxValue = location.weatherElement[0].time[0].parameter.parameterValue;
        let pop = location.weatherElement[1].time[0].parameter.parameterName;
        let minTemp = location.weatherElement[2].time[0].parameter.parameterName;
        let ci = location.weatherElement[3].time[0].parameter.parameterName;
        let maxTemp = location.weatherElement[4].time[0].parameter.parameterName;

        orgData[locationName] = {
            'startTime': startTime,
            'endTime': endTime,
            'wxName': wxName,
            'wxValue': wxValue,
            'pop': pop,
            'minTemp': minTemp,
            'ci': ci,
            'maxTemp': maxTemp
        };
    });
}


function arrangeCitites() {
    nowCities.forEach((city) => {
        let cityData = orgData[city];
        showOneCard(city, cityData);
    });
};

function showOneCard(city, orgData_City) {
    cardRegion.innerHTML += `
        <div class="card" data-aos="zoom-out-down">
            <h2 class="animate__animated animate__bounce">${city}</h2>
            <div><span>${orgData_City.startTime}</span></div>
            <div><span>${orgData_City.endTime}</span></div>
            <br>
            <div><span>降雨機率${orgData_City.pop}%</span></div>
            <div><span>溫度${orgData_City.minTemp}℃ ~ ${orgData_City.maxTemp}℃</span></div>
            <div><span>${orgData_City.ci}</span></div>
            <div class="img_container" data-aos="zoom-in-up"><img class="wather_img" src="./img/${orgData_City.wxValue}.svg" alt=""></div>
        </div>
        `;
};