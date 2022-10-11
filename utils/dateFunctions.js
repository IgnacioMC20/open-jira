import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
 
export const getDistanceToNow = (date) => {
  return formatDistanceToNow(date, {locale: es});
}