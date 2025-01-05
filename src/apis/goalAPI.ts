import { serverUrl } from "@/constants/env";
import { CreateGoalReq } from "@/types/goal/req/CreateGoalReq";
import { CreateGoalRes } from "@/types/goal/res/CreateGoalRes";
import { GoalRes } from "@/types/goal/res/GoalRes";

export class GoalApi {
  private constructor() {}

  /**
   * 継続目標の取得API
   */
  static async fetchGoals(userId: string): Promise<GoalRes[]> {
    const res = await fetch(`${serverUrl}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    console.log("res", res);
    return res.json();
  }

  /**
   * 継続目標の登録API
   */
  static async createGoal(req: CreateGoalReq): Promise<CreateGoalRes> {
    const res = await fetch(`${serverUrl}/goals`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    console.log("res", res);
    return res.json();
  }
}
