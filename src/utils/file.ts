import fs from "fs"


export const csv2json = (file: string, sep: string = ",", header: boolean = true) => {
    const newLine = /\r?\n/;
    const lines = file.split(newLine);
    const headers = lines[0].split(sep);
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const obj: Record<string,any> = {};
        const currentline = lines[i].split(sep);
        for (let j = 0; j < headers.length; j++) {
            const header: string = headers[j];
            obj[header] = typeFormatter(currentline[j]);
        }
        result.push(obj);
    }
    return result;
}

const typeFormatter = (value: any) => {
    const isNumber = !isNaN(value);
    if (isNumber) return Number(value);
    if(value === "true" || value === "false"){
        return JSON.parse(value);
    }
    return value;
}
