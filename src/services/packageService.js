import http from './httpService';

const apiEndpoint = '/packages'

function packageURL(packageName){
    return `${apiEndpoint}/${packageName ? packageName : ''}`;
}

export function getPackages(){
    return http.get(packageURL());
}

export function getPackage(packageName){
    return http.get(packageURL(packageName));
}