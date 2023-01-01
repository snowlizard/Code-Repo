var queueUtil = Class.create();

queueUtil.prototype = {

    initialize: function () { },

    filterQueueUser: function () {
        var memberGR = new GlideRecord('sys_user_grmember');
        memberGR.addEncodedQuery('your query here');
        memberGR.query();

        var users = [];

        while (memberGR.next()) {
            users.push(memberGR.getValue('user'));
        }

        return 'sys_idIN' + users.join(',');

    },

    filterQueueGroup: function () {
        var groupGR = new GlideRecord('sys_user_group');
        groupGR.addEncodedQuery('your query here');
        groupGR.query();

        var groups = [];

        while (groupGR.next()) {
            groups.push(groupGR.getValue('sys_id'));
        }

        return 'sys_idIN' + groups.join(',');

    },

    filterQueueGroupUserIsPartOf: function () {
        var groupGR = new GlideRecord('sys_user_grmember');
        groupGR.addEncodedQuery('your query here ^user=' + gs.getUserID());
        groupGR.query();

        var groups = [];

        while (groupGR.next()) {
            groups.push(groupGR.getValue('group'));
        }

        return 'sys_idIN' + groups.join(',');

    },

    autoAssign: function (prevUser, prevGroup, currentUser, currentGroup) {
        var updateNeeded = false;

        if (currentUser == '' || currentUser == null) {
            var gr = new GlideRecord('u_rr_queue');
            gr.addEncodedQuery('u_checked_in=true^u_queue=' + currentGroup);
            gr.orderBy('u_count');
            gr.query();

            if (gr.next()) {
                updateNeeded = true;
                current.state = 2;
                current.assigned_to = gr.u_user;
                gr.u_count = gr.u_count + 1;
                gr.update();
            }
        }

        // assignment group changes & assigned to

        if (prevGroup != currentGroup && prevUser != currentUser) {
            var updateQueue = new GlideRecord('u_rr_queue');
            updateQueue.addEncodedQuery('u_queue=' + prevGroup + '^u_user=' + prevUser);
            updateQueue.query();

            while (updateQueue.next()) {
                updateQueue.u_count = updateQueue.u_count - 1;
                updateQueue.update();
            }
        }

        return updateNeeded;

    },

    isQueueMember: function (user) {
        var qGroups = new GlideRecord('sys_user_grmember');
        qGroups.addEncodedQuery('your query here ^user=' + user);
        qGroups.query();

        var inGroup = 'false';

        while (qGroups.next()) {
            inGroup = 'true';
        }

        return inGroup;

    },

    type: 'queueUtil'

};