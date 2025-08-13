"use server"
import { feedbackSchema } from "@/constants";
import {  db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";


export async function getInterviewByUserId(userid :string ) :Promise<Interview[] | null>{
   

const Interviews = await db
.collection("interviews")
.where("userid" ,"==",userid)
.orderBy("createdAt","desc")
.get();


return Interviews.docs.map((doc)=> ({
     id:doc.id,
     ...doc.data()
}))  as Interview[]
    
}
export async function getLatestInterview(params :GetLatestInterviewsParams ) :Promise<Interview[] | null>{
   
const {userId , limit = 20 } = params
const Interviews = await db.collection("interviews")
.orderBy("createdAt","desc")
.where("finalized" , "==" , true)
.where("userid" ,"!=",userId)
.limit(limit)
.get();



return Interviews.docs.map((doc)=> ({
     id:doc.id,
     ...doc.data()
}))  as Interview[]
    
}

export async function getInterviewById(id :string ) :Promise<Interview | null>{
   
const Interview = await db
.collection("interviews")
.doc(id)
.get()


return Interview.data() as Interview | null
    
}
export async function createFeedback(params : CreateFeedbackParams){
const { interviewId , userId , transcript}= params
try {
     const formattedTransctipt = transcript 
     .map((sentence:{role:string; content:string})=>(
`- ${sentence.role} : ${sentence.content}\n`
     )).join("")

     const {object:{totalScore,categoryScores,strengths,areasForImprovement,finalAssessment}} = await generateObject({
          model:google("gemini-2.5-flash",{
               structuredOutputs:false,
          }),
          schema:feedbackSchema,
          prompt:`
          You are an AI interviewer analyzing a mock interview . Your task is to evaluate the the candidate based on structured categories.Be thorough and detailed in your analysis .Don't be lenient with the candidate.If there are mistakes or areas for improvement ,point them out .

          Transcropt :  ${formattedTransctipt}

          Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
          - ** Communication  skills **: Clarity ,articlation,structured responses.
          - **Technical Knowledge **:Understanding of key concepts for the role.
          - **Problem-Solving**:Ability to analyze problems and propose solutions  .
          - **Cultural & Role fit**:Alignment with compony values and job role.
          - **Confidence & Clarity**:Confidence in response ,engagement ,and clarity .
          `,
          system: "You are a Professional interviewer analyzing a mock interview . Your task is to evaluate the candidate based on structure categories"
     })
     const  feedback = await db.collection("feedback").add({
          interviewId,
          userId,
          totalScore,
          categoryScores,
          strengths,
          areasForImprovement,
          finalAssessment,
          createdAt: new Date().toISOString()
     })
     

     return{
          success : true,
          feedbcakId:feedback.id
     }

     
} catch (error) {
     console.error(error);
      return{
          success : false,
          feedbcakId:"NO"
     }
     
}
}

export async function getFeedbackByInterviewId(params :GetFeedbackByInterviewIdParams ) :Promise<Feedback | null>{
   
const {interviewId ,userId } = params

const feedback = await db.collection("feedback")
.where("interviewId" , "==" , interviewId)
.where("userId" ,"==",userId)
.limit(1)
.get();






const feedbackDoc = feedback.docs[0]


if(feedback.empty) return null

return {
     id:feedbackDoc.id ,
     ...feedbackDoc.data()
} as Feedback
    
}