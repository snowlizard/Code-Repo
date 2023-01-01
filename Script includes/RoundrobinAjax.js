// AJAX ROUND ROBIN HELPER(UI ACTIONS LIST FORM)

var queueUtilClient = Class.create();

queueUtilClient.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    checkUserIntoAllQueues: function () {
        var queue = new GlideRecord('u_rr_queue');
        queue.addEncodedQuery('u_checked_in=false^u_user=' + gs.getUserID());
        queue.query();

        while (queue.next()) {
            queue.u_check_in_time = new GlideDateTime();
            queue.u_count = queue.u_count + 1;
            queue.u_checked_in = true;
            queue.update();

        }

    },

    checkOutAllQueues: function () {
        var queue = new GlideRecord('u_rr_queue');
        queue.addEncodedQuery('u_checked_in=true');
        queue.query();

        while (queue.next()) {
            queue.u_check_out_time = new GlideDateTime();
            queue.u_count = 0;
            queue.u_checked_in = false;
            queue.u_request_checkout = false;
            queue.update();

        }
    },

    checkoutSelected: function () {
        var list = this.getParameter('sysparm_list');
        var selected = list.split(',');

        selected.forEach(function (selection) {
            var queue = GlideRecord('u_rr_queue');
            queue.addQuery('sys_id', selection);
            queue.query();

            while (queue.next()) {
                queue.u_checked_in = false;
                queue.u_request_checkout = false;
                queue.u_check_out_time = new GlideDateTime();
                queue.u_count = 0;
                queue.update();

            }

        });

    },



    checkUserIsManagerOrLead: function () {
        var user = this.getParameter('sysparm_user');
        var gr = new GlideRecord('sys_user_grmember');
        gr.addEncodedQuery('your query here' + user);
        gr.query();

        if (gr.next()) {
            return 'true';
        } else {
            return 'false';
        }
    },

    type: 'queueUtilClient'

});