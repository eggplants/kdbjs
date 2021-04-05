import parseKDB, { Course, downloadKDB } from 'twinte-parser'
import * as fs from 'fs'
import * as path from 'path'

const generate = async (savePath: string, year: number): Promise<void> => {
  console.warn(`[+]save: '${savePath}', year: ${year}`);
  console.warn("[+]downloading...");
  const xlsx = await downloadKDB(year);
  console.warn("[+]writing file...");
  const courses = parseKDB(xlsx);
  const data: Course[] = [];
  fs.writeFileSync(
    path.resolve(__dirname, savePath),
    JSON.stringify(data)
  );
  console.warn("done!");
}

const getFicalYear = (): number => {
  let date = new Date();
  date.setMonth(date.getMonth() - 3);
  return date.getFullYear();
}

class Args {
  savePath: string;
  fetchYear: number;
}



const args: Args = {
  savePath: process.argv[2] ?? "./kdbdata.json",
  fetchYear: (+process.argv[3]) || getFicalYear(),
}

generate(args.savePath, args.fetchYear);
