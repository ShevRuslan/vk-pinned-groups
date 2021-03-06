import data from '../config';
export default class Request {
    constructor() {
        this.token = data.access_token;
    }
    createRequest(method, config, token) {
        let url = data.api_url + method + '?';
        for (const param in config) {
            let stringParam =`${param}=${config[param]}`;
            stringParam += '&';
            url += stringParam;
        }
        url += `access_token=${token}&`

        return url;
    }
    async request({method, config}) {
        const url = this.createRequest(method, config, this.token);
        const data = new FormData();
        data.set('url', url);
        let response = null;
        try {
            response = await fetch(url, {
                method: 'GET',
            });  
        }
        catch (error) {
            response = await fetch('./proxy.php', {
                method: 'POST',
                body: data
            });   
        }
        return await response.json();
    }
}
