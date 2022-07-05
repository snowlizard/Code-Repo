api.controller=function(spUtil, $uibModal, spModal, $http) {
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
      
      //Delete record functionality
      c.deleteRecord = function(record){
  
          //Confirm the deletion
          spModal.confirm("Are you sure you want to delete this record?").then(function successCallback(answer) {
  
              //Delete request upon confirmation
              $http({
                  method:'DELETE',
                  url: '/api/now/table/' + c.data.table + '/' + record.sys_id
                  
                  //Confirm record deleted
              }).then(function successCallback(response){
                  spUtil.addInfoMessage("Record deleted");
              })
  
              //Confirm record not deleted
          }, function errorCallback(response){
              spUtil.addInfoMessage('Record not deleted');
          })
      }	
  
  };	