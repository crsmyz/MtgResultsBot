export function logAndThrowError(error): void {
    console.log("==================================");
    console.log("Something went wrong:  |  " + error);
    throw "ERROR:   " + error;
    console.log("==================================");
}