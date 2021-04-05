import parseKDB, { Course, downloadKDB } from 'twinte-parser'
import fs from 'fs'
import path from 'path'

const generate = async (savePath: string, year: number): Promise<void> => {
  const xlsx = await downloadKDB(year);
  const courses = parseKDB(xlsx);
  const data: Course[] = [];
  fs.writeFileSync(
    path.resolve(__dirname, savePath),
    JSON.stringify(data)
  );
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
  fetchYear: +process.argv[3] ?? getFicalYear() ?? 2021,
}

generate(args.savePath, args.fetchYear);
