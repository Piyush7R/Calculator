let string = ""; // Holds the current input or result
let buttons = document.querySelectorAll('button');

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value == '=') {
            try {
                string = eval(string); // Evaluate the expression
                document.querySelector('input').value = string; // Display the result
            } catch (error) {
                document.querySelector('input').value = "Error"; // Handle invalid expressions
                string = "";
            }
        } 
        else if (value == 'C') {
            string = ""; // Clear the input
            document.querySelector('input').value = string;
        } 
        else {
            // Prevent consecutive operators
            const lastChar = string[string.length - 1];
            if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
                // Do nothing if both current and previous inputs are operators
                return;
            }

            // Prevent multiple decimal points in the current number
            if (value === '.') {
                const currentNumber = string.split(/[\+\-\*\/]/).pop(); // Get the current number segment
                if (currentNumber.includes('.')) {
                    return; // Ignore input if the current number already has a decimal
                }
            }

            string = string + value; // Append the button's value to the input
            document.querySelector('input').value = string; // Update the display
        }
    });
});
