 import { PDFParse } from 'pdf-parse';

export const extract =async (pdfBuffer)=>{
    try {
        const data = new PDFParse({data:pdfBuffer})
        return (await data.getText()).text
    } catch (error) {
        throw error
    }
}