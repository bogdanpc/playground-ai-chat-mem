import { getEnvVar } from '../config/env';
import { error as errorNotification } from '../notification';
import { accessToken, setAccessToken, setRole } from '@/auth/session-utils';


const baseURL = getEnvVar("API_URL", "http://localhost:8080");


const buildValidationMessage = (validations) => !validations ? "" : validations.title + ": " + validations.violations[0].field + " " + validations.violations[0].message;


/**
 * Core API client function for making HTTP requests with error handling
 */
export const apiClient = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Accept': 'application/json',
        'Authorization': `Basic ${accessToken()}`
    };

    if (options.body && !(options.body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${baseURL}/${endpoint}`, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...(options.headers || {})
            }
        });

        // Handle streaming responses for event-stream
        if (response.headers.get('content-type')?.includes('text/event-stream')) {
            return response;
        }

        if (!response.ok) {
            let errorMessage;

            if (response.status === 400) {
                const validations = await response.json();
                errorMessage = buildValidationMessage(validations);
            } else {
                const errorMessages = {
                    401: 'Unauthorized: Please check your credentials.',
                    403: 'Forbidden: Access denied.',
                    404: 'Not Found: Resource does not exist.',
                    500: 'Server Error: Please try again later.'
                };
                errorMessage = errorMessages[response.status] || `Error: ${response.statusText}`;
            }

            throw new Error(errorMessage);
        }

        return response.status === 204 ? null : await response.json();
    } catch (error) {
        errorNotification(error.message);
        throw error;
    }
};

export const get = endpoint => apiClient(endpoint, { method: 'GET' });

export const post = (endpoint, body) => apiClient(endpoint, {
    method: 'POST',
    body
});

export const put = (endpoint, data) => apiClient(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
});

export const del = endpoint => apiClient(endpoint, { method: 'DELETE' });


export const streaming = async ({ path, body }) => {

    const response = await fetch(`${baseURL}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Authorization': `Basic ${accessToken()}`,
        },
        body: JSON.stringify(body)
    });

    return response;
};

export const streamEvents = (url, options) => {
    const {
        body,
        messageId,
        onMessage,
        onComplete,
        onError,
      } = options || {}

    const controller = new AbortController();

    (async () => {
        try {
            if(onMessage) {
                onMessage(messageId, { sender: 'waitbot', content: "start streaming", isComplete: false });
            }
            const response = await apiClient(url, {
                method: 'POST', body: JSON.stringify(body),
                headers: { 'Accept': 'text/event-stream' },
                signal: controller.signal
            });
            if(onMessage) {
                onMessage(messageId, { sender: 'waitbot', content: "end streaming", isComplete: true });
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);

                chunk.split('\n').forEach(event => {
                    if (event.startsWith("data:")) {

                        const msg = event.slice(5);

                        if (!msg) return;

                        try {
                            const data = JSON.parse(msg.trim());

                            if (!data.content) return;
                            if(onMessage) {
                                onMessage(messageId, data);
                            }

                        } catch (error) {
                            console.error("Error parsing SSE message:", error);
                        }
                    }
                });
            }
            if (onComplete) {
                onComplete();
              }

        } catch (error) {
            console.error('Error producing streamed response:', error);
            onMessage(messageId, {
                content: 'Sorry, an error occurred while generating a response.',
                textReplacement: true,
                isComplete: true,
                hasError: true
            });
            if(onError) {
                onError(error);
            }
            throw error;
        }
    })();

    return {
        abort: () => controller.abort()
    }
};

export const login = async (username, password) => {
    const credentials = btoa(`${username}:${password}`);
    try {
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        });

        if (response.ok) {
            const userInfo = await response.json();
            setAccessToken(credentials);
            setRole(userInfo.role);
        } else {
            errorNotification('Invalid credentials');
        }

        return true;
    } catch (err) {
        errorNotification('An error occurred, please try again.');
    }
};