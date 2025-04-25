import { Request, Response } from "express";
import axios from "axios";
import { io } from "..";

const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': '8f73783757msh5ba59d1b30f8aadp10726bjsne75a96c6b3fb',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
};

const CodeJudge = "https://judge0-ce.p.rapidapi.com";

let timerId: NodeJS.Timeout;

const run = async (req: Request, res: Response) => {
    try{
        const {code, language, input} = req.body;

        const submission = await axios.post(`${CodeJudge}/submissions?base64_encoded=false&wait=false`,
            {
                source_code : code,
                language_id : language,
                stdin : input
            },
            { headers }
        );

        const token = submission.data.token;

        timerId = setInterval(async ()=>{
            const response = await axios.get(`${CodeJudge}/submissions/${token}?base64_encoded=false`,
                { headers }
            );

            io.emit("execution-updates", {data: response.data});

            if(response.data.status.id >= 3){
                clearInterval(timerId);
            }
        }, 2000);

        return res.status(201).json({
            succcess: true,
            status : "Evaluating",
            data : {},
            err : ''
        });
    }

    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            status : "Error",
            data: {},
            err: error
        });
    }
};

export default run;