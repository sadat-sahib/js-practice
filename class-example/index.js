// Define a custom error class that extends the built-in Error class
class CustomError extends Error {
  constructor(message, code) {
    // Call the parent Error constructor with the message argument
    // This sets the error's message property and stack trace correctly
    super(message);

    // Override the name property to distinguish this error type
    this.name = 'CustomError';

    // Add a custom property (e.g., HTTP status code or internal error code)
    this.code = code;
  }
}

try {
  // Throw a new instance of CustomError with a message and a custom code
  throw new CustomError('Something went wrong', 500);
} catch (error) {
  // Check if error is an instance of the built-in Error class
  // console.log(error instanceof Error);        // true

  // Check if error is specifically a CustomError
  // console.log(error instanceof CustomError);  // true

  // Print the error's name property (overridden to 'CustomError')
  // console.log(error.name);                    // "CustomError"

  // Print the type of the custom 'code' property (number in this case)
  // console.log(typeof error.code);             // "number"
}



// ------------------------------------&&&&&&&------------------------------------

class StateMachine {
  constructor() {
    this.state = 'idle';
    this.transitions = {
      idle: { start: 'running', reset: 'idle' },
      running: { pause: 'paused', stop: 'stopped' },
      paused: { resume: 'running', stop: 'stopped' },
      stopped: { reset: 'idle' }
    };
  }
  
  transition(action) {
    const nextState = this.transitions[this.state]?.[action];
    if (nextState) {
      this.state = nextState;
      return true;
    }
    return false;
  }
}

// const sm = new StateMachine();
// console.log(sm.transition('start'));
// console.log(sm.state);
// console.log(sm.transition('reset'));
// console.log(sm.state);

// ------------------------------------&&&&&&&------------------------------------
class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
  }
}

function processData(data) {
  try {
    if (!data) throw new ValidationError('Data required', 'MISSING_DATA');
    return data.toUpperCase();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`${error.name}: ${error.message} (${error.code})`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

processData(null);
processData(42);