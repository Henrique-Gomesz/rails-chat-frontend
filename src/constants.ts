export const URL = "https://rails-chat-backend-413396343142.southamerica-east1.run.app";

export function FormatDate(date: Date, withTime = true): string {
  if (!withTime) {
    return Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  return Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
}
