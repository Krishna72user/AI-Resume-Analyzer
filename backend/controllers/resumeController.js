import { extract } from "../utils/extractText.js"
import fs from 'fs'
import path from "path";
import { GoogleGenAI } from "@google/genai";

// /api/resume/analyze
export const analyze =async (req,res)=>{
    const paths = path.resolve(req.file.path);
    try {
        if(paths){
            const {job_desc} = req.body;
            const buffer = fs.readFileSync(paths)
            const uint8Array = new Uint8Array(buffer);
            const text = await extract(uint8Array)
            const prompt =
            `You are an ATS (Applicant Tracking System) evaluator.
            Compare the resume with the job description and return:
            
            1. ATS Score (0-100)
            2. Keyword Match(0-100)
            3. 3 Strengths
            4. 3 Missing/Weak Skills
            5. 3 Suggestions

            Respond in separated format :

            {ATS Score}|{Keyword match}|{Strengths}|{Missing Skills}|{Improvements}

            Give response of Summary ,Strengths, Missing Skills and Improvements in a single string don't use numbering (e.g, 1,2) or Bullets or Stars(**)
            Job Description:

            ${job_desc}
            
            Resume:
            ${text}`

            const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            const result = response.text.split("|")
            res.json({"ATS" : result[0], "keyword_match" : result[1],"Strengths":result[2],"Missing Skills": result[3],
                "suggestions":result[4].split('.').slice(0,-1) ,success:true})
        }
        else{
            res.status(404).json({message:"Path not found",success:false})

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,success:false})
    }
}