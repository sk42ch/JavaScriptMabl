/**
* Run a snippet of JavaScript during a mabl test or flow
*
* @param {object} mablInputs - An object containing mabl inputs including 
*         variables currently in scope. There are two ways to access the variables 
*         from inside the snippet; the  first is recommended for greater
*         reusability and better documentation of input requirements, the second
*         is the only way to access variables for tests run in Internet Explorer.
*         
*           1. (Recommended) In the "Edit parameters" section on the left, define 
*              a snippet parameter with a name and a default or current value 
*              "{{@myVar}}". The named parameter will be automatically added to 
*              the function signature.
*           2. Directly reference the variable as "mablInputs.variables.user.myVar".
*                             
* @param {function} callback - A callback function that must be called to 
*         complete the javascript step and provide a value to the following steps 
*         of the test or flow. A return statement from this function call will not 
*         provide any results for use in the following steps in this test or flow.
*/
function mablJavaScriptStep(mablInputs, callback) {
  const elementXPath = "//*[@id='SJAs-d6_LM']";

  const element = document.evaluate(elementXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (element === null || element.style.display === "none" || element.style.visibility === "hidden") {
    callback("Element already disappeared");
    return;
  }

  const miliSeconds = 1000;
  const maxWaitTime = 60*miliSeconds; // Maximum time to wait for the element to disappear (in milliseconds)
  const pollInterval = 100; // Interval between polls (in milliseconds)
  const startTime = Date.now();

  const poll = () => {
    const currentTime = Date.now();

    if (currentTime - startTime >= maxWaitTime) {
      callback("Timed out waiting for element to disappear");
      return;
    }

    const element = document.evaluate(elementXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (element === null || element.style.display === "none" || element.style.visibility === "hidden") {
      callback("Element disappeared");
      return;
    }

    setTimeout(poll, pollInterval);
  };

  setTimeout(poll, pollInterval);
}
