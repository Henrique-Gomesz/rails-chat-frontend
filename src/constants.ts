const BASE_URL = "rails-chat-backend-413396343142.southamerica-east1.run.app";
export const HTTP_URL = `https://${BASE_URL}`;
export const WS_URL = `wss://${BASE_URL}/cable`;
export const MAX_WIDTH = 725;

export function FormatDate(date: Date, withTime = true): string {
  if (withTime) {
    return Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  }

  return Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
