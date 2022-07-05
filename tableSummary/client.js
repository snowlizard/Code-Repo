api.controller=function(spUtil, $uibModal) {
    /* widget controller */
    var c = this;
      
    /* Step 3. Accept user input */
      c.selectAg = function(record) {
          c.data.selectedAg = record.agValue;
          c.server.update();
      }
      
      //Sort Functionality
      c.sortOrder = false;
      c.changeSortCol = function(key){
  
          /* If the user is selecting the same column, reverse the sort order, else set the order to false which forces a new sort in ascending order */
          if(key  ==  c.orderCol)
              c.sortOrder = !c.sortOrder;
          else
              c.sortOrder = false;
  
          c.orderCol = key;
      }	
      
      //Modal functionality
      c.openRecord = function(record) {
          c.modalInstance = $uibModal.open({
              templateUrl: 'table-summary-overlay.html',
              controllerAs: 'modalC',
              controller: function() {
              var modalC = this;
              modalC.record = record;
              modalC.modalInstance = c.modalInstance;
              spUtil.get('widget-form', {
                  sys_id: modalC.record.sys_id,
                  table: c.data.table
              }).then( function (response) {
                  modalC.form = response;
              })
      }
          })
      }
};