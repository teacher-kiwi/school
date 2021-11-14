import fetch from "node-fetch";

const API_KEY = "52d6b26b7077c87da340d932eb3d4d85";

const date = new Date();
const date2 = date.getTime() - 7 * 24 * 60 * 60 * 1000;
date.setTime(date2);
const Dt =
  date.getFullYear() +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  ("0" + date.getDate()).slice(-2);

const API_URL = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${API_KEY}&targetDt=${Dt}`;

const getData = () => {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((json) => json.boxOfficeResult.weeklyBoxOfficeList);
};

// https://file.cineq.co.kr/i.aspx?movieid=${element.movieCd}&size=210

const resolvers = {
  Query: {
    movies() {
      return getData();
    },
  },
};

export default resolvers;
