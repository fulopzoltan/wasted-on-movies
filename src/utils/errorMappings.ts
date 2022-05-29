export type ErrorKeys = keyof typeof errors;

export const errors = {
    'auth/wrong-password': 'Wrong password!',
    'auth/user-not-found': 'User with the provided email was not found!',
    'auth/invalid-email': 'The provided email is not valid!',
    unknown: 'An unknown error occurred!'
};
