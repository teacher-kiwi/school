"use strict";

import fetch from "node-fetch";

const API_KEY = "%2BbSXvwqJRtuxb65I%2F5zQm8YJAWhZ0%2B9COa9kXP5hvnYXboy2J9%2FWje4ZClkotu7Zx648r2IqZ%2BADnze4OocxRw%3D%3D"
const API_URL = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&stationName=부발읍&dataTerm=DAILY&ver=1.3`

export const getData = () => {
    return fetch(`${API_URL}`)
        .then(res => res.json())
        .then(json => json.response.body.items);
};