import { extractText } from 'unpdf';

export const extract =async (pdfBuffer)=>{
    try {
        const { text } = await extractText(buffer);
        return text;
    } catch (error) {
        throw error
    }
}

