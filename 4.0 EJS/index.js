import express from "express";

const app = express();
const PORT = 3000;

function getAdvice() {
  const day = new Date().getDay();
  const advice = {
    0: "Sunday: Relax and recharge for the week ahead.",
    1: "Monday: Start strong, set goals for the week!",
    2: "Tuesday: Keep going, you’re gaining momentum.",
    3: "Wednesday: Midweek! Reflect and adjust your goals.",
    4: "Thursday: Stay focused, the weekend is near.",
    5: "Friday: Finish strong and celebrate your progress.",
    6: "Saturday: Take time for fun and self-care!"
  };
  return advice[day];
}

app.get("/", (req, res) => {
  res.send(`<h1>Advice of the Day</h1><p>${getAdvice()}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});