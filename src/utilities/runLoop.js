export default (fn, settings, parameters) => {
    const intervalMultiplier = parameters.every;
    const isDevelopmentMode = settings.isDevelopmentMode;

    const seconds = intervalMultiplier * 1000;
    const days = intervalMultiplier * 60 * 60 * 1000;
    const interval = isDevelopmentMode ? oneSecond : days;

    setInterval(async () => await fn(settings, parameters), interval);
};
