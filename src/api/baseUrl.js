import config from '../config';

export default function getBaseUrl() {
    const mockApiUrl = `http://localhost:${config.mockApiPort}/`;
    return getQueryStringParameterByName('useMockApi') ? mockApiUrl : '/';
}

function getQueryStringParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*))|&|#|$');
    var results = regex.exec(url);

    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
