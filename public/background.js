let userId = null;
let urlLink = null;

firebase.initializeApp({
    apiKey: "test",
    authDomain: "test",
    databaseURL: "test",
    projectId: "test",
    storageBucket: "test",
    messagingSenderId: "test",
    appId: "test"
});

firebase.database()
    .ref('roster/')
    .orderByChild('timestamp')
    .startAt(Date.now())
    .on("child_added", snap => {
        sendNotification(snap.val())
    });

firebase.database()
    .ref('roster/')
    .orderByChild('timestamp')
    .startAt(Date.now())
    .on("child_removed", snap => {
        removeNotification(snap.val())
    });

firebase.database()
    .ref('roster/')
    .on("value", snap => {
        if (snap.val()) {
            chrome.browserAction.setIcon({path: "logo-new.png"});
        } else {
            chrome.browserAction.setIcon({path: "logo.png"});
        }
    });

function sendNotification (data) {
    if (!userId || userId === data.author_id) {
        return
    }

    const title = `New MR for review from ${data.name}`;
    const options = {
        body: data.body,
        icon: data.icon,
    };

    urlLink = data.link;

    const notification = new Notification(title, options)

    notification.addEventListener('click', () => {
        window.open(urlLink)
    })
};

function removeNotification (data) {
    if (!userId || userId !== data.author_id) {
        return
    }

    const title = `MR removed from review list`;
    const options = {
        body: data.body,
        icon: data.icon,
    };

    urlLink = data.link;

    const notification = new Notification(title, options)

    notification.addEventListener('click', () => {
        window.open(urlLink)
    })
};

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
    userId = data.id
});
