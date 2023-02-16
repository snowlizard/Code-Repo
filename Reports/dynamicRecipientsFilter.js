//SCHEDULED REPORT WITH DYNAMIC (ME) FILTER FOR VARIOUS RECIPIENTS

var scheduleReport = new GlideRecord('sysauto_report');
scheduleReport.get('5a29310e97cc2d5007d939e3a253af14'); //Sys ID of your schedule Report
var recipients = [];

var tablename = scheduleReport.report.table;
var query = scheduleReport.report.filter;
var gr = new GlideRecord('sys_user_grmember');
gr.addEncodedQuery('group=573212f747c7911005fc5a5c346d4345');
gr.query();

// on each iteration for each user execute report as user
while (gr.next()) {
    if (gr.user !== null || gr.user !== '') {
        scheduleReport.user_list = gr.user;
        scheduleReport.setValue('run_as', gr.user);
        scheduleReport.update();
        SncTriggerSynchronizer.executeNow(scheduleReport);
        gs.sleep(4000);
    }

}