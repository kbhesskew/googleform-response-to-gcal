function onFormSubmit(e) {
  try {
    // Get the active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Assuming the form responses are in the first sheet
    var sheet = spreadsheet.getSheets()[0];

    // Get the last row of data (latest form submission)
    var lastRow = sheet.getLastRow();
    var responses = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

    Logger.log('Form submission event:', e);
    Logger.log('Number of responses:', responses.length);

    if (responses.length >= 4) {
      var name = responses[1];
      var dueDateGuess = responses[2];
      var specialMessage = responses[3];

      var calendarId = ''; // Replace with your actual Calendar ID

      var eventTitle = 'Due Date Guess: ' + name;
      var eventDescription = 'Due Date Guess: ' + dueDateGuess + '\n\nSpecial Message:\n' + specialMessage;

      CalendarApp.getCalendarById(calendarId).createEvent(eventTitle, new Date(dueDateGuess), new Date(dueDateGuess), { description: eventDescription });
    } else {
      Logger.log('Not enough form responses');
    }
  } catch (error) {
    Logger.log('Error during form submission: ' + error);
  }
}

