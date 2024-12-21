export const getEmoji = (amount) => {
  if (amount >= 50) return "🌟";
  if (amount >= 20) return "⭐";
  if (amount >= 10) return "✨";
  return "💫";
};
