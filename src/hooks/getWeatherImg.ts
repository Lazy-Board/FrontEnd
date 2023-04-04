export const getWeatherImage = (weatherData:any) => {
    if (!weatherData) {
        return 'moon';
    }

    const { weatherInformation } = weatherData;

    if (weatherInformation.includes('비') || weatherInformation === '소나기') {
        return 'heavy-rain';
    } else if (weatherInformation === '맑음') {
        return 'sun';
    } else if (weatherInformation.includes('눈')) {
        return 'snow';
    } else if (weatherInformation.includes('안개')) {
        return 'haze';
    } else if (weatherInformation.includes('황사')) {
        return 'sand';
    } else if (weatherInformation.includes('흐림') || weatherInformation.includes('구름')) {
        return 'cloudy';
    } else if (weatherInformation.includes('우박')) {
        return 'hail';
    } else if (weatherInformation.includes('번개') || weatherInformation.includes('뇌우')) {
        return 'thunder';
    } else if (weatherInformation === '진눈깨비' || weatherInformation === '비 또는 눈' || weatherInformation === '비,눈') {
        return 'sleet';
    } else {
        return 'moon';
    }
}
