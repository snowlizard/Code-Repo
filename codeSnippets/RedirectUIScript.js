/* Global UI Script

   redirects the user with role to the desired
   location (portal in this case)

    All > System UI > UI Scripts

*/

addLoadEvent(function () {
    if(g_user.hasRoleExactly('role') &&  document.URL.indexOf('.do') != -1){
        window.location = 'sp';
    } else {
        return;
    }
});