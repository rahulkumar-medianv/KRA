import { LoggerService } from "./logger.service";

export const LoggerProvider = {
    provide: 'LOGGER', // injection token
    useFactory: () => {
        // you control creation
        return new LoggerService('MyApp');
    }
}