// Helper function to calculate delay until 5:30 PM
function getDelayUntil530PM() {
    const now = new Date();
    const target = new Date();
    target.setHours(17, 30, 0, 0); // Set target time to 5:30 PM

    // If the time has passed for today, set it for tomorrow
    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    // Calculate delay in minutes
    const delayInMinutes = (target - now) / 1000 / 60;
    return delayInMinutes;
}

// Set an alarm for 5:30 PM daily
chrome.alarms.create("dailyReadingReminder", { delayInMinutes: getDelayUntil530PM(), periodInMinutes: 24 * 60 });

// Listen for the alarm and show a notification when it triggers
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyReadingReminder") {
        chrome.notifications.create("readingReminderNotification", {
            type: "basic",
            iconUrl: "aa.avif",
            title: "Reading Reminder",
            message: "It's time to read! Check out this React course on Scaler.",
            buttons: [{ title: "Open Link" }],
            priority: 2
        });
    }
});

// Open the link when the notification is clicked
chrome.notifications.onClicked.addListener((notificationId) => {
    if (notificationId === "readingReminderNotification") {
        chrome.tabs.create({ url: "https://www.scaler.com/topics/course/free-react-js-course/video/1668/" });
    }
});
