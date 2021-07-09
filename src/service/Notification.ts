class serviceNotification {
    requestPermission() {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }
    }

    dataToBackground (data: { id: number }) {
        // @ts-ignore
        chrome.runtime.sendMessage(data);
    }
}

export default new serviceNotification()
