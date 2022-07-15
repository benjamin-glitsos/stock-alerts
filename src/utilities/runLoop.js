export default (fn, settings, parameters) => {
    const intervalDays = parameters.every;
    const isDevelopmentMode = settings.isDevelopmentMode;

    const oneSecond = 1 * 1000;
    const days = intervalDays * 60 * 60 * 1000;
    const interval = isDevelopmentMode ? oneSecond : days;

    setInterval(async () => await fn(settings, parameters), interval);
};
