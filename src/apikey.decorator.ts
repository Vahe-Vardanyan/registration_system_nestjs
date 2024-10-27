import { SetMetadata } from "@nestjs/common";

export const IS_WITHOUT_APIKEY = "isWithOutApiKey";
export const WithOutApiKey = () => SetMetadata(IS_WITHOUT_APIKEY, true);
