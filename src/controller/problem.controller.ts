import { Request, Response } from "express";
import axios from "axios";

export const fetchProblems = async (req: Request, res: Response) => {
  try {
    const { limit = 20, skip = 0 } = req.body;

    const result = await axios.get("https://leetcode.com/api/problems/all/");

    const allQuestions = result.data.stat_status_pairs.map((item: any) => ({
      questionId: item.stat.question_id,
      title: item.stat.question__title,
      titleSlug: item.stat.question__title_slug,
      isPaidOnly: item.paid_only,
    }));

    const paginatedQuestions = allQuestions.slice(skip, skip + limit);

    res.json({
      questions: paginatedQuestions,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const fetchProblemDescription = async (req: Request, res: Response) => {
  try {
    const { titleSlug } = req.body;

    const result = await axios.post(
      "https://leetcode.com/graphql",
      {
        operationName: "questionData",
        variables: {
          titleSlug,
        },
        query: `
          query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
              content
              title
              difficulty
              likes
              dislikes
              similarQuestions
            }
          }
        `
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com/problems/" + titleSlug + "/",
        },
      }
    );

    res.json(result.data.data.question);
  } catch (error) {
    console.error("Error fetching description:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};