module.exports = {
    formatUnixDateString(unixString) {
        // Your Unix timestamp in milliseconds
        let timestamp = unixString;

        // Create a new Date object and pass the timestamp as an argument
        let date = new Date(timestamp);

        // Use the various Date methods to get the components of the date (year, month, day, etc.)
        let year = date.getFullYear();
        let month = date.getMonth() + 1; // Month is zero-based, so add 1
        let day = date.getDate();

        if(day <= 9) day = "0" + day
        if(month <= 9) day = "0" + month

        // Create a readable string using the obtained components
        let dateString = day + '/' + month + '/' + year;

        return dateString
    }
}