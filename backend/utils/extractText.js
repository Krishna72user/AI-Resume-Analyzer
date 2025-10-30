import { extractText } from 'unpdf';

export const extract =async (uint8Array)=>{
    try {
        const { text } = await extractText(uint8Array);
        return text;
    } catch (error) {
        throw error
    }
}

