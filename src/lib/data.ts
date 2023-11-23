import * as fs from "fs";
import { zDataArr } from "./validation";

export const getData = async () => {
  const jsonString = fs.readFileSync("src/lib/data.json", {
    encoding: "utf-8",
    flag: "r",
  });

  const jsonData: unknown = JSON.parse(jsonString);

  const zParse = zDataArr.safeParse(jsonData);

  if (zParse.success) {
    return zParse.data;
  }
  if (zParse.error) {
    console.log(zParse.error);
  }

  return undefined;
};
