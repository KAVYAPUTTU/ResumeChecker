const mongoose = require("mongoose");
const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"behavioral questions is required"]
    },
    intension:{
        type:String,
        required:[true,"intension is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
});
const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical questions is required"]
    },
    intension:{
        type:String,
        required:[true,"intension is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
});
const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"]
    }
},{
    _id:false
});
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:{
        type:[String],
        required:[true,"tasks are required"]
    }
},{
    _id:false
});
const interviewReportSchema = new mongoose.Schema({
         jobDescription:{
            type:string,
            required:[true,"Job description is required"]
         },
         resume:{
            type:string,
         },
         selfDescription:{
            type:string,
         },
         matchScore:{
            type:number,
            min:0,
            max:100
         },
         technicalQuestions:[technicalQuestionSchema],
         behavioralQuestionSchema:[behavioralQuestionSchema],
         skillGaps:[skillGapSchema],
         preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel
/**
 * job Description schema
 * resume text:string
 * self description:string
 * 
 * matchscore:number
 * Technical questions:
 *      [{
 *    question:"",
 *    intension:"",
 *    answer:""
 *      }]
 * behavioral questions:
 *     [{
 *    question:"",
 *    intension:"",
 *    answer:""
 *      }]
 * skill gaps:
 *    [{
 *     skill:"",
 *     severity:{
 *      type:string,
 *      enums:["low,"medium","high"]
 *        }
 *     }]
 * preparation plan:
 *       [{
 *     day:Number,
 *     focus:string,
 *     tasks:[string]
 *     }]
 */