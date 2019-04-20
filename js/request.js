class Request {
    constructor({method, config, TOKEN}) {
        this.method = method;
        this.config = config;
        this.token = TOKEN || window.config.access_token;
    }
    createRequest(method, config, token) {
        let url = window.config.api_url + method + '?';
        for (const param in config) {
            let stringParam =`${param}=${config[param]}`;
            stringParam += '&';
            url += stringParam;
        }
        url += `access_token=${token}&`

        return url;
    }
    async request() {
        const url = this.createRequest(this.method, this.config, this.token);
        const data = new FormData();
        data.set('url', url);
        const response = await fetch('./proxy.php', {
            method: 'POST',
            body: data
        });
        return await response.json();
    }
}

window.Request = Request;