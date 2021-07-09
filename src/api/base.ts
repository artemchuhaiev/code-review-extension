import axios from 'axios'

type Headers = {
    'PRIVATE-TOKEN': string
}

class Base {
    private headers: Headers =  {
        'PRIVATE-TOKEN': '',
    }

    setToken(token: string): void {
        this.headers['PRIVATE-TOKEN'] = token
    }

    get(url: string) {
        return axios({
            method: 'get',
            url,
            headers: this.headers,
        }).then(({data})=> data);
    }
}

export default new Base()


