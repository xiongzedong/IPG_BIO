import { authRequest } from './index';

export const getContactFromSubmit = (params) => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: 'include',
    };

    return authRequest.send_BASE_URLText(`/contact-messages/submit`, config);
}