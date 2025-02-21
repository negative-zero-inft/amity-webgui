// CHROMIUM AND SAFARI ARE ASS

export const isFirefox = () => {
    if (navigator.userAgent.indexOf('Firefox') > -1) {
        return true;
    } else {
        return false;
    }
};
