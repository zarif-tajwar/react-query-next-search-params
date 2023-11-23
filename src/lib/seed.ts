import { getData } from "./data";

async function execute() {
  console.log("⏳ Running ...");

  const start = performance.now();

  const data = await getData();

  const end = performance.now();

  console.log(`✅ Completed in ${end - start}ms`);

  process.exit(0);
}

execute().catch((err) => {
  console.error("❌ Task failed");
  console.error(err);
  process.exit(1);
});
