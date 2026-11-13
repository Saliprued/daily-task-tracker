export function isValidTask(title, topic, minutes) {
  const time = Number(minutes);
  return (
    title.trim() !== "" &&
    topic.trim() !== "" &&
    Number.isInteger(time) &&
    time > 0
  );
}