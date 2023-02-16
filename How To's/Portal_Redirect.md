## Keeping users with role in the Service Portal

  Create a client callable script include  
```
//. . . default code
    checkRole: function(){
        // check user has role
        if(gs.getUser().getRoles().indexOf('role') != -1){
            gs.setRedirect('/portal page');
        }
    },
    
//. . . default code

```

  Create a UI Script with the Type Mobile/Service Portal
```
(function(){
    var ga = new GlideAjax('script_include');
    ga.addParam('sysparm_name', 'checkRole');
    ga.getXML(getResponse);
    
    function getResponse(response){
        var answer = response.responseXML.documentElement.getAttribute('answer');
    }
})();

```

  Go to All > Service Portal > Dependencies  
  create a new dependency with the field **Include on page load** checked  
  no other fields besides name need to be filled. Save the form.  
  Under **JS Includes** related list hit new.  
  Source should be UI Script  
  UI Script should be the UI script with the UI Type Mobile/service portal  
  Finally since most portals use the default Header Menu you add the newly created  
  dependency to it.  
  **All > Service Portal > Menus**  
  Click on any field under the Widget column that has a value of Header Menu  
  scroll down to dependencies related list at the bottom hit edit. Add dependency.  
  

### keeping users from accessing the backend
  create a UI Script with the UI Type Desktop and Global should be checked  
  add the following code.  
  
```
addLoadEvent(function(){  
    if(g_user.hasRoleExactly('role')){
    
        top.window.location = '/portal_page';  
    
    } else {
        return;
    }
    
});
```