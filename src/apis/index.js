const DOMAIN = process.env.REACT_APP_API_HOST || 'https://api-staging.hitalentech.com:8443'; // local 3000
const BASE_URL = `${DOMAIN}/apnpublic/api/v1`; // 你的API基础URL
const authRequest = {
    send_BASE_URL(endPoint, config) {
        const url = BASE_URL + endPoint;
        return _sendRequest(url, config, _handleResponseToJson);
    },
    send_BASE_URLText(endPoint, config) {
        const url = BASE_URL + endPoint;
        return _sendRequest(url, config, _handleResponseToText);
    },
    
};

const _sendRequest = (url, config, handleResponse) => {
    return Promise.resolve('')
        .then(() => fetch(url, config))
        .then(handleResponse)
        .catch((err) => {
            throw err.error || err;
        });
};

// 文字类型
function _handleResponseToText(response) {
    if (response && !response.ok) {
        return response.text().then(
            (text) =>
                Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    message: text,
                }),
            () =>
                Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                })
        );
    }
    return response.text().then(
        (text) => ({ message: text }),
        () => 'OK'
    );
}

//文件类型
function _handleResponseToBlob(response) {
    if (response && !response.ok) {
        if (response.status >= 500) {
            throw {
                status: response.status,
                statusText: response.statusText,
            };
        }

        if (response.status >= 400) {
            return response.json().then(
                (data) => {
                    data.status = response.status;
                    data.statusText = response.statusText;
                    return Promise.reject(data);
                },
                () =>
                    Promise.reject({
                        status: response.status,
                        statusText: response.statusText,
                    })
            );
        }
    }
    let headers = response.headers;
    return response.blob().then(
        (blob) => ({ response: blob, headers: headers }),
        () => 'OK'
    );
}
//Json类型
export const _handleResponseToJson = (response) => {
    if (response && !response.ok) {
        // 409 冲突：授权登录过期，自动刷新页面
        if (response.status === 409) {
            return response.json().then(
                (data) => {
                    if (data?.code === 'IMPERSONATION_EXPIRED_SWITCHED_BACK') {
                        // 授权登录过期，自动刷新页面
                        window.location.reload();
                    }
                    return Promise.reject({
                        status: 409,
                        statusText: 'Conflict',
                        ...data,
                    });
                },
                () =>
                    Promise.reject({
                        status: 409,
                        statusText: 'Conflict',
                    })
            );
        }
        if (response.status >= 500) {
            throw {
                status: response.status,
                statusText: response.statusText,
                endpoint: new URL(response.url).pathname,
            };
        }
        if (response.status >= 400 && response.status !== 429) {
            return response.json().then(
                (data) => {
                    data.status = response.status;
                    data.statusText = response.statusText;
                    return Promise.reject(data);
                },
                () =>
                    Promise.reject({
                        status: response.status,
                        statusText: response.statusText,
                    })
            );
        }
    }
    if (response.status === 429) {
        return response.json().then(
            (data) => {
                data.staus = response.status;
                data.statusText =
                    'Too Many Requests. Our server is overloaded. Please try  a few seconds later... ';
            },
            () =>
                Promise.reject(
                    'Too Many Requests. Our server is overloaded. Please try  a few seconds later... '
                )
        );
    }

    if (response.status === 204) {
        return 'OK';
    }
    return response.json().then(
        (json) => ({
            response: json,
            headers: response.headers,
            status: response.status,
        }),
        () => 'OK'
    );
};

export { BASE_URL, DOMAIN, authRequest };
