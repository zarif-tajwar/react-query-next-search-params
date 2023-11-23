import { z } from "zod";
import { zDataArr } from "./validation";

export type Orders = z.infer<typeof zDataArr>;
