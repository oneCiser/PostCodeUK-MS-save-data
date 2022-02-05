

/**
 * 
 * @param {String} file - The csv file
 * @param {String} sep - The separator 
 * @param {boolean} header - If the file has a header 
 * @returns {object} - The json object
 * @throws {Error} - If the csv file is not valid, indicating the error and line number
 */
export const csv2json = (file: string, sep: string = ",", header: boolean = true, headers:string[] = []): any => {
    const result = [];
    try {
        const newLine = /\r?\n/;
        const lines = file.split(newLine);
        let localHeaders = headers;
        let startLine = 0;
        if (header) {
            localHeaders = lines[0].split(sep);
            startLine = 1;
        }
        
        
        for (let i = startLine; i < lines.length; i++) {
            const obj: Record<string,any> = {};
            const currentline = lines[i].split(sep);
            if (currentline.length !== localHeaders.length) throw new Error(`The number of columns in line ${i} is not equal to the number of columns in the header`);
            for (let j = 0; j < localHeaders.length; j++) {
                if(!currentline[j]) throw new Error(`Line ${i} is missing value for ${headers[j]}`);
                const header: string = localHeaders[j];
                obj[header] = typeFormatter(currentline[j]);
            }
            result.push(obj);
        }
        return result;
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message || "The csv file is not valid");
        }
        
    }

    return result;

}

/**
 * 
 * @param {any} value - the value to be formatted 
 * @returns {string | number | boolean} - the formatted value
 */
const typeFormatter = (value: any): string | number | boolean => {
    const isNumber = !isNaN(value);
    if (isNumber) return Number(value);
    if(value === "true" || value === "false"){
        return JSON.parse(value);
    }
    return value;
}
