org_hudsonci.SchedulerService = Base.extend ({
    constructor: function(ffTimer) {
        this.ffTimer = ffTimer;
    },
    schedule: function(callback, interval) {
        this.ffTimer.initWithCallback(callback, interval * 60 * 1000, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
    }
});