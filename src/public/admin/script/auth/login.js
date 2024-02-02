// Hidden Showing Alert
const exitBtnAlert = document.querySelector('.message i'); 
const Alert = document.querySelector('.message');
if(exitBtnAlert) {
    exitBtnAlert.addEventListener('click', () => {
        Alert.remove();
    });
    const timeDelay = Alert.getAttribute('time-delay');
    setTimeout(() => {
        if(Alert) Alert.remove();
    }, timeDelay + 500)
}